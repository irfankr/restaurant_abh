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

INSERT INTO users (id, email, password, firstName, lastname, phone, country, city) VALUES (3000, 'irfankr91@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 'Irfan', 'Krijestorac', '061506652', 'Bosnia and Herzegovina', 'Sarajevo');

CREATE TABLE restaurants(
	id bigint,
	restaurantName varchar(255) NOT NULL,
	description varchar(10000) NOT NULL,
	latitude float NOT NULL,
	longitude float NOT NULL,
	mark float NOT NULL,
	votes bigint NOT NULL,
	priceRange bigint NOT NULL,
	imageFileName varchar(255) NOT NULL,
	coverFileName varchar(255) NOT NULL,
	location bigint NOT NULL,
	foodType varchar(255) NOT NULL,
	PRIMARY KEY (id)
);



INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType, coverFileName) VALUES (3001, 'Baja Fresh', 'In August 1990, Baja Fresh Mexican Grill opened its first restaurant featuring all-fresh, traditional fire-grilled Mexican favorites. Like many who grew up on fast food, we realized that it was time for something else, something different and something FRESH. Baja Fresh continues to be passionate about serving the freshest and high quality food in bright, clean environments. We believe in the benefits of eating well, being active and making a contribution to the communities we serve. We call this philosophy  Live Fresh  and you ll find this attitude in everything we do. We choose handmade and farm fresh not tin-canned, freshly prepared over microwaves and freezers. Flavor and nutrition over fillers and fads. At Baja Fresh you ll find eating well is a way of life and a state of mind. We believe in real food made with passion, for real people. Food that s always prepared by hand from real recipes and real farm fresh ingredients. Life should be full of variety, zest and positive energy. Energized by good health and good nutrition. We invite you to Eat Well and Live Fresh by making Baja Fresh a part of your active daily lifestyle.', 33.758599, -84.388575, 18, 4, 4, 'https://s3.amazonaws.com/atlantpraksa/d8b5eee6-167f-49dd-a46f-a1bf6c6aec52.jpg', 3001, 'Mexican/Southwestern | Quick Service', 'https://s3.amazonaws.com/atlantpraksa/d73e4720-160e-4c7e-807e-e041f830fa23.jpg');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType, coverFileName) VALUES (3002, 'Wingz N Tingz', 'We believe in the benefits of eating well, being active and making a contribution to the communities we serve. We call this philosophy  Live Fresh  and you ll find this attitude in everything we do. We choose handmade and farm fresh not tin-canned, freshly prepared over microwaves and freezers. Flavor and nutrition over fillers and fads. At Baja Fresh you ll find eating well is a way of life and a state of mind. We believe in real food made with passion, for real people. Food that s always prepared by hand from real recipes and real farm fresh ingredients. Life should be full of variety, zest and positive energy.', 42.372756, -71.062121, 28, 6, 2, 'https://s3.amazonaws.com/atlantpraksa/7952eea4-d92f-417e-b0ce-ff1b7c2148db.jpg', 3002, 'American', 'https://s3.amazonaws.com/atlantpraksa/a997bbc9-a1be-403c-8ad9-ed45e7fb8625.jpg');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType, coverFileName) VALUES (3003, 'Tassili Raw', 'Tassilis Raw Reality is a fast casual restaurant located in Atlanta, Georgia. We specialize in raw vegan cuisines and provide an unique variety of raw vegan entrees like spicy kale salad, kale wraps, and more. Our story starts with our purpose to help people achieve optimal health and thrive. What does that look like. That looks like our vision, to create an employee-owned raw vegan restaurant franchise in every continent in the world. About 6 years ago, Tassili Maat passionately set out to make the best kale in Atlanta, super food that is delicious as healthy. Today, Her brand Tassils Raw Reality is recognized around the world for the best kale in Atlanta and its attractive Afrocentric ambiance. ', 41.896271, -87.726974, 70, 25, 5, 'https://s3.amazonaws.com/atlantpraksa/426e923c-d400-4f7e-bcf9-dbe7bd0303b0.jpg', 3003, 'Vegetarian | Vegan', 'https://s3.amazonaws.com/atlantpraksa/72d8acbd-da06-4a13-b85d-66cd552eb5cb.jpg');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType, coverFileName) VALUES (3004, 'Sufis', 'Tassilis Raw Reality is a fast casual restaurant located in Atlanta, Georgia. We specialize in raw vegan cuisines and provide an unique variety of raw vegan entrees like spicy kale salad, kale wraps, and more. Our story starts with our purpose to help people achieve optimal health and thrive. What does that look like. That looks like our vision, to create an employee-owned raw vegan restaurant franchise in every continent in the world. About 6 years ago, Tassili Maat passionately set out to make the best kale in Atlanta, super food that is delicious as healthy. Today, Her brand Tassils Raw Reality is recognized around the world for the best kale in Atlanta and its attractive Afrocentric ambiance. ', 33.754960, -84.383693, 120, 25, 2, 'https://s3.amazonaws.com/atlantpraksa/4aa4cbb6-2fa6-48ba-b282-8a276461316b.jpg', 3001, 'Middle Eastern', 'https://s3.amazonaws.com/atlantpraksa/a5fe69ce-b27f-4f2b-a979-3f4915b5c418.jpg');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType, coverFileName) VALUES (3005, 'All About BBQ', 'Tassilis Raw Reality is a fast casual restaurant located in Atlanta, Georgia. We specialize in raw vegan cuisines and provide an unique variety of raw vegan entrees like spicy kale salad, kale wraps, and more. Our story starts with our purpose to help people achieve optimal health and thrive. What does that look like. That looks like our vision, to create an employee-owned raw vegan restaurant franchise in every continent in the world. About 6 years ago, Tassili Maat passionately set out to make the best kale in Atlanta, super food that is delicious as healthy. Today, Her brand Tassils Raw Reality is recognized around the world for the best kale in Atlanta and its attractive Afrocentric ambiance. ', 40.770320, -73.956582, 10, 3, 3, 'https://s3.amazonaws.com/atlantpraksa/7b9a55cd-e407-4a15-b49c-47f8156cf3ed.jpg', 3004, 'Barbeque', 'https://s3.amazonaws.com/atlantpraksa/3ec64b31-e74f-418d-9eaa-3998fbcc4091.jpg');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType, coverFileName) VALUES (3006, 'Pasta n Pizza', 'Fresh and bursting with flavor is what Pizza n Pasta at Westland Mall has to offer. Serving the Miami, FL area we provide great tasting food thats prepared. As a leading Italian Fast Food Restaurant, we take pride in offering the best Pasta dishes, Pizzas and Italian Dishes. We are dedicated to serving the needs of our customers each and every day.', 39.989825, -75.145061, 70, 25, 1, 'https://s3.amazonaws.com/atlantpraksa/7f6fe280-8539-4a89-8092-888c5f2ae8e4.jpg', 3005, 'Pizza, Italian', 'https://s3.amazonaws.com/atlantpraksa/3d71e68b-a825-40f6-8655-207939cd9f90.jpg');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType, coverFileName) VALUES (3007, 'Mughlai Cuisine', 'Mughlai Indian Cuisine believes in mastering the art of fine, delicious and well prepared meals that route their way from the rich lands of India to serving our diverse New Yorkers and curious Tourists. Located in the heart of NYC, Experience the taste of Mughlai as it treats each individual with delightful, aromatic and handpicked cuisines prepared by our Royal Master Chefs. The team at Mughlai Indian Cuisine follows a simple motto, to prepare and to serve because that’s what you deserve, The Golden Taste of India.', 42.377560, -71.062976, 320, 75, 3, 'https://s3.amazonaws.com/atlantpraksa/06988710-60a3-4974-a3a8-73f2682adde8.jpg', 3002, 'Indian', 'https://s3.amazonaws.com/atlantpraksa/ebd6c22c-8793-4e18-b529-8922c3f1b13b.jpg');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType, coverFileName) VALUES (3008, 'Suki Japanese', 'Mughlai Indian Cuisine believes in mastering the art of fine, delicious and well prepared meals that route their way from the rich lands of India to serving our diverse New Yorkers and curious Tourists. Located in the heart of NYC, Experience the taste of Mughlai as it treats each individual with delightful, aromatic and handpicked cuisines prepared by our Royal Master Chefs. The team at Mughlai Indian Cuisine follows a simple motto, to prepare and to serve because that’s what you deserve, The Golden Taste of India.', 25.778793, -80.217120, 60, 30, 5, 'https://s3.amazonaws.com/atlantpraksa/b50f6cb9-a66f-4c00-a5b2-881932b8c787.jpg', 3003, 'Indian', 'https://s3.amazonaws.com/atlantpraksa/a8f536ad-6eb4-409f-b255-17d4005ce080.jpg');





