package com.bulltar.backend.controller;


import com.bulltar.backend.model.Puppy;
import com.bulltar.backend.repository.PuppyRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/puppy")
public class PuppyController {

    @Autowired
    private PuppyRepository puppyRepository;

    @GetMapping
    List<Puppy> findAll(){
        return puppyRepository.findAll();
    }

    @GetMapping("{id}")
    Puppy findById(@PathVariable Long id){
        return puppyRepository.getById(id);
    }

    @PostMapping
    public Puppy create(@RequestBody final Puppy puppy){
        return puppyRepository.saveAndFlush(puppy);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Puppy update(@PathVariable Long id, @RequestBody Puppy puppy){
        Puppy currentPuppy = puppyRepository.getById(id);
        BeanUtils.copyProperties(puppy, currentPuppy, "id");
        return puppyRepository.getById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        puppyRepository.deleteById(id);
    }

    @GetMapping("/stats")
    Integer getPuppyYearCount(){
        LocalDate firstDate = LocalDate.of(/*Year.now().getValue()*/ 2020,1,1);
        LocalDate lastDate = LocalDate.of(/*Year.now().getValue()*/2020,12,31);
        return puppyRepository.getPuppyYearCount(firstDate,lastDate);
    }

    @GetMapping("/count")
    Long getPuppyCount(){
        return puppyRepository.count();
    }

}
