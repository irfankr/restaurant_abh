# --- !Ups

CREATE SEQUENCE users_sequence;
CREATE TABLE users(
	id integer default nextval('users_sequence'),
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	firstName varchar(255) NOT NULL,
	lastName varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	country varchar(255) NOT NULL,
	city varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

# --- !Downs
DROP TABLE users;
DROP SEQUENCE users_sequence;
