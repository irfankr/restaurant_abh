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
	location bigint NOT NULL,
	foodType varchar(255) NOT NULL,
	PRIMARY KEY (id)
);



INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType) VALUES (3001, 'Baja Fresh', 'In August 1990, Baja Fresh Mexican Grill opened its first restaurant featuring all-fresh, traditional fire-grilled Mexican favorites. Like many who grew up on fast food, we realized that it was time for something else, something different and something FRESH. Baja Fresh continues to be passionate about serving the freshest and high quality food in bright, clean environments. We believe in the benefits of eating well, being active and making a contribution to the communities we serve. We call this philosophy  Live Fresh  and you ll find this attitude in everything we do. We choose handmade and farm fresh not tin-canned, freshly prepared over microwaves and freezers. Flavor and nutrition over fillers and fads. At Baja Fresh you ll find eating well is a way of life and a state of mind. We believe in real food made with passion, for real people. Food that s always prepared by hand from real recipes and real farm fresh ingredients. Life should be full of variety, zest and positive energy. Energized by good health and good nutrition. We invite you to Eat Well and Live Fresh by making Baja Fresh a part of your active daily lifestyle.', 33.758599, -84.388575, 18, 4, 4, 'baja', 3001, 'Mexican/Southwestern | Quick Service');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType) VALUES (3002, 'Wingz N Tingz', 'We believe in the benefits of eating well, being active and making a contribution to the communities we serve. We call this philosophy  Live Fresh  and you ll find this attitude in everything we do. We choose handmade and farm fresh not tin-canned, freshly prepared over microwaves and freezers. Flavor and nutrition over fillers and fads. At Baja Fresh you ll find eating well is a way of life and a state of mind. We believe in real food made with passion, for real people. Food that s always prepared by hand from real recipes and real farm fresh ingredients. Life should be full of variety, zest and positive energy.', 42.372756, -71.062121, 28, 6, 2, 'jerkwingz', 3002, 'American');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType) VALUES (3003, 'Tassili Raw', 'Tassilis Raw Reality is a fast casual restaurant located in Atlanta, Georgia. We specialize in raw vegan cuisines and provide an unique variety of raw vegan entrees like spicy kale salad, kale wraps, and more. Our story starts with our purpose to help people achieve optimal health and thrive. What does that look like. That looks like our vision, to create an employee-owned raw vegan restaurant franchise in every continent in the world. About 6 years ago, Tassili Maat passionately set out to make the best kale in Atlanta, super food that is delicious as healthy. Today, Her brand Tassils Raw Reality is recognized around the world for the best kale in Atlanta and its attractive Afrocentric ambiance. ', 41.896271, -87.726974, 70, 25, 5, 'tassilis', 3003, 'Vegetarian | Vegan');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType) VALUES (3004, 'Sufis', 'Tassilis Raw Reality is a fast casual restaurant located in Atlanta, Georgia. We specialize in raw vegan cuisines and provide an unique variety of raw vegan entrees like spicy kale salad, kale wraps, and more. Our story starts with our purpose to help people achieve optimal health and thrive. What does that look like. That looks like our vision, to create an employee-owned raw vegan restaurant franchise in every continent in the world. About 6 years ago, Tassili Maat passionately set out to make the best kale in Atlanta, super food that is delicious as healthy. Today, Her brand Tassils Raw Reality is recognized around the world for the best kale in Atlanta and its attractive Afrocentric ambiance. ', 33.754960, -84.383693, 120, 25, 2, 'sufi', 3001, 'Middle Eastern');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType) VALUES (3005, 'All About BBQ', 'Tassilis Raw Reality is a fast casual restaurant located in Atlanta, Georgia. We specialize in raw vegan cuisines and provide an unique variety of raw vegan entrees like spicy kale salad, kale wraps, and more. Our story starts with our purpose to help people achieve optimal health and thrive. What does that look like. That looks like our vision, to create an employee-owned raw vegan restaurant franchise in every continent in the world. About 6 years ago, Tassili Maat passionately set out to make the best kale in Atlanta, super food that is delicious as healthy. Today, Her brand Tassils Raw Reality is recognized around the world for the best kale in Atlanta and its attractive Afrocentric ambiance. ', 40.770320, -73.956582, 10, 3, 3, 'allbbq', 3004, 'Barbeque');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType) VALUES (3006, 'Pasta n Pizza', 'Fresh and bursting with flavor is what Pizza n Pasta at Westland Mall has to offer. Serving the Miami, FL area we provide great tasting food thats prepared. As a leading Italian Fast Food Restaurant, we take pride in offering the best Pasta dishes, Pizzas and Italian Dishes. We are dedicated to serving the needs of our customers each and every day.', 39.989825, -75.145061, 70, 25, 1, 'pastanpizza', 3005, 'Pizza, Italian');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType) VALUES (3007, 'Mughlai Cuisine', 'Mughlai Indian Cuisine believes in mastering the art of fine, delicious and well prepared meals that route their way from the rich lands of India to serving our diverse New Yorkers and curious Tourists. Located in the heart of NYC, Experience the taste of Mughlai as it treats each individual with delightful, aromatic and handpicked cuisines prepared by our Royal Master Chefs. The team at Mughlai Indian Cuisine follows a simple motto, to prepare and to serve because that’s what you deserve, The Golden Taste of India.', 42.377560, -71.062976, 320, 75, 3, 'mughlai', 3002, 'Indian');
INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, location, foodType) VALUES (3008, 'Suki Japanese', 'Mughlai Indian Cuisine believes in mastering the art of fine, delicious and well prepared meals that route their way from the rich lands of India to serving our diverse New Yorkers and curious Tourists. Located in the heart of NYC, Experience the taste of Mughlai as it treats each individual with delightful, aromatic and handpicked cuisines prepared by our Royal Master Chefs. The team at Mughlai Indian Cuisine follows a simple motto, to prepare and to serve because that’s what you deserve, The Golden Taste of India.', 25.778793, -80.217120, 60, 30, 5, 'suki', 3003, 'Indian');





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

INSERT INTO restaurantcomments (id, mark, idUser, idRestaurant, comment) VALUES (3001, 3, 3000, 3002, 'I like it');
INSERT INTO restaurantcomments (id, mark, idUser, idRestaurant, comment) VALUES (3002, 2, 3000, 3001, 'Average food');
INSERT INTO restaurantcomments (id, mark, idUser, idRestaurant, comment) VALUES (3003, 4, 3000, 3003, 'Really nice place');
INSERT INTO restaurantcomments (id, mark, idUser, idRestaurant, comment) VALUES (3004, 1, 3000, 3004, 'I dont like it');
INSERT INTO restaurantcomments (id, mark, idUser, idRestaurant, comment) VALUES (3005, 5, 3000, 3005, 'Amazing restaurant');


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

DROP SEQUENCE IF EXISTS hibernate_sequence;