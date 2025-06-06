package com.cinema.backend.repositories;

import com.cinema.backend.models.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
