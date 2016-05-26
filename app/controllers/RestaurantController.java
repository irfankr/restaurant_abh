package controllers;

import play.*;
import play.data.DynamicForm;
import static play.data.Form.*;
import play.data.Form;
import play.mvc.*;

import models.Restaurant;
import models.Reservation;

import models.*;

import play.mvc.BodyParser;
import play.libs.Json;
import play.libs.Json.*;
import static play.libs.Json.toJson;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import play.db.*;
import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import play.db.jpa.*;
import play.db.jpa.JPAApi;

import play.db.jpa.Transactional;
import play.db.jpa.JPA;

import java.io.IOException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class RestaurantController extends Controller {
    @Transactional
    public Result getAllRestaurants() {
        //Declare list
        List<Restaurant> restaurants = new ArrayList<Restaurant>();
        Restaurant restaurant = new Restaurant();
        restaurants = restaurant.getAll();

        //Return JSON of all restaurants
        return ok(Json.toJson(restaurants));
    }

    @Transactional
    public Result getRestaurantDetails() {
        //Create restaurantForm

        Form<RestaurantDetailsDto> restaurantForm = form(RestaurantDetailsDto.class).bindFromRequest();
        Restaurant restaurant = new Restaurant();

        long x = Long.parseLong(restaurantForm.get().id);


        //Return JSON of all restaurants
        return ok(Json.toJson(restaurant.findById(x)));
    }

    /*
    @Transactional
    public Result getRestaurantMenu(){
        //Create restaurantForm
        Form<RestaurantDetailsDto> restaurantForm = form(RestaurantDetailsDto.class).bindFromRequest();
        Restaurant restaurant = new Restaurant();
        long x = Long.parseLong(restaurantForm.get().id);

        String menuJson = "{\"Breakfast\":[{\"name\":\"Broccoli Rabe\", \"price\":\"8.95\", \"description\":\"With grilled sausage, olive oil and garlic\"}, {\"name\":\"Fried Mozzarella\", \"price\":\"8.95\"}]}";

        return ok(menuJson);
    }
    */


    @Transactional
    public Result getRestaurantsLocations() {
        //Execute SQL Query
        Query query = JPA.em().createNativeQuery("SELECT r.locationName AS location, COUNT(r.id) AS number FROM restaurants r GROUP BY r.locationName");
        List resultList = query.getResultList();
        //List<Object> queryRestaurantsLocations = (List<Object>) query.getResultList();
        //int queryListSize = queryRestaurantsLocations.size();

        Iterator resultListIterator = resultList.iterator();

        //Create restaurants locations list object
        List<RestaurantLocation> restaurantsLocations = new ArrayList();

        while (resultListIterator.hasNext()) {
            Object col[] = (Object[])resultListIterator.next();
            RestaurantLocation restaurantLocation = new RestaurantLocation();
            //Set attribute values
            restaurantLocation.setLocation((String)col[0]);
            BigInteger temp = (BigInteger)col[1];
            restaurantLocation.setNumber(temp.longValue());

            restaurantsLocations.add(restaurantLocation);
        }

        return ok(Json.toJson(restaurantsLocations));
    }

    @Transactional
    public Result makeReservation() {
        Form<ReservationDto> reservationForm = form(ReservationDto.class).bindFromRequest();

        //Create reservation object
        Reservation reservation = new Reservation();
        reservation.setIdUser(Long.parseLong(reservationForm.get().idUser));
        reservation.setPersons(Long.parseLong(reservationForm.get().persons));
        reservation.setIdTable(Long.parseLong(reservationForm.get().idTable));

        String dateString = reservationForm.get().reservationDateTime;
        //System.out.println("Get from POST request: " + dateString);
        SimpleDateFormat format = new SimpleDateFormat("MMM dd, yyyy HH:mm");
        try {
            Date parsed = format.parse(dateString);

            //Insert into object
            reservation.setReservationDateTime(parsed);
            //System.out.println("Pretvoreno " + parsed.toString());
        }
        catch(ParseException pe) {
            System.out.println("ERROR: Cannot parse date in RestaurantController.makeReservation \"" + dateString + "\"");
        }

        //Save reservation to database
        reservation.save();

        return ok(Json.toJson(reservation));
    }

    /*
    @Transactional
    public Result getAllRestaurantsSortReservationsToday() {
        //Declare list
        List<Restaurant> restaurants = new ArrayList<Restaurant>();
        Restaurant restaurant = new Restaurant();
        restaurants = restaurant.getAllSortByTodayReservations();

        //Return JSON of all restaurants
        return ok(Json.toJson(restaurants));
    }
    */



    public static class RestaurantLocation {
        public String location;
        public long number;

        public RestaurantLocation() {};

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public long getNumber() {
            return number;
        }

        public void setNumber(long number) {
            this.number = number;
        }
    }

    public static class RestaurantDetailsDto {
        public String id;
    }
    public static class ReservationDto {
        public String idTable;
        public String idUser;
        public String persons;
        public String reservationDateTime;
    }
    //Logger.info("SESSION ID: " + session("idUser"));
}
