package com.bulltar.backend.controller;

import com.bulltar.backend.model.Puppy;
import com.bulltar.backend.repository.PuppyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PuppyController {

    @Autowired
    private PuppyRepository puppyRepository;

    @GetMapping("/puppy")
    List<Puppy> findAll(){
        return puppyRepository.findAll();
    }

    @GetMapping("/puppy/{id}")
    Puppy findById(@PathVariable Long id){
        return puppyRepository.getById(id);
    }
}
