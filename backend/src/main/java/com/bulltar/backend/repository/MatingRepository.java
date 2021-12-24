package com.bulltar.backend.repository;

import com.bulltar.backend.model.Mating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MatingRepository extends JpaRepository<Mating, Long> {
    @Query(value = "SELECT COUNT(*) FROM mating WHERE \"date\" >= :firstDate AND \"date\" < :lastDate ", nativeQuery = true)
    Integer getMatingYearCount(@Param("firstDate") LocalDate firstDate, @Param("lastDate") LocalDate lastDate);

    @Query(value = "select * from mating where mating.mating_id not in (select mating_id from litter)", nativeQuery = true)
    List<Mating> noLitter();

}
