package com.bulltar.backend.controller;

import com.bulltar.backend.model.Buyer;
import com.bulltar.backend.model.City;
import com.bulltar.backend.model.Country;
import com.bulltar.backend.model.Female;
import com.bulltar.backend.repository.BuyerRepository;
import com.bulltar.backend.repository.CityRepository;
import com.bulltar.backend.repository.CountryRepositroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/city")
public class CityController {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private CountryRepositroy countryRepositroy;

    @GetMapping
    List<City> findAll(){
        return cityRepository.findAll();
    }

    @RequestMapping(value = "/country/{id}", method = RequestMethod.GET)
    List<City> findCitiesByCountryId(@PathVariable Long id){
        Country currentCountry = countryRepositroy.getById(id);
        return currentCountry.getCities();
    }




}
