package com.cinema.backend.controllers;


import com.cinema.backend.models.City;
import com.cinema.backend.repositories.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
    @RequestMapping("/api/v1/cities")
    public class CityController {
        @Autowired
        private CityRepository cityRepository;

        @GetMapping
        public List<City> getCities() {
            return cityRepository.findAll();
        }
    }
