package com.bulltar.backend.repository;

import com.bulltar.backend.model.Puppy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PuppyRepository extends JpaRepository<Puppy, Long> {
}
