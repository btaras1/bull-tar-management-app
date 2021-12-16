package com.bulltar.backend.controller;

import com.bulltar.backend.model.Buyer;
import com.bulltar.backend.model.User;
import com.bulltar.backend.repository.BuyerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/buyer")
public class BuyerController {

    @Autowired
    private BuyerRepository buyerRepository;

    @GetMapping
    List<Buyer> findAll(){
        return buyerRepository.findAll();
    }

    @GetMapping("{id}")
    Buyer findById(@PathVariable Long id){
        return buyerRepository.getById(id);
    }

    @PostMapping
    public Buyer create(@RequestBody final Buyer buyer){
        return buyerRepository.saveAndFlush(buyer);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Buyer update(@PathVariable Long id, @RequestBody Buyer buyer){
        Buyer currentBuyer = buyerRepository.getById(id);
        BeanUtils.copyProperties(buyer, currentBuyer, "id");
        return buyerRepository.getById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        buyerRepository.deleteById(id);
    }
}