CREATE TABLE restauranttables(
	id bigint,
	idRestaurant bigint NOT NULL,
	sittingPlaces bigint NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3001, 3001, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3002, 3001, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3003, 3001, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3004, 3001, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3005, 3001, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3006, 3001, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3007, 3001, 4);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3008, 3002, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3009, 3002, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3010, 3002, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3011, 3002, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3012, 3002, 12);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3013, 3002, 8);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3014, 3002, 4);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3015, 3003, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3016, 3003, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3017, 3003, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3018, 3003, 4);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3019, 3004, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3020, 3004, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3021, 3004, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3022, 3004, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3023, 3004, 10);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3024, 3004, 8);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3025, 3004, 4);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3026, 3005, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3027, 3005, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3028, 3005, 8);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3029, 3005, 10);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3030, 3005, 10);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3031, 3005, 7);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3032, 3005, 6);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3033, 3006, 2);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3034, 3006, 3);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3035, 3006, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3036, 3006, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3037, 3006, 8);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3038, 3006, 8);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3039, 3007, 10);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3040, 3007, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3041, 3007, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3042, 3007, 6);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3043, 3008, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3044, 3008, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3045, 3008, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3046, 3008, 8);

CREATE TABLE reservations(
	id bigint,
	idTable bigint NOT NULL,
	idUser bigint NOT NULL,
	Persons bigint NOT NULL,
    reservationDateTime timestamp NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE restaurantcategories(
	id bigint,
	name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO restaurantcategories (id, name) VALUES (3001, 'Vegetarian');
INSERT INTO restaurantcategories (id, name) VALUES (3002, 'American');
INSERT INTO restaurantcategories (id, name) VALUES (3003, 'Barbeque');

CREATE TABLE restaurantstocategories(
	id bigint,
	idRestaurant bigint NOT NULL,
    idCategory bigint NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE restaurantlocations(
	id bigint,
	name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE restaurantcomments(
    id bigint,
    mark bigint NOT NULL,
    idUser bigint NOT NULL,
    idRestaurant bigint NOT NULL,
    comment varchar(10000),
    insertTime timestamp NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE restaurantgalleryimages(
    id bigint,
    idRestaurant bigint NOT NULL,
    imageFileName varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO restaurantlocations (id, name) VALUES (3001, 'New York');
INSERT INTO restaurantlocations (id, name) VALUES (3002, 'Chicago');
INSERT INTO restaurantlocations (id, name) VALUES (3003, 'Boston');
INSERT INTO restaurantlocations (id, name) VALUES (3004, 'Philadelphia');
INSERT INTO restaurantlocations (id, name) VALUES (3005, 'Atlanta');
INSERT INTO restaurantlocations (id, name) VALUES (3006, 'Miami');


INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3001, 3001, 3001);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3002, 3001, 3002);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3003, 3002, 3003);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3004, 3003, 3002);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3005, 3004, 3001);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3006, 3004, 3003);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3007, 3005, 3002);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3008, 3006, 3003);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3009, 3007, 3001);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3010, 3007, 3002);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3011, 3007, 3003);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3012, 3008, 3002);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3013, 3008, 3003);

