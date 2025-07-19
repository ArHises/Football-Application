package com.backend.roman.repository;

import com.backend.roman.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PlayerRepository extends JpaRepository<Player,Long> , JpaSpecificationExecutor<Player> {
    boolean existsByFirstNameAndLastNameAndDateOfBirth(String firstName, String lastName, LocalDate dateOfBirth);

    @Query("SELECT DISTINCT n FROM Player p JOIN p.nationalities n")
    List<String> findDistinctNationalities();

    @Query("SELECT DISTINCT pos FROM Player p JOIN p.positions pos")
    List<String> findDistinctPositions();
}
