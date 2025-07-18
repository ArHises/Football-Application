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
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("/players")
public class PlayerController {

//    TODO:
//     Endpoints:
//      V Create a new player.
//      V Update an existing player.
//      V Delete a player.
//      V Get a player by ID.
//      V Get a list of players with filtering and sorting.
//      ● Add players in bulk from a CSV file.

    private final PlayerService playerService;
    private static final Set<String> ALLOWED_SORTS = Set.of("firstName", "lastName", "dateOfBirth");
    private final CsvService csvService;

    @GetMapping
    public ResponseEntity<List<PlayerDto>> getAllPlayers(@RequestParam(required = false, defaultValue = "firstName") String sort){
        if (!ALLOWED_SORTS.contains(sort)){
            sort = "firstName";
        }
        return ResponseEntity.ok(playerService.getAll(sort));
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
        return playerService.delete(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadCSV(@RequestParam("file") MultipartFile file) {
        try {
            List<Player> players = csvService.parseAndSave(file);
            return ResponseEntity.ok(players);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
