package com.bulltar.backend.repository;

import com.bulltar.backend.model.Litter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LitterRepository extends JpaRepository<Litter, Long> {
}
