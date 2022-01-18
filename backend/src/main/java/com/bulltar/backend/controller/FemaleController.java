package com.bulltar.backend.controller;

import com.bulltar.backend.model.Buyer;
import com.bulltar.backend.model.Female;
import com.bulltar.backend.repository.FemaleRepository;
import com.bulltar.backend.response.FemaleMatingCountDtoRes;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;

@RestController
@RequestMapping("/female")
public class FemaleController {

    @Autowired
    private FemaleRepository femaleRepository;

    @GetMapping
    List<Female> findAll(){
        return femaleRepository.findAll();
    }

    @GetMapping("{id}")
    Female findById(@PathVariable Long id){
        return femaleRepository.getById(id);
    }

    @PostMapping
    public Female create(@RequestBody final Female female){
        return femaleRepository.saveAndFlush(female);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Female update(@PathVariable Long id, @RequestBody Female female){
        Female currentFemale = femaleRepository.getById(id);
        BeanUtils.copyProperties(female, currentFemale, "id");
        return femaleRepository.saveAndFlush(currentFemale);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        femaleRepository.deleteById(id);
    }

    @GetMapping("/mating")
    List<FemaleMatingCountDtoRes> getMatingCount(){
        LocalDate firstDate = LocalDate.of(Year.now().getValue(),1,1);
        LocalDate lastDate = LocalDate.of(Year.now().getValue(),12,31);
        return femaleRepository.getFemaleMatingCount(firstDate,lastDate);
    }
}
