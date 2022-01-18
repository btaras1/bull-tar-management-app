package com.bulltar.backend.controller;


import com.bulltar.backend.model.Buyer;
import com.bulltar.backend.model.Puppy;
import com.bulltar.backend.repository.PuppyRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Year;
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

    @PostMapping(value = "{id}")
    public Puppy create(@PathVariable Long id, @RequestBody final Puppy puppy){
        Puppy newPuppy = puppyRepository.saveAndFlush(puppy);
        Long newPuppyId = newPuppy.getId();
        puppyRepository.addToLitter(newPuppyId, id);
        return puppyRepository.getById(newPuppyId);

    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Puppy update(@PathVariable Long id, @RequestBody Puppy puppy){
        Puppy currentPuppy = puppyRepository.getById(id);
        BeanUtils.copyProperties(puppy, currentPuppy, "id","litters");
        return puppyRepository.saveAndFlush(currentPuppy);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        puppyRepository.deleteById(id);
    }

    @GetMapping("/stats")
    Integer getPuppyYearCount(){
        LocalDate firstDate = LocalDate.of(Year.now().getValue(),1,1);
        LocalDate lastDate = LocalDate.of(Year.now().getValue(),12,31);
        return puppyRepository.getPuppyYearCount(firstDate,lastDate);
    }

    @GetMapping("/count")
    Long getPuppyCount(){
        return puppyRepository.count();
    }

    @RequestMapping(value = "buyer/{id}", method = RequestMethod.PUT)
    public Puppy addBuyer(@PathVariable Long id, @RequestBody Buyer buyer){
        Puppy currentPuppy = puppyRepository.getById(id);
        currentPuppy.setBuyer(buyer);
        System.out.println(currentPuppy);
        return puppyRepository.saveAndFlush(currentPuppy);
    }
}
