package com.bulltar.backend.controller;

import com.bulltar.backend.model.Buyer;
import com.bulltar.backend.model.Mating;
import com.bulltar.backend.repository.MatingRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;

@RestController
@RequestMapping("/mating")
public class MatingController {

    @Autowired
    private MatingRepository matingRepository;

    @GetMapping
    List<Mating> findAll(){
        return matingRepository.findAll();
    }

    @GetMapping("{id}")
    Mating findById(@PathVariable Long id){
        return matingRepository.getById(id);
    }

    @PostMapping
    public Mating create(@RequestBody final Mating mating){
        return matingRepository.saveAndFlush(mating);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Mating update(@PathVariable Long id, @RequestBody Mating mating){
        Mating currentMating = matingRepository.getById(id);
        BeanUtils.copyProperties(mating, currentMating, "id");
        return matingRepository.saveAndFlush(currentMating);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        matingRepository.deleteById(id);
    }

    @GetMapping("/stats")
    Integer getMatingYearCount(){
        LocalDate firstDate = LocalDate.of(Year.now().getValue(),1,1);
        LocalDate lastDate = LocalDate.of(Year.now().getValue(),12,31);
        return matingRepository.getMatingYearCount(firstDate,lastDate);
    }

    @GetMapping("/count")
    Long getMatingCount(){
        return matingRepository.count();
    }

    @GetMapping("/nolitter")
    List<Mating> findWithoutLitter(){ return matingRepository.noLitter();}
}
