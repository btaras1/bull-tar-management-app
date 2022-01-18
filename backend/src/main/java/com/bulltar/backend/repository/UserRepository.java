package com.bulltar.backend.repository;

import com.bulltar.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM \"user\" u WHERE u.username=:userName", nativeQuery = true)
    Optional <User> findByUsername(@Param("userName") String userName);

    Boolean existsByUsername(String username);

}
