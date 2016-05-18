# --- !Ups

CREATE TABLE users(
	id bigint,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	firstName varchar(255) NOT NULL,
	lastName varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	country varchar(255) NOT NULL,
	city varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO users (id, email, password, firstName, lastname, phone, country, city) VALUES (1, 'irfankr91@gmail.com', '12345', 'Irfan', 'Krijestorac', '061506652', 'BiH', 'Sarajevo');

CREATE SEQUENCE hibernate_sequence;

# --- !Downs
DROP TABLE users;

DROP SEQUENCE IF EXISTS hibernate_sequence;