package com.bulltar.backend.controller;

import com.bulltar.backend.model.Litter;
import com.bulltar.backend.model.Puppy;
import com.bulltar.backend.repository.LitterRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Year;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("litter")
public class LitterController {

    @Autowired
    private LitterRepository litterRepository;

    @GetMapping
    List<Litter> findAll(){
        return litterRepository.findAll();
    }

    @GetMapping("{id}")
    Litter findById(@PathVariable Long id){
        return litterRepository.getById(id);
    }

    @PostMapping
    public Litter create(@RequestBody final Litter litter){
        return litterRepository.saveAndFlush(litter);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Litter update(@PathVariable Long id, @RequestBody Litter litter){
        Litter currentLitter = litterRepository.getById(id);
        BeanUtils.copyProperties(litter, currentLitter, "id");
        System.out.println(currentLitter);
        return litterRepository.saveAndFlush(currentLitter);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        litterRepository.deleteById(id);
    }

    @GetMapping("/stats")
    Integer getLitterYearCount(){
        LocalDate firstDate = LocalDate.of(Year.now().getValue(),1,1);
        LocalDate lastDate = LocalDate.of(Year.now().getValue(),12,31);

        return litterRepository.getLitterYearCount(firstDate,lastDate);
    }

    @GetMapping("/count")
    Long getLitterCount(){
        return litterRepository.count();
    }

    @GetMapping("/last")
    Litter getLastLitter(){
        return litterRepository.getLastLitter();
    }

    @RequestMapping(value = "puppy/{id}", method = RequestMethod.PUT)
    public Litter addPuppy(@PathVariable Long id, @RequestBody Puppy puppy){
        Litter currentLitter = litterRepository.getById(id);
        List<Puppy> puppies = currentLitter.getPuppies();
        puppies.add(puppy);
        currentLitter.setPuppies(puppies);
        System.out.println(currentLitter);
        return litterRepository.saveAndFlush(currentLitter);
    }
}
