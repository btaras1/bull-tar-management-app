package com.bulltar.backend.controller;

import com.bulltar.backend.model.Buyer;
import com.bulltar.backend.model.Male;
import com.bulltar.backend.repository.MaleRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("male")
public class MaleController {

    @Autowired
    private MaleRepository maleRepository;

    @GetMapping
    List<Male> findAll(){
        return maleRepository.findAll();
    }

    @GetMapping("{id}")
    Male findById(@PathVariable Long id){
        return maleRepository.getById(id);
    }

    @PostMapping
    public Male create(@RequestBody final Male male){
        return maleRepository.saveAndFlush(male);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Male update(@PathVariable Long id, @RequestBody Male male){
        Male currentMale = maleRepository.getById(id);
        BeanUtils.copyProperties(male, currentMale, "id");
        return maleRepository.getById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        maleRepository.deleteById(id);
    }
}
