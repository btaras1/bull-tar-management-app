CREATE TABLE "user"
(
    user_id  SERIAL PRIMARY KEY,
    username  varchar(30) NOT NULL,
    password   varchar(30) NOT NULL
);

CREATE TABLE male
(
    male_id  SERIAL PRIMARY KEY,
    name   varchar(30) NOT NULL,
    color    varchar(30) ,
    dob       date,
    pedigree_name    varchar(50) NULL
);
CREATE TABLE female
(
    female_id  SERIAL PRIMARY KEY,
    name   varchar(30) NOT NULL,
    color    varchar(30) ,
    dob       date,
    pedigree_name    varchar(50) NULL
);
CREATE TABLE mating
(
    mating_id  SERIAL PRIMARY KEY,
    "date" date DEFAULT now(),
    male_id int NOT NULL REFERENCES male (male_id),
	female_id int NOT NULL REFERENCES female (female_id)
);
CREATE TABLE litter
(
    litter_id  SERIAL PRIMARY KEY,
    "date" date,
	deliver_date date,
    mating_id int NOT NULL REFERENCES mating (mating_id)
);
CREATE TABLE buyer
(
    buyer_id  SERIAL PRIMARY KEY,
    name   varchar(30) NOT NULL,
    adress   varchar(70),
    mobile_number   varchar(30),
	id_number   varchar(30)
);
CREATE TABLE puppy
(
    puppy_id  SERIAL PRIMARY KEY,
    name   varchar(30) NOT NULL,
	gender boolean,
    color    varchar(30) ,
    microchip   varchar(30) ,
	buyer_paid      boolean,
	buyer_id int REFERENCES buyer (buyer_id)
);
CREATE TABLE puppy_litter
(
    puppy_id int NOT NULL REFERENCES puppy (puppy_id),
	litter_id int NOT NULL REFERENCES litter (litter_id),
	PRIMARY KEY(puppy_id,litter_id)
);

CREATE OR REPLACE FUNCTION deliver_date_litter()
	RETURNS TRIGGER
	AS $$
	BEGIN
	UPDATE litter
	SET deliver_date = date + interval ’2 month’
	WHERE litter.id = NEW.id;
	RETURN NEW;
	END;
	$$
LANGUAGE plpgsql;

CREATE TRIGGER deliver_date_litter
	AFTER INSERT
	ON litter
	FOR EACH ROW
EXECUTE PROCEDURE deliver_date_litter();







