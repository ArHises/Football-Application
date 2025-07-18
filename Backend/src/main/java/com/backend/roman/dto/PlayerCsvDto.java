package com.backend.roman.dto;

import lombok.Data;

@Data
public class PlayerCsvDto {
    private String firstName;
    private String lastName;
    private String nationalities;
    private String dateOfBirth;
    private String positions;
    private String heightCm;
}
