package controllers;

import play.*;
import play.data.DynamicForm;
import static play.data.Form.*;
import play.data.Form;
import play.mvc.*;

import models.Restaurant;
import models.Reservation;
import models.RestaurantMenuItem;
import models.User;

import controllers.UserController;

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
import java.util.concurrent.TimeUnit;

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

        //Get restaurant
        restaurant = restaurant.findById(x);

        if(restaurant != null){
            return ok(Json.toJson(restaurant));
        } else {
            return badRequest("{\"error\": \"Restaurant doesn't exist!\"}");
        }

    }

    @Transactional
    public Result restaurantVote() {
        //Create restaurantForm
        Form<RestaurantVoteDto> restaurantForm = form(RestaurantVoteDto.class).bindFromRequest();
        Restaurant restaurant = new Restaurant();

        //Get sent id
        long x = Long.parseLong(restaurantForm.get().id);
        System.out.println("ID Restorana: " + x);

        //Get restaurant id
        restaurant = restaurant.findById(x);

        if(restaurant != null){
            //Convert mark string to float
            float mark = Float.parseFloat(restaurantForm.get().mark);
            System.out.println("Ocjena restorana: " + mark);

            if(mark > 5 || mark < 0){
                return badRequest("{\"error\": \"Mark is not in valid format!\"}");
            }

            //Increase mark value in object
            restaurant.setMark(restaurant.getMark() + mark);

            //Increase votes value in object
            restaurant.setVotes(restaurant.getVotes() + 1);

            //Update restaurant in database
            restaurant.update();

            //Return JSON of all restaurants
            return ok();
        } else {
            return badRequest("{\"error\": \"Restaurant doesn't exist!\"}");
        }
    }

    @Transactional
    public Result getRestaurantMenu(){
        //Create restaurantForm
        Form<RestaurantMenuDto> restaurantForm = form(RestaurantMenuDto.class).bindFromRequest();

        //Create restaurant object
        Restaurant restaurant = new Restaurant();

        //Convert String od restaurant id to long
        long idRestaurant = Long.parseLong(restaurantForm.get().idRestaurant);

        List<RestaurantMenuItem> restaurantMenu = new ArrayList<RestaurantMenuItem>();
        restaurantMenu = restaurant.getMenuItems(idRestaurant, restaurantForm.get().type);

        System.out.println(restaurantMenu);

        //Call get menu items method and return result
        return ok(Json.toJson(restaurantMenu));
    }


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

        //Set persons parameter
        String[] parts = reservationForm.get().persons.split(" ");
        String personsNumber = parts[0]; // 004
        reservation.setPersons(Long.parseLong(personsNumber));

        if(session("idUser") != null) {

            //Set User ID from session
            long userId = Long.parseLong(session("idUser"));
            reservation.setIdUser(userId);

            //Time stamp
            String reservationDateTimeFromEmber = reservationForm.get().reservationDate + " " + reservationForm.get().reservationHour;

            String reservationDateTime = "";
            SimpleDateFormat formatDateTimeFromEmber = new SimpleDateFormat("MMM d, yyyy hh:mm a");
            SimpleDateFormat formatToCheckFunction = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                //Create date object to insert into database
                Date parsedReservationDateTime = formatDateTimeFromEmber.parse(reservationDateTimeFromEmber);

                //Set date and time of reservation to reservation object
                reservation.setReservationDateTime(parsedReservationDateTime);

                //Create String from Date for checkReservationAvailability method
                reservationDateTime = formatToCheckFunction.format(parsedReservationDateTime);
            } catch (ParseException pe) {
                System.out.println("ERROR: Cannot parse date in RestaurantController.makeReservation \"" + reservationDateTime + "\"");
            }

            //Get list of all tables for that id restaurant
            long idRestaurant = Long.parseLong(reservationForm.get().idRestaurant);
            //Create restaurant object
            Restaurant restoran = new Restaurant();
            List<RestaurantTables> freeTables = new ArrayList<RestaurantTables>();

            freeTables = restoran.checkReservationAvailability(reservation.getPersons(), reservationDateTime, idRestaurant);

            if (freeTables.size() == 0) { //If there is no available tables
                return badRequest("{\"error\": \"No available tables!\"}");
            } else {
                RestaurantTables firstFreeTable = new RestaurantTables();

                //Get first available table
                firstFreeTable = freeTables.get(0);

                //Set id of table
                reservation.setIdTable(firstFreeTable.getId());

                //Save reservation to database
                reservation.save();

                return ok(Json.toJson(reservation));
            }
        } else {
            return badRequest("{\"error\": \"No user loggedin!\"}");
        }
    }

    @Transactional
    public Result getAllRestaurantsSortReservationsToday() {
        //Declare list
        List<Restaurant> restaurants = new ArrayList<Restaurant>();
        Restaurant restaurant = new Restaurant();
        restaurants = restaurant.getAllSortByTodayReservations();

        //Return JSON of all restaurants
        return ok(Json.toJson(restaurants));
    }



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
    public static class RestaurantVoteDto {
        public String id;
        public String mark;
    }
    public static class ReservationDto {
        public String idRestaurant;
        public String persons;
        public String reservationDate;
        public String reservationHour;
    }
    public static class RestaurantMenuDto {
        public String idRestaurant;
        public String type;
    }
    //Logger.info("SESSION ID: " + session("idUser"));
}
