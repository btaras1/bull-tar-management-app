package com.bulltar.backend.controller;

import com.bulltar.backend.model.Litter;
import com.bulltar.backend.repository.LitterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LitterController {

    @Autowired
    private LitterRepository litterRepository;

    @GetMapping("/litter")
    List<Litter> findAll(){
        return litterRepository.findAll();
    }

    @GetMapping("/litter/{id}")
    Litter findById(@PathVariable Long id){
        return litterRepository.getById(id);
    }
}
