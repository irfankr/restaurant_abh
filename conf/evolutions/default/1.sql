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

INSERT INTO users (id, email, password, firstName, lastname, phone, country, city) VALUES (3000, 'irfankr91@gmail.com', '12345', 'Irfan', 'Krijestorac', '061506652', 'BiH', 'Sarajevo');

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
	locationName varchar(255) NOT NULL,
	foodType varchar(255) NOT NULL,
	PRIMARY KEY (id)
);



INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (1, 'Baja Fresh', 'In August 1990, Baja Fresh Mexican Grill opened its first restaurant featuring all-fresh, traditional fire-grilled Mexican favorites. Like many who grew up on fast food, we realized that it was time for something else, something different and something FRESH. Baja Fresh continues to be passionate about serving the freshest and high quality food in bright, clean environments. We believe in the benefits of eating well, being active and making a contribution to the communities we serve. We call this philosophy  Live Fresh  and you ll find this attitude in everything we do. We choose handmade and farm fresh not tin-canned, freshly prepared over microwaves and freezers. Flavor and nutrition over fillers and fads. At Baja Fresh you ll find eating well is a way of life and a state of mind. We believe in real food made with passion, for real people. Food that s always prepared by hand from real recipes and real farm fresh ingredients. Life should be full of variety, zest and positive energy. Energized by good health and good nutrition. We invite you to Eat Well and Live Fresh by making Baja Fresh a part of your active daily lifestyle.', 33.758599, -84.388575, 18, 4, 4, 'baja', 'Atlanta', 'Mexican/Southwestern | Quick Service');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (2, 'Wingz N Tingz', 'We believe in the benefits of eating well, being active and making a contribution to the communities we serve. We call this philosophy  Live Fresh  and you ll find this attitude in everything we do. We choose handmade and farm fresh not tin-canned, freshly prepared over microwaves and freezers. Flavor and nutrition over fillers and fads. At Baja Fresh you ll find eating well is a way of life and a state of mind. We believe in real food made with passion, for real people. Food that s always prepared by hand from real recipes and real farm fresh ingredients. Life should be full of variety, zest and positive energy.', 42.372756, -71.062121, 28, 6, 2, 'jerkwingz', 'Boston', 'American');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (3, 'Tassili Raw', 'Tassilis Raw Reality is a fast casual restaurant located in Atlanta, Georgia. We specialize in raw vegan cuisines and provide an unique variety of raw vegan entrees like spicy kale salad, kale wraps, and more. Our story starts with our purpose to help people achieve optimal health and thrive. What does that look like. That looks like our vision, to create an employee-owned raw vegan restaurant franchise in every continent in the world. About 6 years ago, Tassili Maat passionately set out to make the best kale in Atlanta, super food that is delicious as healthy. Today, Her brand Tassils Raw Reality is recognized around the world for the best kale in Atlanta and its attractive Afrocentric ambiance. ', 41.896271, -87.726974, 70, 25, 5, 'tassilis', 'Chicago', 'Vegetarian | Vegan');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (4, 'Sufis', 'Tassilis Raw Reality is a fast casual restaurant located in Atlanta, Georgia. We specialize in raw vegan cuisines and provide an unique variety of raw vegan entrees like spicy kale salad, kale wraps, and more. Our story starts with our purpose to help people achieve optimal health and thrive. What does that look like. That looks like our vision, to create an employee-owned raw vegan restaurant franchise in every continent in the world. About 6 years ago, Tassili Maat passionately set out to make the best kale in Atlanta, super food that is delicious as healthy. Today, Her brand Tassils Raw Reality is recognized around the world for the best kale in Atlanta and its attractive Afrocentric ambiance. ', 33.754960, -84.383693, 120, 25, 2, 'sufi', 'Atlanta', 'Middle Eastern');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (5, 'All About BBQ', 'Tassilis Raw Reality is a fast casual restaurant located in Atlanta, Georgia. We specialize in raw vegan cuisines and provide an unique variety of raw vegan entrees like spicy kale salad, kale wraps, and more. Our story starts with our purpose to help people achieve optimal health and thrive. What does that look like. That looks like our vision, to create an employee-owned raw vegan restaurant franchise in every continent in the world. About 6 years ago, Tassili Maat passionately set out to make the best kale in Atlanta, super food that is delicious as healthy. Today, Her brand Tassils Raw Reality is recognized around the world for the best kale in Atlanta and its attractive Afrocentric ambiance. ', 40.770320, -73.956582, 10, 3, 3, 'allbbq', 'New York', 'Barbeque');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (6, 'Pasta n Pizza', 'Fresh and bursting with flavor is what Pizza n Pasta at Westland Mall has to offer. Serving the Miami, FL area we provide great tasting food thats prepared. As a leading Italian Fast Food Restaurant, we take pride in offering the best Pasta dishes, Pizzas and Italian Dishes. We are dedicated to serving the needs of our customers each and every day.', 39.989825, -75.145061, 70, 25, 1, 'pastanpizza', 'Philadelphia', 'Pizza, Italian');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (7, 'Mughlai Cuisine', 'Mughlai Indian Cuisine believes in mastering the art of fine, delicious and well prepared meals that route their way from the rich lands of India to serving our diverse New Yorkers and curious Tourists. Located in the heart of NYC, Experience the taste of Mughlai as it treats each individual with delightful, aromatic and handpicked cuisines prepared by our Royal Master Chefs. The team at Mughlai Indian Cuisine follows a simple motto, to prepare and to serve because that’s what you deserve, The Golden Taste of India.', 42.377560, -71.062976, 320, 75, 3, 'mughlai', 'Boston', 'Indian');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (8, 'Suki Japanese', 'Mughlai Indian Cuisine believes in mastering the art of fine, delicious and well prepared meals that route their way from the rich lands of India to serving our diverse New Yorkers and curious Tourists. Located in the heart of NYC, Experience the taste of Mughlai as it treats each individual with delightful, aromatic and handpicked cuisines prepared by our Royal Master Chefs. The team at Mughlai Indian Cuisine follows a simple motto, to prepare and to serve because that’s what you deserve, The Golden Taste of India.', 25.778793, -80.217120, 60, 30, 5, 'suki', 'Miami', 'Indian');





