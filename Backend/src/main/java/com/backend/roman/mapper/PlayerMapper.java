package com.backend.roman.mapper;

import com.backend.roman.dto.PlayerDto;
import com.backend.roman.entity.Player;
import org.springframework.stereotype.Component;

@Component
public class PlayerMapper {

    public PlayerDto toDto(Player player) {
        PlayerDto dto = new PlayerDto();
        dto.setId(player.getId());
        dto.setFirstName(player.getFirstName());
        dto.setLastName(player.getLastName());
        dto.setNationalities(player.getNationalities());
        dto.setDateOfBirth(player.getDateOfBirth());
        dto.setPositions(player.getPositions());
        dto.setHeightCm(player.getHeightCm());
        dto.setCreatedAt(player.getCreatedAt());
        dto.setModifiedAt(player.getModifiedAt());
        return dto;
    }

    public Player toEntity(PlayerDto dto) {
        Player player = new Player();
        player.setId(dto.getId());
        player.setFirstName(dto.getFirstName());
        player.setLastName(dto.getLastName());
        player.setNationalities(dto.getNationalities());
        player.setDateOfBirth(dto.getDateOfBirth());
        player.setPositions(dto.getPositions());
        player.setHeightCm(dto.getHeightCm());
        player.setCreatedAt(dto.getCreatedAt());
        player.setModifiedAt(dto.getModifiedAt());
        return player;
    }
}