INSERT INTO restaurantcomments (id, mark, idUser, idRestaurant, comment, insertTime) VALUES (3001, 3, 3000, 3002, 'I like it', now());
INSERT INTO restaurantcomments (id, mark, idUser, idRestaurant, comment, insertTime) VALUES (3002, 2, 3000, 3001, 'Average food', now());
INSERT INTO restaurantcomments (id, mark, idUser, idRestaurant, comment, insertTime) VALUES (3003, 4, 3000, 3003, 'Really nice place', now());
INSERT INTO restaurantcomments (id, mark, idUser, idRestaurant, comment, insertTime) VALUES (3004, 1, 3000, 3004, 'I dont like it', now());
INSERT INTO restaurantcomments (id, mark, idUser, idRestaurant, comment, insertTime) VALUES (3005, 5, 3000, 3005, 'Amazing restaurant', now());

INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (3000, 3001, 'https://s3.amazonaws.com/atlantpraksa/gallery/2b48bb20-b07f-4d79-8a0c-939757fde7de.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (3001, 3001, 'https://s3.amazonaws.com/atlantpraksa/gallery/89734ed4-05c9-45b4-9686-ca3766d86b15.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (3002, 3001, 'https://s3.amazonaws.com/atlantpraksa/gallery/17b700a7-90ca-47a5-b9e9-dd9147cbb5a5.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (3003, 3001, 'https://s3.amazonaws.com/atlantpraksa/gallery/806e9fdc-ad0c-49ed-9ea0-3bbd04d70979.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (3004, 3001, 'https://s3.amazonaws.com/atlantpraksa/gallery/9c8f0bbb-5d6c-4a0f-b09d-a464185280e0.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (3005, 3001, 'https://s3.amazonaws.com/atlantpraksa/gallery/924eff73-b9b2-4cb6-b8c3-4a9d657dba6c.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (3006, 3001, 'https://s3.amazonaws.com/atlantpraksa/gallery/706a8017-3b51-402a-909c-45beb397bb2c.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (3007, 3001, 'https://s3.amazonaws.com/atlantpraksa/gallery/647e2c5f-998a-4b30-8d52-554569ac7499.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (3008, 3001, 'https://s3.amazonaws.com/atlantpraksa/gallery/7303570a-fee2-4162-9482-64ba79f9984e.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (3009, 3002, 'https://s3.amazonaws.com/atlantpraksa/gallery/394509d4-b93e-4c2b-a8f9-6d4ed86b2bc5.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (4000, 3002, 'https://s3.amazonaws.com/atlantpraksa/gallery/d393823b-156a-4a7b-9a90-f9bf56d02645.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (4001, 3002, 'https://s3.amazonaws.com/atlantpraksa/gallery/b662be90-f321-4855-adc6-1e8a07760e76.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (4002, 3002, 'https://s3.amazonaws.com/atlantpraksa/gallery/804298c7-e916-4217-a415-2199011eac8e.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (4003, 3004, 'https://s3.amazonaws.com/atlantpraksa/gallery/bac46911-5133-4236-84ff-38c5e5863587.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (4004, 3004, 'https://s3.amazonaws.com/atlantpraksa/gallery/0e960e13-a648-4ddf-aac1-6077e25d4a93.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (4005, 3004, 'https://s3.amazonaws.com/atlantpraksa/gallery/cb4fef8f-178e-4dce-9993-4bacf805c349.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (4006, 3004, 'https://s3.amazonaws.com/atlantpraksa/gallery/41c5cad8-4ee8-4be6-b6ad-5e6457f0b32d.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (4007, 3004, 'https://s3.amazonaws.com/atlantpraksa/gallery/ed857120-aeec-4610-a5e2-c166fa032057.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (4008, 3004, 'https://s3.amazonaws.com/atlantpraksa/gallery/df5c1584-3bf4-4c44-a525-9af11fe646a4.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (4009, 3004, 'https://s3.amazonaws.com/atlantpraksa/gallery/c588b987-cc80-40a5-aec5-d1fa4fdac340.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (5000, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/985de7a8-9aeb-40f3-992e-aa4c2c9ff145.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (5001, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/8182cf99-a26c-406e-baa0-e241a71012ca.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (5002, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/7b61cde5-93a9-41a4-963a-268db71f2caf.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (5003, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/d7bf60b2-7ac6-44f6-8c91-983db1b34a73.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (5004, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/c304767b-3022-43e7-8de5-fa168be4c4af.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (5005, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/84f78da6-6c16-4a36-b18e-ad2753d52e5f.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (5006, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/a7f2013e-73f6-47f0-8e87-a06e459ac36a.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (5007, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/d2d35a72-2e74-49b3-b307-18aaa4fb92e0.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (5008, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/bdbdc421-75b0-401a-ae1e-2c9007070033.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (5009, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/fdfbc890-f10e-4afb-bd9f-203dcf2e096d.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (6000, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/dbb2e76c-8a65-4526-a670-626cb2dae1b9.jpg');
INSERT INTO restaurantgalleryimages (id, idrestaurant, imagefilename) VALUES (6001, 3006, 'https://s3.amazonaws.com/atlantpraksa/gallery/28104fce-1057-45de-8bfa-42b6d03e5d07.jpg');


CREATE TABLE restaurantmenuitem(
    id bigint,
    idRestaurant bigint NOT NULL,
    type varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    price float NULL,
    description varchar(1000) NULL,
    PRIMARY KEY (id)
);


INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3001, 3001, 'Breakfast', 'Pronto Guacamole', 8, '3 oz of fresh ripe Avocados, Garlic, lime Juice, Salsa and Roma Tomatoes.');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3002, 3001, 'Breakfast', 'Smoky Queso Fundido', 4, '8 oz spicy, three pepper, cheese dip mixed with our own freshly made Salsa Roja');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3003, 3002, 'Breakfast', 'Guacamole & Chips', 4, '8 oz. of fresh ripe Avocados, Garlic, lime Juice, Salsa and Roma Tomatoes.');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3004, 3001, 'Breakfast', 'Chips & Salsa', 3, 'Fresh tortilla chips with full salsa bar hosting 6 salsas made fresh everyday.');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3005, 3001, 'Breakfast', 'Cheese Calzone', 8, 'Baked or Fried');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3006, 3001, 'Lunch', 'Tostada', 8, '8 oz. of fresh ripe Avocados, Garlic');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3007, 3001, 'Lunch', 'Baja BBQ Chicken Salad', 5, 'Cheese dip mixed with our own freshly made Salsa Roja');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3008, 3001, 'Lunch', 'Baja Ensalada', 12, '3 oz of fresh ripe Avocados, Garlic, lime Juice, Salsa and Roma Tomatoes');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3009, 3001, 'Lunch', 'Nachos', 11, '8 oz spicy, three pepper');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3010, 3001, 'Lunch', 'Quesadilla', 14, 'Served with freshly made tortilla chips.');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3011, 3001, 'Dinner', 'Fajitas', 8, '3 oz of fresh ripe Avocados, Garlic, lime Juice, Salsa and Roma Tomatoes');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3012, 3001, 'Dinner', 'Baja BBQ Chicken Salad', 5, '8 oz. of fresh ripe Avocados, Garlic');



INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3013, 3002, 'Breakfast', 'Jamaican Patties', 2, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3014, 3002, 'Breakfast', 'French Fries', 3, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3015, 3002, 'Breakfast', 'Argentine Empanadas', 2, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3016, 3002, 'Lunch', 'Grilled Chicken', 13, 'Italian House Salad or Caesar');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3017, 3002, 'Lunch', 'Homemade Chicken Salad', 7, 'Italian House or Caesar Salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3018, 3002, 'Lunch', 'Pasta Carbonaro', 14, 'With onion & Prosciutto in a cream sauce');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3019, 3002, 'Lunch', 'Mochi', 4, 'Two pieces');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3020, 3002, 'Lunch', 'King Crab', 5, 'One piece');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3021, 3002, 'Dinner', 'Tuna Salad', 9, 'Italian House or Caesar Salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3022, 3002, 'Dinner', 'Rainbow Naruto Roll', 12, 'Tuna, salmon, white fish, kani, avocado and tobiko');

INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3023, 3003, 'Breakfast', 'Meat Stromboli', 12, 'Pepperoni, Ham, Bacon, Sausage, Meatball');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3024, 3003, 'Breakfast', 'Cheese Calzone', 8, 'Baked or Fried');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3025, 3003, 'Breakfast', 'Fettuccini Alfredos', 13, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3026, 3003, 'Lunch', 'Shrimp Fra Diavolo', 19, 'Spicy Shrimp');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3027, 3003, 'Lunch', 'Veal Parmigiana', 14, 'Italian House or Caesar Salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3028, 3003, 'Lunch', 'Cheese Ravioli', 10, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3029, 3003, 'Lunch', 'Margherita', 4, 'Two pieces');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3030, 3003, 'Lunch', 'Vegetable Delight', 18, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3031, 3003, 'Dinner', 'Christians Special', 19, 'Marinara Sauce, Fresh Mozzarella, Pepperoni, Ham');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3032, 3003, 'Dinner', 'Meatlovers', 20, '5 Meats -Pepperoni, Meatball, Ham, Bacon, Sausage');


INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3033, 3005, 'Breakfast', 'White Pizza', 12, 'Pepperoni, Ham, Bacon, Sausage, Meatball');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3034, 3005, 'Breakfast', 'Penne alla Vodka Pie', 8, 'Baked or Fried');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3035, 3005, 'Breakfast', 'Eggplant Marinara Pie', 13, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3036, 3005, 'Lunch', 'Siciliana', 19, 'Spicy Shrimp');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3037, 3005, 'Lunch', 'Lasagna Pizza', 14, 'Italian House or Caesar Salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3038, 3005, 'Lunch', 'Delicious Pie', 10, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3039, 3005, 'Lunch', 'Lasagna', 4, 'Two pieces');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3040, 3005, 'Lunch', 'Philly Cheese Steak', 18, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3041, 3005, 'Dinner', 'Chicken Salad', 19, 'Marinara Sauce, Fresh Mozzarella, Pepperoni, Ham');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3042, 3003, 'Dinner', 'Grilled Marinated Chicken Sub', 20, '5 Meats -Pepperoni, Meatball, Ham, Bacon, Sausage');


INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3043, 3007, 'Breakfast', 'Meat Stromboli', 12, 'Pepperoni, Ham, Bacon, Sausage, Meatball');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3044, 3007, 'Breakfast', 'Cheese Calzone', 8, 'Baked or Fried');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3045, 3007, 'Breakfast', 'Fettuccini Alfredos', 13, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3046, 3007, 'Lunch', 'Buffalo Chicken Wrap', 19, 'Spicy Shrimp');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3047, 3007, 'Lunch', 'Veal Parmigiana', 14, 'Italian House or Caesar Salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3048, 3007, 'Lunch', 'Caesar Salad with Chicken', 10, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3049, 3007, 'Lunch', 'Margherita', 4, 'Two pieces');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3050, 3007, 'Lunch', 'Vegetable Delight', 18, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3051, 3007, 'Dinner', 'Cheese Steak Sub', 19, 'Marinara Sauce, Fresh Mozzarella, Pepperoni, Ham');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3052, 3003, 'Dinner', 'The New York Salad', 20, '5 Meats -Pepperoni, Meatball, Ham, Bacon, Sausage');


INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3053, 3008, 'Breakfast', 'Crazy Roll', 13, 'Spicy tuna, spicy salmon, tempura flake, tobiko and tuna');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3054, 3008, 'Breakfast', 'Red Dragon Roll', 13, 'Spicy tuna and crunch topped with pepper tuna, avocado and tobiko');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3055, 3008, 'Breakfast', 'Donkey Kong Roll', 10, 'Shrimp tempura topped with banana tempura');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3056, 3008, 'Lunch', 'Chicken Teriyaki Bento Box', 18, 'Served with tempura, shumai, a California roll, rice and soup or salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3057, 3008, 'Lunch', 'Negimaki Bento Box', 18, 'Served with tempura, shumai, a California roll, rice and soup or salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3058, 3008, 'Lunch', 'Sashimi Bento Box', 18, 'Seven pieces. Served with tempura, shumai, a California roll, rice and soup or salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3059, 3008, 'Lunch', 'Mochi', 4, 'Two pieces');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3060, 3008, 'Lunch', 'King Crab', 5, 'One piece');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3061, 3008, 'Dinner', 'Samurai Naruto Roll', 9, 'Black pepper tuna, avocado and scallion');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3062, 3008, 'Dinner', 'Rainbow Naruto Roll', 12, 'Tuna, salmon, white fish, kani, avocado and tobiko');




CREATE SEQUENCE hibernate_sequence;

# --- !Downs
DROP TABLE users;
DROP TABLE restaurants;
DROP TABLE restauranttables;
DROP TABLE reservations;
DROP TABLE restaurantmenuitem;
DROP TABLE restaurantcategories;
DROP TABLE restaurantstocategories;
DROP TABLE restaurantlocations;
DROP TABLE restaurantcomments;
DROP TABLE restaurantgalleryimages;

DROP SEQUENCE IF EXISTS hibernate_sequence;