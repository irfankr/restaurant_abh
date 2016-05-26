package controllers;

import models.Reservation;
import models.Restaurant;
import models.RestaurantTables;
import play.*;
import play.data.Form;
import play.db.*;
import play.db.jpa.*;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.libs.Json.*;
import play.mvc.*;

import javax.persistence.*;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import static play.data.Form.*;
import static play.libs.Json.toJson;

public class ReservationController extends Controller {
    /*
    @Transactional
    public Result checkReservationAvailability() {
        //Osoba
        Integer y = 4; long osoba = y.longValue();

        //ID restorana
        Integer x = 4; long idRestorana = x.longValue();

        //Time stamp
        String datumRezervacije = "2016-05-27 16:00:00";
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date parsed = format.parse(datumRezervacije);
            //System.out.println("Pretvoreno " + parsed.toString());

            //Testiramo pozivanje metode
            Restaurant restoran = new Restaurant();
            RestaurantTables slobodniStolovi = restoran.checkReservationAvailability(osoba, parsed, idRestorana);
        }
        catch(ParseException pe) {
            System.out.println("ERROR: Cannot parse date in RestaurantController.makeReservation \"" + datumRezervacije + "\"");
        }


        //Return JSON of all restaurants
        return ok();
    }
    */
    //Logger.info("SESSION ID: " + session("idUser"));
}
