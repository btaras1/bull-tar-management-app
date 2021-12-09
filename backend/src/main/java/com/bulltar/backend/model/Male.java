package com.bulltar.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name ="male")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Male {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long male_id;

    private String name;
    private String color;
    private Date dob;
    private String pedigree_name;

    @OneToMany(mappedBy = "male", cascade = CascadeType.ALL)
    private List<Mating> matings;
    public Male() {
    }

    public Long getMale_id() {
        return male_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPedigree_name() {
        return pedigree_name;
    }

    public void setPedigree_name(String pedigree_name) {
        this.pedigree_name = pedigree_name;
    }
}
