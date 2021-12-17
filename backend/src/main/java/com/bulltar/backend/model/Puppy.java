package com.bulltar.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity(name ="puppy")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Puppy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long puppy_id;

    private String name;
    private boolean gender;
    private String color;
    private String microchip;
    private boolean buyer_paid;

    @ManyToMany(mappedBy = "puppies", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Litter> litters;

    @ManyToOne
    @JoinColumn(name="buyer_id", nullable=false)
    private Buyer buyer;

    public Puppy() {
    }

    public Long getPuppy_id() {
        return puppy_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getMicrochip() {
        return microchip;
    }

    public void setMicrochip(String microchip) {
        this.microchip = microchip;
    }

    public boolean isBuyer_paid() {
        return buyer_paid;
    }

    public void setBuyer_paid(boolean buyer_paid) {
        this.buyer_paid = buyer_paid;
    }

    public List<Litter> getLitters() {
        return litters;
    }

    public void setLitters(List<Litter> litters) {
        this.litters = litters;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }
}
