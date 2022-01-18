package com.bulltar.backend.repository;

import com.bulltar.backend.model.Litter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface LitterRepository extends JpaRepository<Litter, Long> {

   @Query(value = "SELECT COUNT(*) FROM litter WHERE \"date\" >= :firstDate AND \"date\" < :lastDate ", nativeQuery = true)
    Integer getLitterYearCount(@Param("firstDate") LocalDate firstDate, @Param("lastDate") LocalDate lastDate);

   @Query(value ="select * FROM litter order by date DESC LIMIT 1", nativeQuery = true)
   Litter getLastLitter();

   @Query(value="SELECT l.id,l.date,l.deliver_date,l.mating_id FROM\n" +
           "buyer b, puppy p, puppy_litter plt, litter l\n" +
           "WHERE b.id =:buyerId AND p.buyer_id=b.id AND p.id=plt.puppy_id AND l.id=plt.litter_id", nativeQuery = true)
   Litter getByBuyerId(@Param("buyerId") Long buyerId);
}
