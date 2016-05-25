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

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (1, 'Restoran MILKMAN', 'Posjetite Restoran Milkman na dvije lokacije, Milkman Grbavica adresa Grbavička 8 i Milkman City, Branilaca Sarajeva 3. U bogatoj ponudi jela možete pronaći sendviče, paste, kuhana jela, te specijalitete kuće kao što su pileći zalogaji i kljukušice. Restoran Milkman pruža i usluge cateringa za različite prigode kao što su rođendani, prezentacije, seminari, vjenčanja i slične prilike. Posjetite nas i uvjerite se u kvalitet naše ponude - poručuju Vam iz Restorana Milkman! Još jednostavnije, naručite online i naša dostava će u najkraćem roku biti na Vašoj adresi!', 43.852931, 18.401458, 3, 356, 4, 'milkman', 'Sarajevo - Centar', 'Bosnian | Italian | French');

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (2, 'Ćevabdžinica VEZIR', 'U ugodnom ambijentu Ćevabdžinice Vezir na Baščaršiji možete probati najbolje travničke ćevape, pripremljene po orginalnoj recepturi uz domaći kajmak ili travnički sos. U ponudi su i drugi specijaliteti sa roštilja vrhunskog kvaliteta, sudžukice, ražnjići, piletina, teletina, te ukusne salate. Ako želite da osjetite miris dobrog roštilja  i u svom domu, sada smo i online tu za Vas, naručite i dostava je brzo na Vašoj adresi!', 43.853233, 18.392693, 4, 811, 4, 'cevabdzinicavezir', 'Sarajevo - Centar', 'Bosnian');

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (3, 'Pizzeria AGO', 'Ako želite probati odličnu pizzu iz naše bogate ponude ili izabrati jedan od naših ukusnih sendviča, kojih imamo preko 10 u ponudi, onda smo Vaša prava adresa! Fast Food i Pizzeria AGO, nalazi se na adresi M.M.Bašeskije 17, u centru Sarajeva (Ferhadija) i jedno je od omiljenih mjesta za ljubitelje dobrog i kvalitetnog zalogaja. Bogata ponuda sendviča i pizza, a uz to i super povoljne cijene i specijalne ponude, su zasigurno ono što nas je jako brzo izdvojilo u odnosu na ostale. Iz tog razloga pozivamo i Vas da nam, ukoliko to već niste, ukažete povjerenje a mi Vam garantujemo zadovoljstvo kvalitetom naših jela i usluge. Od sada Vam ne treba telefon, naručite jednostavno online i udobno se smjestite i sačekajte Vašu narudžbu na svojoj adresi, dostava je besplatna!', 43.850375, 18.376886, 2, 412, 1, 'pizzeriaago', 'Sarajevo - Stari Grad', 'Italian');

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (4, 'Surf n Fries', 'Surf n Fries je inovativan koncept brze prehrane specijaliziran za proizvode od krumpira, iznad svega „pommes frittes“. Želja nam je bila stvoriti novu kategoriju u urbanoj brzoj prehrani, a mi je volimo zvati „Pomfree Bar“. Najkvalitetniji, najsvježiji i najukusniji pomfrit u gradu, kako ga kupci vole još nazvati jeste "KROMPIR KOJI DIŠE" :)) Za sve naše specijalitete biramo najbolje moguće sirovine bez obzira na cijenu. Iz tog razloga koristimo A ili Premium klasu krumpira koja sadrži maksimalno suhe tvari i minimalno vode u svome sastavu. Zato naši krumpirići nisu masni kada ih poslužimo. Također, naši krumpirići ne prolaze nikakve kemijske obrade, te NISU GMO proizvod, već su organskog, prirodnog podrijetla. Ulje za prženje koje koristimo ne sadrži transmasne kiseline, te ima puno veću otpornost na temperaturu nego na kojoj se koristi. Također, ulje mijenjamo puno prije nego je to zakonom propisano, upravo zato da naši proizvodi budu maksimalno zdravi i ukusni. Svi ostali proizvodi poput piletine prolaze najstrože kriterije u proizvodnji. Isto tako i ambalaža u kojoj poslužujemo ima sve certifikate kao npr. za direktan doticaj s masnom hranom, prehrambene sporomigracijske boje. Surf "n" Fries umaci pripravljeni su od strane profesionalnih kuhara upravo za krumpiriće. Najčešće u ponudi imamo 15 umaka gdje možete naći od blagih i laganih do jako začinjenih umaka. Umaci su rađeni po principu dodavanja prirodnih sastojaka i začina bez ikakvih kemijskih procesa. Za sebe birajte samo najbolje. Dođite i uvjerite se u sve naše kvalitete.', 43.847605, 18.364752, 3, 145, 3, 'surfnfries', 'Sarajevo - Novo Sarajevo', 'American | English');

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (5, 'Aščinica MEJTAŠ', 'Buregdžinica i aščinica MEJTAŠ, pored ukusnih pita nudi Vam i veliki izbor tradicionalnih bosanskih jela. U ponudi ćete tako naći i grah, sarmu, sitni ćevap i druga jela na kašiku, a tu je i solidan izbor pasti, salata, sendviča i bosanskih kolača. Sve ovo možete isprobati i na vašoj adresi, uz online narudžbu i besplatnu brzu dostavu.', 43.841888, 18.345127, 3, 548, 4, 'ascinicamejtas', 'Sarajevo - Novi Grad', 'Bosnian | Turkish | Arabian');

INSERT INTO restaurants (id, restaurantName, description, latitude, longitude, mark, votes, priceRange, imageFileName, locationName, foodType) VALUES (6, 'Chinese Restaraunt ONLY ONE', 'Kineski restoran ONLY ONE, koji se nalazi u sarajevskom naselju Dobrinja, na adresi Želimira Vidovića Kelija 19, nudi Vam veliki izbor jela pripremljenih po 100% originalnoj kineskoj recepturi. U predivnom ambijentu, i sa prostranom ljetnom baštom, uživajte u kineskim specijalitetima koje za Vas vješto piprema majstor Gao Liang, kuhar sa decenijskim kulinarskim iskustvom. Odaberite nešto od blizu 100 različitih kineskih jela koja obiluju raznovrsnim povrćem, različitim vrstama mesa, od piletine, teletine, jagnjetine pa do riba i škampi, i uživajte u istančanim okusima istoka i na svojoj kućnoj adresi. Dostava je moguća na području cijelog grada, uz minimalno poručenih 20KM. Takođe, izaberite lakši način, bez potrebe da nas zovete na telefon, nakon Vaših par klikova uskoro stižemo na Vašu adresu. Chinese restaraunt ONLY ONE, Sarajevo - Dobrinja!', 43.828285, 18.349714, 4, 65, 5, 'chinaonlyone', 'Sarajevo - Novi Grad', 'Chinese');





CREATE SEQUENCE hibernate_sequence;

# --- !Downs
DROP TABLE users;
DROP TABLE restaurants;

DROP SEQUENCE IF EXISTS hibernate_sequence;
