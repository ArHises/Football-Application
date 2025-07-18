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

    @Autowired
    private PlayerMapper playerMapper;

    public PlayerDto create(PlayerDto playerDto) {
        Player player = playerMapper.toEntity(playerDto);
        if (playerRepository.existsByFirstNameAndLastNameAndDateOfBirth(
                player.getFirstName(), player.getLastName(), player.getDateOfBirth())) {
            throw new IllegalArgumentException("Player already exists.");
        }
        player.setCreatedAt(LocalDate.now());
        player.setModifiedAt(LocalDate.now());
        Player saved = playerRepository.save(player);
        return playerMapper.toDto(saved);
    }

    public Optional<PlayerDto> getById(Long id) {
        return playerRepository.findById(id).map(playerMapper::toDto);
    }

    public List<PlayerDto> getAll(String sortField) {
        return playerRepository.findAll(Sort.by(sortField)).stream()
                .map(playerMapper::toDto)
                .toList();
    }

    public PlayerDto update(Long id, PlayerDto newDataDto) {
        return playerRepository.findById(id)
                .map(existing -> {
                    Player newData = playerMapper.toEntity(newDataDto);
                    newData.setId(id);
                    newData.setCreatedAt(existing.getCreatedAt());
                    newData.setModifiedAt(LocalDate.now());
                    Player saved = playerRepository.save(newData);
                    return playerMapper.toDto(saved);
                })
                .orElseThrow(() -> new NoSuchElementException("Player not found"));
    }

    public Optional<PlayerDto> delete(Long id) {
        Optional<Player> playerOpt = playerRepository.findById(id);
        playerOpt.ifPresent(player -> playerRepository.deleteById(id));
        return playerOpt.map(playerMapper::toDto);
    }
}
