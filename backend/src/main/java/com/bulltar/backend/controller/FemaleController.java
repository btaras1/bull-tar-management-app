package com.bulltar.backend.controller;

import com.bulltar.backend.model.Female;
import com.bulltar.backend.repository.FemaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FemaleController {

    @Autowired
    private FemaleRepository femaleRepository;

    @GetMapping("/female")
    List<Female> findAll(){
        return femaleRepository.findAll();
    }

    @GetMapping("/female/{id}")
    Female findById(@PathVariable Long id){
        return femaleRepository.getById(id);
    }
}
