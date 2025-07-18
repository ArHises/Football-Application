package com.backend.roman.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class PlayerDto {
//    @JsonIgnore
    private Long id;
    private String firstName;
    private String lastName;
    private List<String> nationalities;
    private LocalDate dateOfBirth;
    private List<String> positions;
    private Double heightCm;
    private LocalDate createdAt;
    private LocalDate modifiedAt;

}
