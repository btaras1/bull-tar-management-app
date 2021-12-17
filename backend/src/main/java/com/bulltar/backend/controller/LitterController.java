package com.bulltar.backend.controller;

import com.bulltar.backend.model.Litter;
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
        return litterRepository.getById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        litterRepository.deleteById(id);
    }

    @GetMapping("/stats")
    Integer getLitterYearCount(){
        LocalDate firstDate = LocalDate.of(/*Year.now().getValue()*/ 2020,1,1);
        LocalDate lastDate = LocalDate.of(/*Year.now().getValue()*/2020,12,31);

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
}
