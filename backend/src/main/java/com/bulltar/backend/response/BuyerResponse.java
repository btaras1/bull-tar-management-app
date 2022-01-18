package com.bulltar.backend.response;

import com.bulltar.backend.model.City;

import java.util.Date;

public class BuyerResponse {

    private Long id;
    private String name;
    private Date dob;
    private String adress;
    private City city;
    private String mobile_number;
    private Date litter_date;
    private String male;
    private String female;

    public BuyerResponse(Long id, String name, Date dob, String adress, City city, String mobile_number, Date litter_date, String male, String female) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.adress = adress;
        this.city = city;
        this.mobile_number = mobile_number;
        this.litter_date = litter_date;
        this.male = male;
        this.female = female;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public String getMobile_number() {
        return mobile_number;
    }

    public void setMobile_number(String mobile_number) {
        this.mobile_number = mobile_number;
    }

    public Date getLitter_date() {
        return litter_date;
    }

    public void setLitter_date(Date litter_date) {
        this.litter_date = litter_date;
    }

    public String getMale() {
        return male;
    }

    public void setMale(String male) {
        this.male = male;
    }

    public String getFemale() {
        return female;
    }

    public void setFemale(String female) {
        this.female = female;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }
}
