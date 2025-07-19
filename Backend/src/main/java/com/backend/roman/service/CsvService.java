package com.backend.roman.service;

import com.backend.roman.dto.PlayerCsvDto;
import com.backend.roman.entity.Player;
import com.backend.roman.repository.PlayerRepository;
import org.springframework.transaction.annotation.Transactional;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class CsvService {

    @Autowired
    private final PlayerRepository playerRepository;

    private static final Logger logger = LoggerFactory.getLogger(CsvService.class);

    public CsvService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Transactional
    public List<Player> parseAndSave(MultipartFile file) throws IOException {
        List<Player> players = new ArrayList<>();
        List<Player> buffer = new ArrayList<>();

        CSVFormat format = CSVFormat.Builder.create()
                .setHeader()
                .setIgnoreHeaderCase(true)
                .setTrim(true)
                .build();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVParser parser = new CSVParser(reader, format)) {

            for (CSVRecord record : parser) {
                try {
                    PlayerCsvDto dto = parseRecord(record);

                    if (dto.getFirstName() == null || dto.getLastName() == null || dto.getDateOfBirth() == null) {
                        logger.warn("Missing required fields in row {}: {}", record.getRecordNumber(), record);
                        continue;
                    }

                    LocalDate dob;
                    try {
                        dob = LocalDate.parse(dto.getDateOfBirth());
                    } catch (Exception e) {
                        logger.warn("Invalid date format at row {}: {}", record.getRecordNumber(), dto.getDateOfBirth());
                        continue;
                    }

                    boolean exists = playerRepository.existsByFirstNameAndLastNameAndDateOfBirth(
                            dto.getFirstName(), dto.getLastName(), dob
                    );
                    if (exists) {
                        logger.info("Duplicate player skipped at row {}: {} {}", record.getRecordNumber(), dto.getFirstName(), dto.getLastName());
                        continue;
                    }

                    Player player = new Player();
                    player.setFirstName(dto.getFirstName());
                    player.setLastName(dto.getLastName());
                    player.setNationalities(split(dto.getNationalities()));
                    player.setDateOfBirth(dob);
                    player.setPositions(split(dto.getPositions()));
                    
                    // Parse height with error handling
                    try {
                        if (dto.getHeightCm() != null && !dto.getHeightCm().trim().isEmpty()) {
                            player.setHeightCm(Double.parseDouble(dto.getHeightCm().trim()));
                        } else {
                            logger.warn("Missing height at row {}, setting to 0", record.getRecordNumber());
                            player.setHeightCm(0.0);
                        }
                    } catch (NumberFormatException e) {
                        logger.warn("Invalid height format at row {}: {}, setting to 0", record.getRecordNumber(), dto.getHeightCm());
                        player.setHeightCm(0.0);
                    }
                    
                    player.setCreatedAt(LocalDate.now());
                    player.setModifiedAt(LocalDate.now());

                    buffer.add(player);

                    if (buffer.size() == 1000) {
                        players.addAll(playerRepository.saveAll(buffer));
                        buffer.clear();
                    }

                } catch (Exception e) {
                    logger.error("Error processing row {}: {}", record.getRecordNumber(), e.getMessage());
                }
            }

            players.addAll(playerRepository.saveAll(buffer));
        }

        return players;
    }

    private PlayerCsvDto parseRecord(CSVRecord record) {
        PlayerCsvDto dto = new PlayerCsvDto();
        try {
            dto.setFirstName(record.get("firstName"));
            dto.setLastName(record.get("lastName"));
            dto.setNationalities(record.get("nationalities"));
            dto.setDateOfBirth(record.get("dateOfBirth"));
            dto.setPositions(record.get("positions"));
            dto.setHeightCm(record.get("heightCm"));
        } catch (IllegalArgumentException e) {
            logger.error("Missing required column in CSV: {}", e.getMessage());
            throw new RuntimeException("CSV format error: " + e.getMessage());
        }
        return dto;
    }

    private List<String> split(String input) {
        if (input == null || input.isBlank()) return Collections.emptyList();
        return Arrays.stream(input.split(";")).map(String::trim).toList();
    }
}
