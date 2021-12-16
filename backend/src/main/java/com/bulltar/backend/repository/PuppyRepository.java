package com.bulltar.backend.repository;

import com.bulltar.backend.model.Puppy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface PuppyRepository extends JpaRepository<Puppy, Long> {

    @Query(value = "SELECT COUNT(*) FROM puppy pu, litter lt, puppy_litter plt WHERE lt.\"date\" >= :firstDate  AND lt.\"date\" < :lastDate  AND plt.puppy_id=pu.puppy_id AND plt.litter_id=lt.litter_id", nativeQuery = true)
    Integer getPuppyYearCount(@Param("firstDate") LocalDate firstDate, @Param("lastDate") LocalDate lastDate);

}
