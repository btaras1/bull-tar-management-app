package com.bulltar.backend.controller;

import com.bulltar.backend.model.Buyer;
import com.bulltar.backend.repository.BuyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BuyerController {

    @Autowired
    private BuyerRepository buyerRepository;

    @GetMapping("/buyer")
    List<Buyer> findAll(){
        return buyerRepository.findAll();
    }

    @GetMapping("buyer/{id}")
    Buyer findById(@PathVariable Long id){
        return buyerRepository.getById(id);
    }
}
