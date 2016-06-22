package controllers;

import models.Reservation;
import models.Restaurant;
import models.RestaurantMenuItem;
import models.RestaurantTables;
import controllers.ReservationController;
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

import java.util.concurrent.TimeUnit;

public class ReservationController extends Controller {
    @Transactional
    public Result checkReservationAvailability() { //Method returns how much tables left for that criteria
        Form<Reservation.ReservationDto> reservationForm = form(Reservation.ReservationDto.class).bindFromRequest();

        //Create return object
        Reservation.CheckReservationAvalibilityNumberTimes responseReservationCheck = getAvailableReservationTimes(reservationForm.get().people, reservationForm.get().date, reservationForm.get().hour, reservationForm.get().idRestaurant);

        if(responseReservationCheck == null) { //If there is no available tables
            return badRequest("{\"error\": \"No available tables!\"}");
        } else {
            //Return
            return ok(Json.toJson(responseReservationCheck));
        }

    }

    // Get information about free tables for that time and persons and suggest best time for reservation
    public static Reservation.CheckReservationAvalibilityNumberTimes getAvailableReservationTimes(String people, String date, String hour, long idRestaurant){

        //Create reservation object
        Reservation reservation = new Reservation();

        //Set persons parameter
        String[] parts = people.split(" ");
        String personsNumber = parts[0]; // 004
        reservation.setPersons(Long.parseLong(personsNumber));

        //Set User ID from session
        if(session("idUser") != null){
            long userId = Long.parseLong(session("idUser"));
            reservation.setIdUser(userId);
        }

        //Time stamp
        String reservationDateTimeFromEmber = date + " " + hour;
        System.out.println("Vrijeme iz Embera: " + reservationDateTimeFromEmber);

        String reservationDateTime = "";
        SimpleDateFormat formatDateTimeFromEmber = new SimpleDateFormat("MMM d, yyyy hh:mm a");
        SimpleDateFormat formatToCheckFunction = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            //Create date object to insert into database
            Date parsedReservationDateTime = formatDateTimeFromEmber.parse(reservationDateTimeFromEmber);
            System.out.println("Konvertovano: " + reservationDateTimeFromEmber);

            //Set date and time of reservation to reservation object
            reservation.setReservationDateTime(parsedReservationDateTime);

            //Create String from Date for checkReservationAvailability method
            reservationDateTime = formatToCheckFunction.format(parsedReservationDateTime);
        }
        catch(ParseException pe) {
            System.out.println("ERROR: Cannot parse date in RestaurantController.makeReservation \"" + reservationDateTime + "\"");
        }

        //Get list of all tables for that id restaurant
        //Create restaurant object
        Restaurant restaurant = new Restaurant();
        List<RestaurantTables> freeTables = new ArrayList<RestaurantTables>();
        System.out.println("Provjera vremena: " + reservationDateTime);
        freeTables = restaurant.checkReservationAvailability(reservation.getPersons(), reservationDateTime, idRestaurant);

        //Get some restaurant details
        restaurant = restaurant.findById(idRestaurant);

        //Create response object
        Reservation.CheckReservationAvalibilityNumberTimes responseReservationCheck = new Reservation.CheckReservationAvalibilityNumberTimes();

