package com.bulltar.backend.controller;

import com.bulltar.backend.model.Buyer;
import com.bulltar.backend.model.Litter;
import com.bulltar.backend.repository.BuyerRepository;
import com.bulltar.backend.repository.LitterRepository;
import com.bulltar.backend.repository.MatingRepository;
import com.bulltar.backend.response.BuyerResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/buyer")
public class BuyerController {

    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private LitterRepository litterRepository;

    @Autowired
    private MatingRepository matingRepository;

    @GetMapping
    List<Buyer> findAll(){
        return buyerRepository.findAll();
    }

    @GetMapping("/detail")
    List<BuyerResponse> findAllDetail(){
        List<Buyer> allBuyers = buyerRepository.findAll();
        List<BuyerResponse> newBuyersList = new ArrayList<>();
        for (Buyer buyer: allBuyers) {
            Litter currentLitter = null;
            currentLitter = litterRepository.getByBuyerId(buyer.getId());
            newBuyersList.add(new BuyerResponse(
                    buyer.getId(),
                    buyer.getName(),
                    buyer.getDob(),
                    buyer.getAdress(),
                    buyer.getCity(),
                    buyer.getMobile_number(),
                    currentLitter.getDate(),
                    currentLitter.getMating().getMale().getName(),
                    currentLitter.getMating().getFemale().getName()));
        }


        return newBuyersList;
    }
    @GetMapping("/detail/{id}")
    BuyerResponse findAllBuyerDetail(@PathVariable Long id){
        Buyer buyer = buyerRepository.getById(id);
        Litter currentLitter = litterRepository.getByBuyerId(buyer.getId());
        BuyerResponse currentBuyerDetail = new BuyerResponse(
                    buyer.getId(),
                    buyer.getName(),
                    buyer.getDob(),
                    buyer.getAdress(),
                    buyer.getCity(),
                    buyer.getMobile_number(),
                    currentLitter.getDate(),
                    currentLitter.getMating().getMale().getName(),
                    currentLitter.getMating().getFemale().getName());



        return currentBuyerDetail;
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
        return buyerRepository.saveAndFlush(currentBuyer);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        buyerRepository.deleteById(id);
    }
}
