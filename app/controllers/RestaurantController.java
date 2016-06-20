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

import javax.persistence.criteria.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;

public class RestaurantController extends Controller {
    /*
    @Transactional
    public Result getAllRestaurants() {
        Form<Restaurant.PaginationDto> restaurantForm = form(Restaurant.PaginationDto.class).bindFromRequest();

        //Declare list
        List<Restaurant> restaurants = new ArrayList<Restaurant>();
        Restaurant restaurant = new Restaurant();
        restaurants = restaurant.getAllWithLimitOffset(restaurantForm.get().pageNumber, restaurantForm.get().itemsPerPage);

        //Insert categories string in restaurant
        for (int i = 0; i < restaurants.size(); i++) {
            restaurants.get(i).setFoodType(Restaurant.getStringRestaurantCategories(Long.valueOf(restaurants.get(i).getId())));
        }

        //Return JSON of all restaurants
        return ok(Json.toJson(restaurants));
    }

    @Transactional
    public Result getNumberOfRestaurantPages(){
        Form<Restaurant.PaginationNumberOfPagesDto> restaurantForm = form(Restaurant.PaginationNumberOfPagesDto.class).bindFromRequest();

        Query query = JPA.em().createNativeQuery("SELECT CEIL(ROUND((COUNT(id) * 1.0) / ?, 2)) FROM restaurants");
        query.setParameter(1, restaurantForm.get().itemsPerPage);
        List resultList = query.getResultList();
        Object queryNumberOfPages = (Object) query.getSingleResult();

        BigDecimal temp = (BigDecimal)queryNumberOfPages;
        Restaurant.PaginationPagesDto numberOfPages = new Restaurant.PaginationPagesDto();
        numberOfPages.setNumberOfPages(temp.longValue());

        return ok(Json.toJson(numberOfPages));
    }
    */

    @Transactional
    public Result getRestaurantDetails() {
        //Create restaurantForm

        Form<Restaurant.RestaurantDetailsDto> restaurantForm = form(Restaurant.RestaurantDetailsDto.class).bindFromRequest();
        Restaurant restaurant = new Restaurant();

        //Get restaurant
        restaurant = restaurant.findById(restaurantForm.get().id);


        if(restaurant != null){
            //Insert string of foodtype (restaurant categories)
            restaurant.setFoodType(Restaurant.getStringRestaurantCategories(restaurantForm.get().id));

            return ok(Json.toJson(restaurant));
        } else {
            return badRequest("{\"error\": \"Restaurant doesn't exist!\"}");
        }

    }

