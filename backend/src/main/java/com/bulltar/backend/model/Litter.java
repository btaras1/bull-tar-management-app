package com.bulltar.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name ="litter")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Litter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date date;
    @Temporal(TemporalType.DATE)
    private Date deliver_date;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mating_id")
    private Mating mating;

    @ManyToMany(mappedBy = "litters", cascade = CascadeType.ALL)

    private List<Puppy> puppies;
    public Litter() {
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

    @Override
    public String toString() {
        return getMating().toString() + " " + getPuppies().toString();
    }
}
