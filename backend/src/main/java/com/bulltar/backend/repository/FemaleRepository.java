package com.bulltar.backend.repository;

import com.bulltar.backend.model.Female;
import com.bulltar.backend.response.FemaleMatingCountDtoRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FemaleRepository extends JpaRepository<Female, Long> {

    @Query(value = "SELECT fe.name AS \"name\", COUNT(DISTINCT mat.female_id) AS cnt FROM female fe, mating mat WHERE fe.female_id=mat.female_id AND mat.\"date\" >= :firstDate AND mat.\"date\" < :lastDate GROUP BY \"name\"", nativeQuery = true)
    List<FemaleMatingCountDtoRes> getFemaleMatingCount(@Param("firstDate") LocalDate firstDate, @Param("lastDate") LocalDate lastDate);
}
