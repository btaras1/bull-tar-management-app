CREATE TABLE "user"
(
    id  SERIAL PRIMARY KEY,
    username  varchar(30) NOT NULL,
    password   varchar(150) NOT NULL,
    active boolean,
    roles varchar(50)
);

CREATE TABLE male
(
    id  SERIAL PRIMARY KEY,
    name   varchar(30) NOT NULL,
    color    varchar(30) ,
    dob       date,
    pedigree_name    varchar(50) NULL
);
CREATE TABLE female
(
    id  SERIAL PRIMARY KEY,
    name   varchar(30) NOT NULL,
    color    varchar(30) ,
    dob       date,
    pedigree_name    varchar(50) NULL
);
CREATE TABLE mating
(
    id  SERIAL PRIMARY KEY,
    "date" date DEFAULT now(),
    male_id int NOT NULL REFERENCES male (id),
	female_id int NOT NULL REFERENCES female (id)
);
CREATE TABLE litter
(
    id  SERIAL PRIMARY KEY,
    "date" date,
	deliver_date date,
    mating_id int NOT NULL REFERENCES mating (id)
);
CREATE TABLE country(  
	id INT,
  	name VARCHAR(70),
	PRIMARY KEY(id)
);
create table city (
	id serial primary key,
	name varchar(150),
	country_id int REFERENCES country (id)
);
CREATE TABLE buyer
(
    id  SERIAL PRIMARY KEY,
    name   varchar(30) NOT NULL,
    dob date,
    adress   varchar(30),
    city_id int REFERENCES city(id),
    mobile_number   varchar(30),
	id_number   varchar(30)
);
CREATE TABLE puppy
(
    id  SERIAL PRIMARY KEY,
    name   varchar(30) NOT NULL,
	gender boolean,
    color    varchar(30) ,
    microchip   varchar(30) ,
	buyer_paid      boolean,
	buyer_id int REFERENCES buyer (id)
);
CREATE TABLE puppy_litter
(
    puppy_id int NOT NULL REFERENCES puppy (id),
	litter_id int NOT NULL REFERENCES litter (id),
	PRIMARY KEY(puppy_id,litter_id)
);

CREATE OR REPLACE FUNCTION deliver_date_litter()
	RETURNS TRIGGER
	AS $$
	BEGIN
	NEW.deliver_date = NEW.date + INTERVAL '2 months'
	RETURN NEW;
	END;
	$$
LANGUAGE plpgsql;

CREATE TRIGGER deliver_date_litter
	BEFORE INSERT OR UPDATE
	ON litter
	FOR EACH ROW
EXECUTE PROCEDURE deliver_date_litter();