        if(freeTables.size() == 0) { //If there is no available tables
            return null;
        } else {
            //Return number of tables
            responseReservationCheck.setTablesLeft(freeTables.size());

            //Get list of best times to recommend
            List<String> listOfBestTimes = getListOfBestTimes(hour, date, reservation.getPersons(), idRestaurant);
            responseReservationCheck.setBestTime(listOfBestTimes);

            //Set additional data for restaurant
            responseReservationCheck.setIdRestaurant(idRestaurant);
            responseReservationCheck.setRestaurantName(restaurant.getRestaurantName());
            responseReservationCheck.setRestaurantImageFilename(restaurant.getImageFileName());

            //Return
            return responseReservationCheck;
        }
    }

    public static List<String> getListOfBestTimes(String reservationFormHour, String reservationFormDate, long persons, long idRestaurant){
        //Create response object
        Reservation.CheckReservationAvalibilityNumberTimes responseReservationCheck = new Reservation.CheckReservationAvalibilityNumberTimes();

        //Times to offer
        List<String> bestTimesArray = new ArrayList<String>(); bestTimesArray.add("08:00 PM"); bestTimesArray.add("08:30 PM"); bestTimesArray.add("09:00 PM"); bestTimesArray.add("09:30 PM"); bestTimesArray.add("07:00 PM"); bestTimesArray.add("07:30 PM");  bestTimesArray.add("06:00 PM"); bestTimesArray.add("06:30 PM"); bestTimesArray.add("05:00 PM"); bestTimesArray.add("05:30 PM");  bestTimesArray.add("04:00 PM"); bestTimesArray.add("04:30 PM"); bestTimesArray.add("03:00 PM"); bestTimesArray.add("03:30 PM"); bestTimesArray.add("02:00 PM"); bestTimesArray.add("02:30 PM"); bestTimesArray.add("01:00 PM"); bestTimesArray.add("01:30 PM"); bestTimesArray.add("12:00 PM"); bestTimesArray.add("12:30 PM"); bestTimesArray.add("10:00 PM"); bestTimesArray.add("11:00 AM"); bestTimesArray.add("11:30 AM"); bestTimesArray.add("10:00 AM"); bestTimesArray.add("10:30 AM"); bestTimesArray.add("09:00 AM"); bestTimesArray.add("09:30 AM");

        //Add chosen time
        responseReservationCheck.addBestTime(reservationFormHour);

        //Remove chosen time from array
        bestTimesArray.remove(reservationFormHour);

        //Loop through best times to offfer
        int i = 0;
        do {
            //Time stamp
            String reservationDateTimeTest = reservationFormDate + " " + bestTimesArray.get(i);

            String reservationDateTime = "";
            SimpleDateFormat formatDateTimeFromEmber = new SimpleDateFormat("MMM d, yyyy hh:mm a");
            SimpleDateFormat formatToCheckFunction = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                //Create date object to insert into database
                Date parsedReservationDateTime = formatDateTimeFromEmber.parse(reservationDateTimeTest);

                //Create String from Date for checkReservationAvailability method
                reservationDateTime = formatToCheckFunction.format(parsedReservationDateTime);

                //Current date
                Date date = new Date();

                if(parsedReservationDateTime.compareTo(date) > 0) {
                    //Get list of all tables for that id restaurant and time
                    Restaurant restoran = new Restaurant();
                    List<RestaurantTables> freeTables = new ArrayList<RestaurantTables>();
                    freeTables = restoran.checkReservationAvailability(persons, reservationDateTime, idRestaurant);

                    if(freeTables.size() > 0){
                        responseReservationCheck.addBestTime(bestTimesArray.get(i));
                    }
                }
            }
            catch(ParseException pe) {
                System.out.println("ERROR: Cannot parse date in RestaurantController.makeReservation \"" + reservationDateTime + "\"");
            }

            i++;
        } while(responseReservationCheck.getBestTime().size() < 4);

        return responseReservationCheck.getBestTime();
    }

    @Transactional
    public Result getFreeTables(){
        Form<Reservation.ReservationDto> reservationForm = form(Reservation.ReservationDto.class).bindFromRequest();

        List<Reservation.CheckReservationAvalibilityNumberTimes> freeTablesRestaurant = new ArrayList<Reservation.CheckReservationAvalibilityNumberTimes>();

        List<Restaurant> restaurants = new ArrayList<Restaurant>();
        Restaurant restaurant = new Restaurant();
        restaurants = restaurant.getAllWithTextFilter(reservationForm.get().searchText);

        //Loop through all restaurants
        for (int i = 0; i < restaurants.size(); i++) {
            Restaurant restaurantTemp = new Restaurant();

            Reservation.CheckReservationAvalibilityNumberTimes reservationsCheck = getAvailableReservationTimes(reservationForm.get().people, reservationForm.get().date, reservationForm.get().hour, restaurants.get(i).getId());

            if(reservationsCheck != null){
                freeTablesRestaurant.add(reservationsCheck);
            }
        }

        if(freeTablesRestaurant.size() == 0) { //If there is no available tables
            return badRequest("{\"error\": \"No available tables!\"}");
        } else {
            //Return
            return ok(Json.toJson(freeTablesRestaurant));
        }
    }

    @Transactional
    public Result getListOfReservationsForUser() {
        //Execute SQL Query
        Query query = JPA.em().createNativeQuery("SELECT rst.restaurantname AS restaurantName,  rst.imagefilename AS imageFileName, res.persons AS guests, res.reservationdatetime AS reservationDateTime FROM reservations res, restaurants rst, restauranttables rtt  WHERE res.idUser = ? AND res.idTable = rtt.id AND rtt.idRestaurant = rst.id ORDER BY res.id DESC");

        long userId = Long.parseLong(session("idUser"));
        query.setParameter(1, userId);

        List resultList = query.getResultList();

        Iterator resultListIterator = resultList.iterator();

        //Create restaurants locations list object
        List<Reservation.UserReservationsDto> userReservations = new ArrayList();

        while (resultListIterator.hasNext()) {
            Object col[] = (Object[])resultListIterator.next();
            Reservation.UserReservationsDto userReservation = new Reservation.UserReservationsDto();

            //Set attribute values
            userReservation.setRestaurantName((String)col[0]);
            userReservation.setImageFileName((String)col[1]);

            BigInteger temp = (BigInteger)col[2];
            userReservation.setGuests(temp.longValue());

            //Convert date to format for display on Ember
            Date dateTemp = (Date)col[3];

            String reservationDateEmber = "";
            String reservationHourEmber = "";
            SimpleDateFormat formatDateForEmber = new SimpleDateFormat("MMM d, yyyy");
            SimpleDateFormat formatHourForEmber = new SimpleDateFormat("hh:mm a");

            //Create String from Date
            reservationDateEmber = formatDateForEmber.format(dateTemp);
            reservationHourEmber = formatHourForEmber.format(dateTemp);

            userReservation.setReservationDate(reservationDateEmber);
            userReservation.setReservationHour(reservationHourEmber);


            userReservations.add(userReservation);
        }

        return ok(Json.toJson(userReservations));
    }
}
