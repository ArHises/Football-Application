package com.backend.roman.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class PlayerDto {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    @NotBlank
    @Pattern(regexp = "^[A-Za-z\s'-]+$", message = "First name must contain only letters, spaces, apostrophes, or hyphens.")
    private String firstName;
    @NotBlank
    @Pattern(regexp = "^[A-Za-z\s'-]+$", message = "Last name must contain only letters, spaces, apostrophes, or hyphens.")
    private String lastName;
    @NotNull
    private List<@NotBlank String> nationalities;
    @NotNull
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateOfBirth;
    @NotNull
    private List<@NotBlank String> positions;
    @NotNull
    private Double heightCm;
    private LocalDate createdAt;
    private LocalDate modifiedAt;
}
