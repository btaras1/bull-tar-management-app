package com.bulltar.backend.repository;

import com.bulltar.backend.model.Mating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface MatingRepository extends JpaRepository<Mating, Long> {
    @Query(value = "SELECT COUNT(*) FROM mating WHERE \"date\" >= :firstDate AND \"date\" < :lastDate ", nativeQuery = true)
    Integer getMatingYearCount(@Param("firstDate") LocalDate firstDate, @Param("lastDate") LocalDate lastDate);

}
