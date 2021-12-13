package com.bulltar.backend.controller;

import com.bulltar.backend.model.Male;
import com.bulltar.backend.repository.MaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MaleController {

    @Autowired
    private MaleRepository maleRepository;

    @GetMapping("/male")
    List<Male> findAll(){
        return maleRepository.findAll();
    }

    @GetMapping("/male/{id}")
    Male findById(@PathVariable Long id){
        return maleRepository.getById(id);
    }
}
