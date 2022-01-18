package com.bulltar.backend.repository;

import com.bulltar.backend.model.City;
import com.bulltar.backend.model.Female;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
