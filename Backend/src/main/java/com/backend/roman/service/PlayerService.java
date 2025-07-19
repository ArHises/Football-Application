package com.backend.roman.service;

import com.backend.roman.dto.PlayerDto;
import com.backend.roman.entity.Player;
import com.backend.roman.mapper.PlayerMapper;
import com.backend.roman.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    public PlayerDto create(PlayerDto playerDto) {
        Player player = PlayerMapper.toEntity(playerDto);
        if (playerRepository.existsByFirstNameAndLastNameAndDateOfBirth(
                player.getFirstName(), player.getLastName(), player.getDateOfBirth())) {
            throw new IllegalArgumentException("Player already exists.");
        }
        player.setCreatedAt(LocalDate.now());
        player.setModifiedAt(LocalDate.now());
        Player saved = playerRepository.save(player);
        System.out.println(saved.getFirstName() + " CREATED");
        return PlayerMapper.toDto(saved);
    }

    public Optional<PlayerDto> getById(Long id) {
        return playerRepository.findById(id).map(PlayerMapper::toDto);
    }

    public List<PlayerDto> getAll(String sortField) {
        return playerRepository.findAll(Sort.by(sortField)).stream()
                .map(PlayerMapper::toDto)
                .toList();
    }

    public List<PlayerDto> getAll(String name, List<String> nationalities, Integer minAge, Integer maxAge, List<String> positions, Double minHeight, Double maxHeight, String sortField) {
        List<PlayerDto> players = playerRepository.findAll(Sort.by(sortField)).stream()
                .map(PlayerMapper::toDto)
                .toList();
        LocalDate today = LocalDate.now();
        return players.stream()
                .filter(p -> name == null || name.trim().isEmpty() || 
                    (p.getFirstName().toLowerCase().contains(name.toLowerCase()) || 
                     p.getLastName().toLowerCase().contains(name.toLowerCase()) ||
                     (p.getFirstName() + " " + p.getLastName()).toLowerCase().contains(name.toLowerCase())))
                .filter(p -> nationalities == null || nationalities.isEmpty() || 
                    p.getNationalities().stream().anyMatch(nat -> nationalities.contains(nat)))
                .filter(p -> minAge == null || (p.getDateOfBirth() != null && 
                    p.getDateOfBirth().isBefore(today.minusYears(minAge))))
                .filter(p -> maxAge == null || (p.getDateOfBirth() != null && 
                    p.getDateOfBirth().isAfter(today.minusYears(maxAge))))
                .filter(p -> positions == null || positions.isEmpty() || 
                    p.getPositions().stream().anyMatch(pos -> positions.contains(pos)))
                .filter(p -> minHeight == null || (p.getHeightCm() != null && p.getHeightCm() >= minHeight))
                .filter(p -> maxHeight == null || (p.getHeightCm() != null && p.getHeightCm() <= maxHeight))
                .toList();
    }

    public List<String> getAllNationalities() {
        return playerRepository.findDistinctNationalities();
    }

    public List<String> getAllPositions() {
        return playerRepository.findDistinctPositions();
    }

    public PlayerDto update(Long id, PlayerDto newDataDto) {
        return playerRepository.findById(id)
                .map(existing -> {
                    Player newData = PlayerMapper.toEntity(newDataDto);
                    newData.setId(id);
                    newData.setCreatedAt(existing.getCreatedAt());
                    newData.setModifiedAt(LocalDate.now());
                    Player saved = playerRepository.save(newData);
                    System.out.println(newDataDto.getFirstName() + " UPDATED");
                    return PlayerMapper.toDto(saved);
                })
                .orElseThrow(() -> new NoSuchElementException("Player not found"));
    }

    public Optional<PlayerDto> delete(Long id) {
        Optional<Player> playerOpt = playerRepository.findById(id);
        Optional<PlayerDto> dtoOpt = playerOpt.map(player -> {
            // Eagerly load collections before mapping to DTO
            player.getNationalities().size();
            player.getPositions().size();
            return PlayerMapper.toDto(player);
        });
        playerOpt.ifPresent(player -> playerRepository.deleteById(id));
        dtoOpt.ifPresent(dto -> System.out.println(dto.getFirstName() + " DELETED!"));
        return dtoOpt;
    }
}
