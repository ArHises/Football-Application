package com.backend.roman.controller;

import com.backend.roman.dto.PlayerDto;
import com.backend.roman.entity.Player;
import com.backend.roman.service.CsvService;
import com.backend.roman.service.PlayerService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;
    private final CsvService csvService;

    @GetMapping
    public ResponseEntity<List<PlayerDto>> getAllPlayers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) List<String> nationalities,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge,
            @RequestParam(required = false) List<String> positions,
            @RequestParam(required = false) Double minHeight,
            @RequestParam(required = false) Double maxHeight,
            @RequestParam(required = false, defaultValue = "firstName") String sort) {
        return ResponseEntity.ok(playerService.getAll(name, nationalities, minAge, maxAge, positions, minHeight, maxHeight, sort));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayerDto> getById(@PathVariable Long id) {
        return playerService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody PlayerDto playerDto) {
        try {
            PlayerDto saved = playerService.create(playerDto);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody PlayerDto playerDto) {
        try {
            PlayerDto updated = playerService.update(id, playerDto);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            Optional<PlayerDto> deleted = playerService.delete(id);
            if (deleted.isPresent()) {
                return ResponseEntity.ok(deleted.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Log the error for debugging
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error deleting player: " + e.getMessage());
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadCSV(@RequestParam("file") MultipartFile file) {
        try {
            List<Player> players = csvService.parseAndSave(file);
            List<PlayerDto> playerDtos = players.stream()
                .map(com.backend.roman.mapper.PlayerMapper::toDto)
                .toList();
            System.out.println("CSV file uploaded!");
            return ResponseEntity.ok(playerDtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/nationalities")
    public ResponseEntity<List<String>> getNationalities() {
        return ResponseEntity.ok(playerService.getAllNationalities());
    }

    @GetMapping("/positions")
    public ResponseEntity<List<String>> getPositions() {
        return ResponseEntity.ok(playerService.getAllPositions());
    }

}