    @Transactional
    public Result restaurantVote() {
        //Create restaurantForm
        Form<Restaurant.RestaurantVoteDto> restaurantForm = form(Restaurant.RestaurantVoteDto.class).bindFromRequest();
        Restaurant restaurant = new Restaurant();

        //Get sent id
        long x = restaurantForm.get().id;
        System.out.println("ID Restorana: " + x);

        //Get restaurant id
        restaurant = restaurant.findById(x);

        if(restaurant != null){
            //Convert mark string to float
            float mark = restaurantForm.get().mark;
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
        Form<Restaurant.RestaurantMenuDto> restaurantForm = form(Restaurant.RestaurantMenuDto.class).bindFromRequest();

        //Create restaurant object
        Restaurant restaurant = new Restaurant();

        //Convert String od restaurant id to long
        long idRestaurant = restaurantForm.get().idRestaurant;

        List<RestaurantMenuItem> restaurantMenu = new ArrayList<RestaurantMenuItem>();
        restaurantMenu = restaurant.getMenuItems(idRestaurant, restaurantForm.get().type);

        System.out.println(restaurantMenu);

        //Call get menu items method and return result
        return ok(Json.toJson(restaurantMenu));
    }

    @Transactional
    public Result getRestaurantsByFilter(){
        Form<Restaurant.RestaurantsFilterDto> restaurantForm = form(Restaurant.RestaurantsFilterDto.class).bindFromRequest();
        System.out.println(restaurantForm);

        EntityManager em = JPA.em();
        CriteriaBuilder qb = em.getCriteriaBuilder();
        CriteriaQuery<Restaurant> criteria = qb.createQuery(Restaurant.class);
        Root<Restaurant> query = criteria.from(Restaurant.class);

        //Create conditions
        //Constructing list of parameters
        List<Predicate> predicates = new ArrayList<Predicate>();

            if(restaurantForm.get().priceRange != 0){
                //Price range
                predicates.add(qb.lessThanOrEqualTo(query.get("priceRange"), restaurantForm.get().priceRange));
            }

        // .add(categories.name
            if(restaurantForm.get().mark != 0) {
                //Marks
                Expression<Integer> mark = query.get("mark");
                Expression<Integer> votes = query.get("votes");
                Expression<Number> quot1 = qb.quot(mark, votes);
                Expression<Long> roundExpression = qb.function("round", Long.class, quot1);

                predicates.add(qb.lessThanOrEqualTo(roundExpression, restaurantForm.get().mark));
            }

            if(restaurantForm.get().searchText != null && restaurantForm.get().searchText != "") {
                //Search text
                predicates.add(qb.like(query.<String>get("restaurantName"), "%"+restaurantForm.get().searchText+"%"));
            }

            //Categories
            //Expression<Collection<Long>> categories = query.get("categories");
            for (int i = 0; i < restaurantForm.get().categories.size(); i++) {
                Long categoryId = restaurantForm.get().categories.get(i);

                //Expression<Long> tempCategoryId = restaurantForm.get().categories.get(i);

                //predicates.add(qb.in(r, categories));


                //predicates.add(qb.lessThanOrEqualTo(query.get("priceRange"), restaurantForm.get().priceRange));
                System.out.println(categoryId);
            }

        //Execute query
        criteria.select(query).where(predicates.toArray(new Predicate[]{}));
        criteria.orderBy(qb.asc(query.get("id")));

        //Get result from queryCriteriaQuery.
        long offsetRestaurants = (restaurantForm.get().pageNumber-1) * restaurantForm.get().itemsPerPage;
        int offsetRestaurantsInt = (int) offsetRestaurants;
        int itemsPerPageInt = (int) restaurantForm.get().itemsPerPage;
        List<Restaurant> restaurants = em.createQuery(criteria).setMaxResults(itemsPerPageInt).setFirstResult(offsetRestaurantsInt).getResultList();

        //Create return class
        Restaurant.RestaurantsDto returnRestaurants = new Restaurant.RestaurantsDto();

        //Insert restaurants
        returnRestaurants.setRestaurants(restaurants);

        //Insert number of restaurants page
        List<Restaurant> restaurantsTemp = em.createQuery(criteria).getResultList();

        int restaurantsSize = (int) restaurantsTemp.size();
        int numberOfRestaurantPages = (int) Math.ceil(restaurantsSize*1.00 / itemsPerPageInt*1.00);
        System.out.println("BROJ STRANA:" + numberOfRestaurantPages);
        returnRestaurants.setNumberOfRestaurantPages(numberOfRestaurantPages);

        return ok(Json.toJson(returnRestaurants));
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
        List<Restaurant.RestaurantLocation> restaurantsLocations = new ArrayList();

        while (resultListIterator.hasNext()) {
            Object col[] = (Object[])resultListIterator.next();
            Restaurant.RestaurantLocation restaurantLocation = new Restaurant.RestaurantLocation();
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
        Form<Restaurant.ReservationDto> reservationForm = form(Restaurant.ReservationDto.class).bindFromRequest();
        System.out.println("**********************************************************************");
        System.out.println(reservationForm);

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
            long idRestaurant = reservationForm.get().idRestaurant;
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

    /* Admin */
    @Transactional
    public Result getFilteredRestaurants() {
        Form<Restaurant.RestaurantsFilterDto> inputForm = form(Restaurant.RestaurantsFilterDto.class).bindFromRequest();

        EntityManager em = JPA.em();
        CriteriaBuilder qb = em.getCriteriaBuilder();
        CriteriaQuery<Restaurant> criteria = qb.createQuery(Restaurant.class);
        Root<Restaurant> query = criteria.from(Restaurant.class);

        //Create conditions
        List<Predicate> predicates = new ArrayList<Predicate>();

        if(inputForm.get().searchText != null && inputForm.get().searchText != "") {
            //Search text
            predicates.add(qb.like(query.<String>get("restaurantName"), "%"+inputForm.get().searchText+"%"));
        }

        //Execute query
        criteria.select(query).where(predicates.toArray(new Predicate[]{}));
        criteria.orderBy(qb.asc(query.get("id")));

        //Get result from query
        long offsetItems = (inputForm.get().pageNumber-1) * inputForm.get().itemsPerPage;
        int offsetItemsInt = (int) offsetItems;
        int itemsPerPageInt = (int) inputForm.get().itemsPerPage;
        List<Restaurant> restaurants = em.createQuery(criteria).setMaxResults(itemsPerPageInt).setFirstResult(offsetItemsInt).getResultList();

        //Create return class
        Restaurant.RestaurantsDto returnItems = new Restaurant.RestaurantsDto();

        //Insert restaurants
        returnItems.setRestaurants(restaurants);

        //Insert number of restaurants page
        List<Restaurant> itemsTemp = em.createQuery(criteria).getResultList();

        int itemsSize = (int) itemsTemp.size();
        int numberOfPages = (int) Math.ceil(itemsSize*1.00 / itemsPerPageInt*1.00);

        returnItems.setNumberOfRestaurantPages(numberOfPages);

        return ok(Json.toJson(returnItems));
    }

    @Transactional
    public Result addRestaurant() {
        Form<Restaurant.FormRestaurantDto> inputForm = form(Restaurant.FormRestaurantDto.class).bindFromRequest();

        //Create object
        Restaurant restaurant = new Restaurant();

        //Insert values
        restaurant.setRestaurantName(inputForm.get().restaurantName);
        restaurant.setDescription(inputForm.get().description);
        restaurant.setImageFileName(inputForm.get().imageFileName);
        restaurant.setLatitude(inputForm.get().latitude);
        restaurant.setLongitude(inputForm.get().longitude);
        restaurant.setLocationName(inputForm.get().locationName);
        restaurant.setPriceRange(inputForm.get().priceRange);
        restaurant.setFoodType("NO");

        //Save to database
        restaurant.save();

        return ok(Json.toJson(restaurant));

    }

    @Transactional
    public Result editRestaurant() {
        Form<Restaurant.FormRestaurantDto> inputForm = form(Restaurant.FormRestaurantDto.class).bindFromRequest();

        //Create object
        Restaurant restaurant = new Restaurant();
        restaurant = restaurant.findById(inputForm.get().id);

        if(restaurant != null){
            //Update values
            restaurant.setRestaurantName(inputForm.get().restaurantName);
            restaurant.setDescription(inputForm.get().description);
            restaurant.setImageFileName(inputForm.get().imageFileName);
            restaurant.setLatitude(inputForm.get().latitude);
            restaurant.setLongitude(inputForm.get().longitude);
            restaurant.setLocationName(inputForm.get().locationName);
            restaurant.setPriceRange(inputForm.get().priceRange);
            restaurant.setFoodType("NO");

            //Save to database
            restaurant.update();

            return ok(Json.toJson(restaurant));
        } else {
            return badRequest("{\"error\": \"Restaurant doesn't exist!\"}");
        }
    }

    @Transactional
    public Result deleteRestaurant() {
        Form<Restaurant.FormRestaurantDto> inputForm = form(Restaurant.FormRestaurantDto.class).bindFromRequest();

        //Create object
        Restaurant restaurant = new Restaurant();
        restaurant = restaurant.findById(inputForm.get().id);

        restaurant.delete();

        return ok();
    }
}
