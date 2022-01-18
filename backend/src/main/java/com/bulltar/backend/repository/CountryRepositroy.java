package com.bulltar.backend.repository;

import com.bulltar.backend.model.Country;
import com.bulltar.backend.model.Female;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepositroy extends JpaRepository<Country, Long> {


}
