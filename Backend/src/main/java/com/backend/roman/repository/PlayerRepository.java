package com.backend.roman.repository;

import com.backend.roman.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;

public interface PlayerRepository extends JpaRepository<Player,Long> , JpaSpecificationExecutor<Player> {
    boolean existsByFirstNameAndLastNameAndDateOfBirth(String firstName, String lastName, LocalDate dateOfBirth);
}
