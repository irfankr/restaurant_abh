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

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (1, 'Restoran MILKMAN', 'Posjetite Restoran Milkman na dvije lokacije, Milkman Grbavica adresa Grbavicka 8 i Milkman City, Branilaca Sarajeva 3. U bogatoj ponudi jela mozete pronaci sendvice, paste, kuhana jela, te specijalitete kuce kao sto su pileci zalogaji i kljukusice. Restoran Milkman pruza i usluge cateringa za razlicdjite prigode kao sto su rodjendani, prezentacije, seminari, vjencdjanja i slicdjne prilike. Posjetite nas i uvjerite se u kvalitet nase ponude - porucdjuju Vam iz Restorana Milkman! Jos jednostavnije, narucdjite online i nasa dostava ce u najkracem roku biti na Vasoj adresi!', 43.852931, 18.401458, 3, 356, 4, 'milkman', 'Sarajevo - Centar', 'Bosnian | Italian | French');

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (2, 'cevabdzinica VEZIR', 'U ugodnom ambijentu cevabdzinice Vezir na Bascdjarsiji mozete probati najbolje travnicdjke cevape, pripremljene po orginalnoj recepturi uz domaci kajmak ili travnicdjki sos. U ponudi su i drugi specijaliteti sa rostilja vrhunskog kvaliteta, sudzukice, raznjici, piletina, teletina, te ukusne salate. Ako zelite da osjetite miris dobrog rostilja  i u svom domu, sada smo i online tu za Vas, narucdjite i dostava je brzo na Vasoj adresi!', 43.853233, 18.392693, 4, 811, 4, 'cevabdzinicavezir', 'Sarajevo - Centar', 'Bosnian');

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (3, 'Pizzeria AGO', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a pharetra justo. Nullam in urna ut neque aliquet tempor. Sed tempor, leo vel malesuada congue, purus augue iaculis massa, non laoreet ex augue nec lorem. Integer non lobortis sem, eget vestibulum ante. Etiam tempor ligula id placerat feugiat. Nulla in ante varius, posuere risus at, ullamcorper risus. Cras faucibus erat a lectus vulputate gravida. Sed neque ipsum, eleifend in auctor et, lobortis eu sapien. Donec a efficitur risus. Fusce in erat sem. Donec ut nunc iaculis, consequat nunc sit amet, vulputate urna. Donec condimentum dolor dui, nec placerat mauris faucibus sit amet. Nullam iaculis et dui sed mattis. Pellentesque mi nisl, malesuada id ipsum id, tempus maximus dui.', 43.850375, 18.376886, 2, 412, 1, 'pizzeriaago', 'Sarajevo - Stari Grad', 'Italian');

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (4, 'Surf n Fries', 'Surf n Fries je inovativan koncept brze prehrane specijaliziran za proizvode od krumpira, iznad svega „pommes frittes“. zelja nam je bila stvoriti novu kategoriju u urbanoj brzoj prehrani, a mi je volimo zvati „Pomfree Bar“. Najkvalitetniji, najsvjeziji i najukusniji pomfrit u gradu, kako ga kupci vole jos nazvati jeste "KROMPIR KOJI DIsE" :)) Za sve nase specijalitete biramo najbolje moguce sirovine bez obzira na cijenu. Iz tog razloga koristimo A ili Premium klasu krumpira koja sadrzi maksimalno suhe tvari i minimalno vode u svome sastavu. Zato nasi krumpirici nisu masni kada ih posluzimo. Takodjer, nasi krumpirici ne prolaze nikakve kemijske obrade, te NISU GMO proizvod, vec su organskog, prirodnog podrijetla. Ulje za przenje koje koristimo ne sadrzi transmasne kiseline, te ima puno vecu otpornost na temperaturu nego na kojoj se koristi. Takodjer, ulje mijenjamo puno prije nego je to zakonom propisano, upravo zato da nasi proizvodi budu maksimalno zdravi i ukusni. Svi ostali proizvodi poput piletine prolaze najstroze kriterije u proizvodnji. Isto tako i ambalaza u kojoj posluzujemo ima sve certifikate kao npr. za direktan doticaj s masnom hranom, prehrambene sporomigracijske boje. Surf "n" Fries umaci pripravljeni su od strane profesionalnih kuhara upravo za krumpirice. Najcdjesce u ponudi imamo 15 umaka gdje mozete naci od blagih i laganih do jako zacdjinjenih umaka. Umaci su radjeni po principu dodavanja prirodnih sastojaka i zacdjina bez ikakvih kemijskih procesa. Za sebe birajte samo najbolje. Dodjite i uvjerite se u sve nase kvalitete.', 43.847605, 18.364752, 3, 145, 3, 'surfnfries', 'Sarajevo - Novo Sarajevo', 'American | English');

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (5, 'Ascdjinica MEJTAs', 'Buregdzinica i ascdjinica MEJTAs, pored ukusnih pita nudi Vam i veliki izbor tradicionalnih bosanskih jela. U ponudi cete tako naci i grah, sarmu, sitni cevap i druga jela na kasiku, a tu je i solidan izbor pasti, salata, sendvicdja i bosanskih kolacdja. Sve ovo mozete isprobati i na vasoj adresi, uz online narudzbu i besplatnu brzu dostavu.', 43.841888, 18.345127, 3, 548, 4, 'ascinicamejtas', 'Sarajevo - Novi Grad', 'Bosnian | Turkish | Arabian');

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (6, 'Chinese Restaraunt ONLY ONE', 'Kineski restoran ONLY ONE, koji se nalazi u sarajevskom naselju Dobrinja, na adresi zelimira Vidovica Kelija 19, nudi Vam veliki izbor jela pripremljenih po 100% originalnoj kineskoj recepturi. U predivnom ambijentu, i sa prostranom ljetnom bastom, uzivajte u kineskim specijalitetima koje za Vas vjesto piprema majstor Gao Liang, kuhar sa decenijskim kulinarskim iskustvom. Odaberite nesto od blizu 100 razlicdjitih kineskih jela koja obiluju raznovrsnim povrcem, razlicdjitim vrstama mesa, od piletine, teletine, jagnjetine pa do riba i skampi, i uzivajte u istancdjanim okusima istoka i na svojoj kucnoj adresi. Dostava je moguca na podrucdjju cijelog grada, uz minimalno porucdjenih 20KM. Takodje, izaberite laksi nacdjin, bez potrebe da nas zovete na telefon, nakon Vasih par klikova uskoro stizemo na Vasu adresu. Chinese restaraunt ONLY ONE, Sarajevo - Dobrinja!', 43.828285, 18.349714, 4, 65, 5, 'chinaonlyone', 'Sarajevo - Novi Grad', 'Chinese');




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


CREATE TABLE reservations(
	id bigint,
	idTable bigint NOT NULL,
	idUser bigint NOT NULL,
	Persons bigint NOT NULL,
    reservationDateTime timestamp NOT NULL,
	PRIMARY KEY (id)
);




CREATE SEQUENCE hibernate_sequence;

# --- !Downs
DROP TABLE users;
DROP TABLE restaurants;
DROP TABLE restauranttables;
DROP TABLE reservations;

DROP SEQUENCE IF EXISTS hibernate_sequence;