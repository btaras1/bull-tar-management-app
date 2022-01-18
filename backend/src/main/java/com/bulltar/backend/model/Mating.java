package com.bulltar.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

@Entity(name ="mating")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Mating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date date;

    @ManyToOne
    @JoinColumn(name="male_id", nullable=false)

    private Male male;

    @ManyToOne
    @JoinColumn(name="female_id", nullable=false)

    private Female female;

    @OneToOne(mappedBy = "mating", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, optional = true)
    @JsonIgnore
    private Litter litter;

    public Mating() {
    }

    public Long getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Male getMale() {
        return male;
    }

    public void setMale(Male male) {
        this.male = male;
    }

    public Female getFemale() {
        return female;
    }

    public void setFemale(Female female) {
        this.female = female;
    }

    public Litter getLitter() {
        return litter;
    }

    public void setLitter(Litter litter) {
        this.litter = litter;
    }

    @Override
    public String toString() {
        return getMale().getName() + " " + getFemale().getName();
    }
}