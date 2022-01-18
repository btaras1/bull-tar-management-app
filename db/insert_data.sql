

INSERT INTO male (name,color,dob,pedigree_name)
VALUES ('Denis','Tigrasto bijela','2020-01-15','Face'),
       ('Kan','Crno bijela','2020-03-20','Kan'),
       ('Ukie','Crveno bijela','2020-04-07','Zorro');

INSERT INTO female (name,color,dob,pedigree_name)
VALUES ('Coco','Crno bijela','2020-01-15','Kyra'),
       ('Karma','Tigrasto bijela','2020-03-20','Konna'),
       ('Bella','Crno bijela','2020-04-07','Bella');

INSERT INTO mating (male_id,female_id)
VALUES  (1,1),
		(2,2),
		(3,3);



INSERT INTO litter ("date",deliver_date,mating_id)
VALUES ('2020-01-15','2020-03-15',1),
       ('2020-03-20','2020-05-20',2),
       ('2020-04-07','2020-06-07',3);


INSERT INTO buyer (name,dob,adress,city_id,mobile_number,id_number)
VALUES ('Tonci Huljic','2020-01-15','Splitska 92',1,'0987654321','54549825696'),
		('Stipe Pletikosa','2020-01-15','Splitska 44',2,'0987654885','54111825696'),
		('Pero Peric','2020-01-15','Ilica 92',3,'0975654321','54511425696'),
		('Marin Milan','2020-01-15','Optujska 92',4,'0988856321','54521258696'),
		('Ole Solskaer','2020-01-15','JedenStrasse 11b',5,'0918545921','54545285696'),
		('Marin Cilic','2020-01-15','Zagrebacka 192',6,'0987784321','54546625696');

INSERT INTO puppy (name,gender,color,microchip,buyer_paid, buyer_id)
VALUES ('Pingo',true,'Crna','12545254698563',true,1),
('Pingo',true,'Crvena','12545254698563',true,2),
('Ringo',true,'Crna','12545255598563',false,3),
('Morz',true,'Crvena','12545299698563',true,4),
('Akita',false,'Crvena','12545277698563',false,5),
('Didi',false,'Crna','12545254666563',true,6),
('Frida',false,'Crna','12545254228563',false,null),
('Jack',true,'Crna','12545254128563',true,null);

INSERT INTO puppy_litter(puppy_id,litter_id)
VALUES(1,1),
(2,1),
(3,1),
(4,3),
(5,3),
(6,2),
(7,2),
(8,2);
