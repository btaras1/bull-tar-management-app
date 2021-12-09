INSERT INTO "user"(username, password)
VALUES ('dtaras','123123'),
       ('btaras','123123');

INSERT INTO male (name,color,dob,pedigree_name)
VALUES ('Face','Tigrasto bijela','2020-01-15','Face'),
       ('Kan','Crno bijela','2020-03-20','Kan'),
       ('Ukie','Crveno bijela','2020-04-07','Zorro');

INSERT INTO female (name,color,dob,pedigree_name)
VALUES ('Coco','Crno bijela','2020-01-15','Kyra'),
       ('Rea','Crno bijela','2020-03-20','Konna'),
       ('Bella','Crno bijela','2020-04-07','Bella');

INSERT INTO mating (male_id,female_id)
VALUES  (1,1),
		(2,2),
		(3,3);



INSERT INTO litter ("date",deliver_date,mating_id)
VALUES ('2020-01-15','2020-03-15',1),
       ('2020-03-20','2020-05-20',2),
       ('2020-04-07','2020-06-07',3);


INSERT INTO buyer (name,adress,mobile_number,id_number)
VALUES ('Tonci Huljic','Splitska 92','0987654321','54549825696'),
		('Stipe Pletikosa','Splitska 44','0987654885','54111825696'),
		('Pero Peric','Ilica 92','0975654321','54511425696'),
		('Marin Milan','Optujska 92','0988856321','54521258696'),
		('Ole Solskaer','JedenStrasse 11b','0918545921','54545285696'),
		('Marin Cilic','Zagrebacka 192','0987784321','54546625696');

INSERT INTO puppy (name,gender,color,microchip,buyer_paid, buyer_id)
VALUES ('Pingo','Muzjak','Crna','12545254698563',true,1),
('Pingo','Muzjak','Crvena','12545254698563',true,2),
('Ringo','Muzjak','Crna','12545255598563',false,3),
('Morz','Muzjak','Crvena','12545299698563',true,4),
('Akita','Zenka','Crvena','12545277698563',false,5),
('Didi','Zenka','Crna','12545254666563',true,6),
('Frida','Zenka','Crna','12545254228563',false,null),
('Jack','Muzjak','Crna','12545254128563',true,null);

INSERT INTO puppy_litter(puppy_id,litter_id)
VALUES(1,1),
(2,1),
(3,1),
(4,3),
(5,3),
(6,2),
(7,2),
(8,2);