CREATE TABLE restauranttables(
	id bigint,
	idRestaurant bigint NOT NULL,
	sittingPlaces bigint NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (1, 1, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (2, 1, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (3, 1, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (4, 1, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (5, 1, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (6, 1, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (7, 1, 4);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (8, 2, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (9, 2, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (10, 2, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (11, 2, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (12, 2, 12);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (13, 2, 8);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (14, 2, 4);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (15, 3, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (16, 3, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (17, 3, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (18, 3, 4);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (19, 4, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (20, 4, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (21, 4, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (22, 4, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (23, 4, 10);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (24, 4, 8);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (25, 4, 4);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (26, 5, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (27, 5, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (28, 5, 8);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (29, 5, 10);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (30, 5, 10);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (31, 5, 7);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (32, 5, 6);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (33, 6, 2);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (34, 6, 3);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (35, 6, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (36, 6, 4);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (37, 6, 8);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (38, 6, 8);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (39, 7, 10);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (40, 7, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (41, 7, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (42, 7, 6);

INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (43, 8, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (44, 8, 2);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (45, 8, 6);
INSERT INTO restauranttables (id, idRestaurant, sittingPlaces) VALUES (46, 8, 8);

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

INSERT INTO restaurantcategories (id, name) VALUES (1, 'Vegetarian');
INSERT INTO restaurantcategories (id, name) VALUES (2, 'American');
INSERT INTO restaurantcategories (id, name) VALUES (3, 'Barbeque');

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


INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (1, 1, 1);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (2, 1, 2);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (3, 2, 3);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (4, 3, 2);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (5, 4, 1);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (6, 4, 3);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (7, 5, 2);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (8, 6, 3);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (9, 7, 1);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (10, 7, 2);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (11, 7, 3);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (12, 8, 2);
INSERT INTO restaurantstocategories (id, idRestaurant, idCategory) VALUES (13, 8, 3);


CREATE TABLE restaurantmenuitem(
    id bigint,
    idRestaurant bigint NOT NULL,
    type varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    price float NOT NULL,
    description varchar(1000) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (1, 1, 'Breakfast', 'Pronto Guacamole', 8, '3 oz of fresh ripe Avocados, Garlic, lime Juice, Salsa and Roma Tomatoes.');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (2, 1, 'Breakfast', 'Smoky Queso Fundido', 4, '8 oz spicy, three pepper, cheese dip mixed with our own freshly made Salsa Roja');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (3, 2, 'Breakfast', 'Guacamole & Chips', 4, '8 oz. of fresh ripe Avocados, Garlic, lime Juice, Salsa and Roma Tomatoes.');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (4, 1, 'Breakfast', 'Chips & Salsa', 3, 'Fresh tortilla chips with full salsa bar hosting 6 salsas made fresh everyday.');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (5, 1, 'Breakfast', 'Cheese Calzone', 8, 'Baked or Fried');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (6, 1, 'Lunch', 'Tostada', 8, '8 oz. of fresh ripe Avocados, Garlic');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (7, 1, 'Lunch', 'Baja BBQ Chicken Salad', 5, 'Cheese dip mixed with our own freshly made Salsa Roja');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (8, 1, 'Lunch', 'Baja Ensalada', 12, '3 oz of fresh ripe Avocados, Garlic, lime Juice, Salsa and Roma Tomatoes');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (9, 1, 'Lunch', 'Nachos', 11, '8 oz spicy, three pepper');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (10, 1, 'Lunch', 'Quesadilla', 14, 'Served with freshly made tortilla chips.');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (11, 1, 'Dinner', 'Fajitas', 8, '3 oz of fresh ripe Avocados, Garlic, lime Juice, Salsa and Roma Tomatoes');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (12, 1, 'Dinner', 'Baja BBQ Chicken Salad', 5, '8 oz. of fresh ripe Avocados, Garlic');



INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (13, 2, 'Breakfast', 'Jamaican Patties', 2, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (14, 2, 'Breakfast', 'French Fries', 3, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (15, 2, 'Breakfast', 'Argentine Empanadas', 2, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (16, 2, 'Lunch', 'Grilled Chicken', 13, 'Italian House Salad or Caesar');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (17, 2, 'Lunch', 'Homemade Chicken Salad', 7, 'Italian House or Caesar Salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (18, 2, 'Lunch', 'Pasta Carbonaro', 14, 'With onion & Prosciutto in a cream sauce');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (19, 2, 'Lunch', 'Mochi', 4, 'Two pieces');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (20, 2, 'Lunch', 'King Crab', 5, 'One piece');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (21, 2, 'Dinner', 'Tuna Salad', 9, 'Italian House or Caesar Salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (22, 2, 'Dinner', 'Rainbow Naruto Roll', 12, 'Tuna, salmon, white fish, kani, avocado and tobiko');

INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (23, 3, 'Breakfast', 'Meat Stromboli', 12, 'Pepperoni, Ham, Bacon, Sausage, Meatball');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (24, 3, 'Breakfast', 'Cheese Calzone', 8, 'Baked or Fried');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (25, 3, 'Breakfast', 'Fettuccini Alfredos', 13, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (26, 3, 'Lunch', 'Shrimp Fra Diavolo', 19, 'Spicy Shrimp');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (27, 3, 'Lunch', 'Veal Parmigiana', 14, 'Italian House or Caesar Salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (28, 3, 'Lunch', 'Cheese Ravioli', 10, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (29, 3, 'Lunch', 'Margherita', 4, 'Two pieces');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (30, 3, 'Lunch', 'Vegetable Delight', 18, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (31, 3, 'Dinner', 'Christians Special', 19, 'Marinara Sauce, Fresh Mozzarella, Pepperoni, Ham');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (32, 3, 'Dinner', 'Meatlovers', 20, '5 Meats -Pepperoni, Meatball, Ham, Bacon, Sausage');


INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (33, 5, 'Breakfast', 'White Pizza', 12, 'Pepperoni, Ham, Bacon, Sausage, Meatball');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (34, 5, 'Breakfast', 'Penne alla Vodka Pie', 8, 'Baked or Fried');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (35, 5, 'Breakfast', 'Eggplant Marinara Pie', 13, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (36, 5, 'Lunch', 'Siciliana', 19, 'Spicy Shrimp');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (37, 5, 'Lunch', 'Lasagna Pizza', 14, 'Italian House or Caesar Salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (38, 5, 'Lunch', 'Delicious Pie', 10, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (39, 5, 'Lunch', 'Lasagna', 4, 'Two pieces');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (40, 5, 'Lunch', 'Philly Cheese Steak', 18, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (41, 5, 'Dinner', 'Chicken Salad', 19, 'Marinara Sauce, Fresh Mozzarella, Pepperoni, Ham');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (42, 3, 'Dinner', 'Grilled Marinated Chicken Sub', 20, '5 Meats -Pepperoni, Meatball, Ham, Bacon, Sausage');


INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (43, 7, 'Breakfast', 'Meat Stromboli', 12, 'Pepperoni, Ham, Bacon, Sausage, Meatball');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (44, 7, 'Breakfast', 'Cheese Calzone', 8, 'Baked or Fried');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (45, 7, 'Breakfast', 'Fettuccini Alfredos', 13, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (46, 7, 'Lunch', 'Buffalo Chicken Wrap', 19, 'Spicy Shrimp');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (47, 7, 'Lunch', 'Veal Parmigiana', 14, 'Italian House or Caesar Salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (48, 7, 'Lunch', 'Caesar Salad with Chicken', 10, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (49, 7, 'Lunch', 'Margherita', 4, 'Two pieces');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (50, 7, 'Lunch', 'Vegetable Delight', 18, '');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (51, 7, 'Dinner', 'Cheese Steak Sub', 19, 'Marinara Sauce, Fresh Mozzarella, Pepperoni, Ham');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (52, 3, 'Dinner', 'The New York Salad', 20, '5 Meats -Pepperoni, Meatball, Ham, Bacon, Sausage');


INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (53, 8, 'Breakfast', 'Crazy Roll', 13, 'Spicy tuna, spicy salmon, tempura flake, tobiko and tuna');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (54, 8, 'Breakfast', 'Red Dragon Roll', 13, 'Spicy tuna and crunch topped with pepper tuna, avocado and tobiko');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (55, 8, 'Breakfast', 'Donkey Kong Roll', 10, 'Shrimp tempura topped with banana tempura');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (56, 8, 'Lunch', 'Chicken Teriyaki Bento Box', 18, 'Served with tempura, shumai, a California roll, rice and soup or salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (57, 8, 'Lunch', 'Negimaki Bento Box', 18, 'Served with tempura, shumai, a California roll, rice and soup or salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (58, 8, 'Lunch', 'Sashimi Bento Box', 18, 'Seven pieces. Served with tempura, shumai, a California roll, rice and soup or salad');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (59, 8, 'Lunch', 'Mochi', 4, 'Two pieces');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (60, 8, 'Lunch', 'King Crab', 5, 'One piece');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (61, 8, 'Dinner', 'Samurai Naruto Roll', 9, 'Black pepper tuna, avocado and scallion');
INSERT INTO restaurantmenuitem (id, idRestaurant, type, name, price, description) VALUES (62, 8, 'Dinner', 'Rainbow Naruto Roll', 12, 'Tuna, salmon, white fish, kani, avocado and tobiko');




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

DROP SEQUENCE IF EXISTS hibernate_sequence;