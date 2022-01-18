package com.bulltar.backend.controller;

import com.bulltar.backend.model.Buyer;
import com.bulltar.backend.model.Country;
import com.bulltar.backend.repository.BuyerRepository;
import com.bulltar.backend.repository.CountryRepositroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/country")
public class CountryController {

    @Autowired
    private CountryRepositroy countryRepositroy;

    @GetMapping
    List<Country> findAll(){
        return countryRepositroy.findAll();
    }
}
