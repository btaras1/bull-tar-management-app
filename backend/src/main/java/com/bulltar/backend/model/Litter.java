package com.bulltar.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name ="litter")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Litter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long litter_id;

    private Date date;
    private Date deliver_date;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mating_id")
    private Mating mating;

    @ManyToMany
    @JoinTable(
            name="puppy_litter",
            joinColumns = @JoinColumn(name ="litter_id"),
            inverseJoinColumns = @JoinColumn(name = "puppy_id"))
    private List<Puppy> puppies;
    public Litter() {
    }

    public Long getLitter_id() {
        return litter_id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDeliver_date() {
        return deliver_date;
    }

    public void setDeliver_date(Date deliver_date) {
        this.deliver_date = deliver_date;
    }

    public Mating getMating() {
        return mating;
    }

    public void setMating(Mating mating) {
        this.mating = mating;
    }

    public List<Puppy> getPuppies() {
        return puppies;
    }

    public void setPuppies(List<Puppy> puppies) {
        this.puppies = puppies;
    }
}
