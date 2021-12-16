package com.bulltar.backend.repository;

import com.bulltar.backend.model.Litter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;

public interface LitterRepository extends JpaRepository<Litter, Long> {

   @Query(value = "SELECT COUNT(*) FROM litter WHERE \"date\" >= :firstDate AND \"date\" < :lastDate ", nativeQuery = true)
    Integer getLitterYearCount(@Param("firstDate") LocalDate firstDate, @Param("lastDate") LocalDate lastDate);

}
