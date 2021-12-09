package com.bulltar.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity(name ="buyer")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Buyer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buyer_id;

    private String name;
    private String adress;
    private String mobile_number;
    private String id_number;

    @OneToMany(mappedBy="buyer")
    private List<Puppy> puppies;

    public Buyer() {
    }

    public Long getBuyer_id() {
        return buyer_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getMobile_number() {
        return mobile_number;
    }

    public void setMobile_number(String mobile_number) {
        this.mobile_number = mobile_number;
    }

    public String getId_number() {
        return id_number;
    }

    public void setId_number(String id_number) {
        this.id_number = id_number;
    }

    public List<Puppy> getPuppies() {
        return puppies;
    }

    public void setPuppies(List<Puppy> puppies) {
        this.puppies = puppies;
    }
}
