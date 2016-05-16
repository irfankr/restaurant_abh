# Users schema
 
# --- !Ups
 
CREATE TABLE User (
	id integer AUTO_INCREMENT,
	email varchar(255),
	password varchar(255),
	firstName varchar(255),
	lastName varchar(255)L,
	phone varchar(255),
	country varchar(255),
	city varchar(255),
	PRIMARY KEY (id)
);
 
# --- !Downs
