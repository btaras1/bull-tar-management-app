package com.bulltar.backend.controller;

import com.bulltar.backend.model.Mating;
import com.bulltar.backend.repository.MatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MatingController {

    @Autowired
    private MatingRepository matingRepository;

    @GetMapping("/mating")
    List<Mating> findAll(){
        return matingRepository.findAll();
    }

    @GetMapping("/mating/{id}")
    Mating findById(@PathVariable Long id){
        return matingRepository.getById(id);
    }
}
