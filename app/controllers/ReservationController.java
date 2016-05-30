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
        Form<ReservationDto> reservationForm = form(ReservationDto.class).bindFromRequest();

        //Create reservation object
        Reservation reservation = new Reservation();

        //Set persons parameter
        String[] parts = reservationForm.get().people.split(" ");
        String personsNumber = parts[0]; // 004
        reservation.setPersons(Long.parseLong(personsNumber));

        //Set User ID from session
        if(session("idUser") != null){
            long userId = Long.parseLong(session("idUser"));
            reservation.setIdUser(userId);
        }

        //Time stamp
        String reservationDateTimeFromEmber = reservationForm.get().date + " " + reservationForm.get().hour;
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
        long idRestaurant = Long.parseLong(reservationForm.get().idRestaurant);
        //Create restaurant object
        Restaurant restoran = new Restaurant();
        List<RestaurantTables> freeTables = new ArrayList<RestaurantTables>();
        System.out.println("Provjera vremena: " + reservationDateTime);
        freeTables = restoran.checkReservationAvailability(reservation.getPersons(), reservationDateTime, idRestaurant);

        //Create response object
        CheckReservationAvalibilityNumberTimes responseReservationCheck = new CheckReservationAvalibilityNumberTimes();

        if(freeTables.size() == 0) { //If there is no available tables
            return badRequest("{error: \"No available tables!\"}");
        } else {
            //Return number of tables
            responseReservationCheck.setTablesLeft(freeTables.size());

            //Get list of best times to recommend
            List<String> listOfBestTimes = getListOfBestTimes(reservationForm.get().hour, reservationForm.get().date, reservation.getPersons(), idRestaurant);
            responseReservationCheck.setBestTime(listOfBestTimes);

            //Return
            return ok(Json.toJson(responseReservationCheck));
        }

    }

    public static List<String> getListOfBestTimes(String reservationFormHour, String reservationFormDate, long persons, long idRestaurant){
        //Create response object
        CheckReservationAvalibilityNumberTimes responseReservationCheck = new CheckReservationAvalibilityNumberTimes();

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
    public Result getListOfReservationsForUser() {
        //Execute SQL Query
        Query query = JPA.em().createNativeQuery("SELECT rst.restaurantname AS restaurantName,  rst.imagefilename AS imageFileName, res.persons AS guests, res.reservationdatetime AS reservationDateTime FROM reservations res, restaurants rst, restauranttables rtt  WHERE res.idUser = ? AND res.idTable = rtt.id AND rtt.idRestaurant = rst.id ORDER BY res.id DESC");

        long userId = Long.parseLong(session("idUser"));
        query.setParameter(1, userId);

        List resultList = query.getResultList();

        Iterator resultListIterator = resultList.iterator();

        //Create restaurants locations list object
        List<UserReservationsDto> userReservations = new ArrayList();

        while (resultListIterator.hasNext()) {
            Object col[] = (Object[])resultListIterator.next();
            UserReservationsDto userReservation = new UserReservationsDto();

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

    public static class ReservationDto {
        public String idRestaurant;
        public String people;
        public String date;
        public String hour;
    }

    public static class CheckReservationAvalibilityNumberTimes {
        public long tablesLeft;
        public List<String> bestTime = new ArrayList<String>();

        public CheckReservationAvalibilityNumberTimes() {}

        public long getTablesLeft() {
            return tablesLeft;
        }

        public void setTablesLeft(long tablesLeft) {
            this.tablesLeft = tablesLeft;
        }

        public List<String> getBestTime() {
            return bestTime;
        }

        public void setBestTime(List<String> bestTime) {
            this.bestTime = bestTime;
        }

        public void addBestTime(String bestTime){
            this.bestTime.add(bestTime);
        }
    }

    public static class UserReservationsDto {
        public String restaurantName;
        public String imageFileName; //Restaurant Image
        public long guests;
        public String reservationDate;
        public String reservationHour;

        public String getRestaurantName() {
            return restaurantName;
        }

        public void setRestaurantName(String restaurantName) {
            this.restaurantName = restaurantName;
        }

        public String getImageFileName() {
            return imageFileName;
        }

        public void setImageFileName(String imageFileName) {
            this.imageFileName = imageFileName;
        }

        public long getGuests() {
            return guests;
        }

        public void setGuests(long guests) {
            this.guests = guests;
        }

        public String getReservationDate() {
            return reservationDate;
        }

        public void setReservationDate(String reservationDate) {
            this.reservationDate = reservationDate;
        }

        public String getReservationHour() {
            return reservationHour;
        }

        public void setReservationHour(String reservationHour) {
            this.reservationHour = reservationHour;
        }
    }
}
