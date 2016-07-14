package controllers;

import play.*;
import play.data.DynamicForm;
import static play.data.Form.*;
import play.data.Form;
import play.mvc.*;
import java.util.Arrays;

import models.Restaurant;
import models.Reservation;
import models.RestaurantMenuItem;
import models.User;
import models.RestaurantComment;

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

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.UUID;

import java.util.Collections;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;


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
            //Price range
            if(restaurantForm.get().priceRange != 0){
                predicates.add(qb.lessThanOrEqualTo(query.get("priceRange"), restaurantForm.get().priceRange));
            }

            //Mark
            if(restaurantForm.get().mark != 0) {
                //First restrict items with no votes
                predicates.add(qb.greaterThan(query.get("votes"), 0));

                Expression<Integer> mark = query.get("mark");
                Expression<Integer> votes = query.get("votes");
                Expression<Number> quot1 = qb.quot(mark, votes);
                Expression<Long> roundExpression = qb.function("round", Long.class, quot1);

                predicates.add(qb.lessThanOrEqualTo(roundExpression, restaurantForm.get().mark));
            }

            //Search text
            if(restaurantForm.get().searchText != null && restaurantForm.get().searchText != "") {
                predicates.add(qb.like(query.<String>get("restaurantName"), "%"+restaurantForm.get().searchText+"%"));
            }

            //Location
            if(restaurantForm.get().location != null) {
                RestaurantLocation location = new RestaurantLocation();

                location = location.findByName(restaurantForm.get().location);
                System.out.println("//////////////////////////////" + location.getId());

                predicates.add(qb.equal(query.get("location"), location.getId()));
            }

        //Execute query
        criteria.select(query).where(predicates.toArray(new Predicate[]{}));
        criteria.orderBy(qb.asc(query.get("id")));

        //Get result from queryCriteriaQuery.
        List<Restaurant> restaurants = em.createQuery(criteria).getResultList();

        List<Restaurant> foodTypeFiltereRestaurants = new ArrayList<Restaurant>();

        //Insert categories string in restaurant
        for (int i = 0; i < restaurants.size(); i++) {

            //Check if restaurant filter is active
            if(restaurantForm.get().categories.size() > 0){

                //Get all categories for restaurant
                RestaurantsToCategories restaurantToCategory = new RestaurantsToCategories();
                List<Long> restaurantCategories = restaurantToCategory.getRestaurantCategoriesIds(restaurants.get(i).getId());

                //Check is restaurant in any of selected categories for filter
                if(!Collections.disjoint(restaurantForm.get().categories, restaurantCategories)){
                    //Create final food type string
                    restaurants.get(i).setFoodType(Restaurant.getStringRestaurantCategories(Long.valueOf(restaurants.get(i).getId())));

                    //Add new restaurants element
                    foodTypeFiltereRestaurants.add(restaurants.get(i));
                }


            }
        }

        //Check is there food type filtered restaurants
        if(foodTypeFiltereRestaurants.size() > 0){
            restaurants = new ArrayList<Restaurant>(foodTypeFiltereRestaurants);
        } else {
            for (int i = 0; i < restaurants.size(); i++) {
                restaurants.get(i).setFoodType(Restaurant.getStringRestaurantCategories(Long.valueOf(restaurants.get(i).getId())));
            }
        }

        //Get segment of display restaurants for pagination
        long offsetRestaurants = (restaurantForm.get().pageNumber) * restaurantForm.get().itemsPerPage - restaurantForm.get().itemsPerPage;
        int offsetRestaurantsInt = (int) offsetRestaurants;
        int itemsPerPageInt = (int) restaurantForm.get().itemsPerPage;
        int endIndex = offsetRestaurantsInt + itemsPerPageInt;
        //Check is end of subpart of array lower than offset end index
        if(endIndex > restaurants.size()) endIndex = restaurants.size();

        //Get final array of restaurants (part of restaurants for pagination)
        List<Restaurant> paginatedRestaurants = restaurants.subList(offsetRestaurantsInt, endIndex);

        //Create return class
        Restaurant.RestaurantsDto returnRestaurants = new Restaurant.RestaurantsDto();

        //Insert restaurants
        returnRestaurants.setRestaurants(paginatedRestaurants);

        //Insert info about total restaurants number
        int restaurantsSize = restaurants.size();
        int numberOfRestaurantPages = (int) Math.ceil(restaurantsSize*1.00 / itemsPerPageInt*1.00);
        returnRestaurants.setNumberOfRestaurantPages(numberOfRestaurantPages);

        return ok(Json.toJson(returnRestaurants));
    }

    @Transactional
    public Result getRestaurantsLocations() {

        //Execute SQL Query
        Query query = JPA.em().createNativeQuery("SELECT r.location AS location, COUNT(r.id) AS number FROM restaurants r GROUP BY r.location");
        List resultList = query.getResultList();
        Iterator resultListIterator = resultList.iterator();

        //Create restaurants locations list object
        List<Restaurant.RestaurantLocation> restaurantsLocations = new ArrayList();

        while (resultListIterator.hasNext()) {
            Object col[] = (Object[])resultListIterator.next();
            Restaurant.RestaurantLocation restaurantLocation = new Restaurant.RestaurantLocation();
            //Set attribute values
            RestaurantLocation location = new RestaurantLocation();

            BigInteger temp1 = (BigInteger)col[0];
            location = location.findById(temp1.longValue());
            restaurantLocation.setLocation(location.getName());


            BigInteger temp2 = (BigInteger)col[1];
            restaurantLocation.setNumber(temp2.longValue());

            restaurantLocation.setId(temp1.longValue());

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

        //Insert categories string in restaurant
        for (int i = 0; i < restaurants.size(); i++) {
            restaurants.get(i).setFoodType(Restaurant.getStringRestaurantCategories(Long.valueOf(restaurants.get(i).getId())));
        }

        //Return JSON of all restaurants
        return ok(Json.toJson(restaurants));
    }

    @Transactional
    public Result insertComment(){
        Form<RestaurantComment.InputCommentDto> inputForm = form(RestaurantComment.InputCommentDto.class).bindFromRequest();

        //Create object
        RestaurantComment comment = new RestaurantComment();

        //Set values
        comment.setIdRestaurant(inputForm.get().idRestaurant);
        comment.setComment(inputForm.get().comment);
        comment.setIdUser(inputForm.get().idUser);
        comment.setMark(inputForm.get().mark);

        //Current date
        Date date = new Date();
        comment.setInsertTime(date);

        //Save comment to database
        comment.save();

        //Modify restaurant details
        Restaurant restaurant = new Restaurant();
        restaurant = restaurant.findById(inputForm.get().idRestaurant);
        restaurant.setVotes(restaurant.getVotes() + 1);
        restaurant.setMark(restaurant.getMark() + inputForm.get().mark);
        restaurant.update();

        return ok(Json.toJson(comment));
    }

    @Transactional
    public Result getAllRestaurantComments() {
        Form<RestaurantComment.InputCommentDto> inputForm = form(RestaurantComment.InputCommentDto.class).bindFromRequest();

        //Create list of comments
        List<RestaurantComment> comments = new ArrayList();

        //Read from database
        comments = JPA.em().createQuery("SELECT rc FROM RestaurantComment rc WHERE idRestaurant = ? ORDER BY id DESC", RestaurantComment.class).setParameter(1, inputForm.get().idRestaurant).getResultList();

        List<RestaurantComment.OutputCommentsDto> outputComments = new ArrayList();

        for(int i=0; i<comments.size(); i++){
            //Create new comment
            RestaurantComment.OutputCommentsDto outputComment = new RestaurantComment.OutputCommentsDto();

            //Read user details
            User user = new User();
            user = user.findById(comments.get(i).getIdUser());

            //Convert timestamp to date string
            SimpleDateFormat formatToCheckFunction = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String commentDateTime = formatToCheckFunction.format(comments.get(i).getInsertTime());

            //Set values
            outputComment.setName(user.getFirstName() + " " + user.getLastName());
            outputComment.setInsertTime(commentDateTime);
            outputComment.setMark(comments.get(i).getMark());
            outputComment.setComment(comments.get(i).getComment());

            outputComments.add(outputComment);
        }

        //Return JSON of all restaurants
        return ok(Json.toJson(outputComments));
    }

    /* Admin */
    @Transactional
    public Result getAdministrationCounters() {
        //Create return object
        Restaurant.AdministrationCountersDto counters = new Restaurant.AdministrationCountersDto();

        //Count restaurants
        Query query1 = JPA.em().createNativeQuery("SELECT COUNT(id) AS number FROM restaurants");
        Object queryNumber1 = (Object) query1.getSingleResult();
        BigInteger temp1 = (BigInteger)queryNumber1;
        counters.setRestaurantsNumber(temp1.longValue());

        //Count locations
        Query query2 = JPA.em().createNativeQuery("SELECT COUNT(id) AS number FROM restaurantlocations");
        Object queryNumber2 = (Object) query2.getSingleResult();
        BigInteger temp2 = (BigInteger)queryNumber2;
        counters.setLocationsNumber(temp2.longValue());

        //Count users
        Query query3 = JPA.em().createNativeQuery("SELECT COUNT(id) AS number FROM users");
        Object queryNumber3 = (Object) query3.getSingleResult();
        BigInteger temp3 = (BigInteger)queryNumber3;
        counters.setUsersNumber(temp3.longValue());

        //Return JSON of all restaurants
        return ok(Json.toJson(counters));
    }

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
        System.out.println(inputForm);

        //Create object
        Restaurant restaurant = new Restaurant();

        //Insert values
        restaurant.setRestaurantName(inputForm.get().restaurantName);
        restaurant.setDescription(inputForm.get().description);
        restaurant.setImageFileName(inputForm.get().imageFileName);
        restaurant.setCoverFileName(inputForm.get().coverFileName);
        restaurant.setLatitude(inputForm.get().latitude);
        restaurant.setLongitude(inputForm.get().longitude);
        restaurant.setLocation(inputForm.get().location);
        restaurant.setPriceRange(inputForm.get().priceRange);
        restaurant.setFoodType("-");

        //Save to database
        long idCreatedRestaurant = restaurant.save();

        //Set restaurants categories
        RestaurantsToCategories.addUpdateRestaurantCategories(inputForm.get().categories, idCreatedRestaurant);

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
            restaurant.setCoverFileName(inputForm.get().coverFileName);
            restaurant.setLatitude(inputForm.get().latitude);
            restaurant.setLongitude(inputForm.get().longitude);
            restaurant.setLocation(inputForm.get().location);
            restaurant.setPriceRange(inputForm.get().priceRange);
            restaurant.setFoodType("NO");

            //Save to database
            restaurant.update();

            //Set restaurants categories
            RestaurantsToCategories.addUpdateRestaurantCategories(inputForm.get().categories, inputForm.get().id);

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

    @Transactional
    public Result getRestaurantCategories(){
        Form<Restaurant.FormRestaurantDto> inputForm = form(Restaurant.FormRestaurantDto.class).bindFromRequest();

        try {
            TypedQuery<RestaurantsToCategories> query = JPA.em().createQuery("SELECT u FROM RestaurantsToCategories u WHERE idRestaurant = ?", RestaurantsToCategories.class);
            query.setParameter(1, inputForm.get().id);
            List<RestaurantsToCategories> categories = query.getResultList();

            List<RestaurantCategories> categoriesWithNames = new ArrayList<RestaurantCategories>();

            for(int i=0; i<categories.size(); i++){
                RestaurantCategories tempCategory = new RestaurantCategories();

                categoriesWithNames.add(tempCategory.findById(categories.get(i).getIdCategory()));
            }

            return ok(Json.toJson(categoriesWithNames));
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }

    @Transactional
    public Result uploadRestaurantLogo(){
        MultipartFormData<File> body = request().body().asMultipartFormData();
        FilePart<File> picture = body.getFile("file");
        File file = picture.getFile();
        String fileName = picture.getFilename();
        String fileExtension = fileName.split("\\.")[1];

        //Generates random filename
        String s3Key = UUID.randomUUID().toString() + "." + fileExtension;

        AWSCredentials awsCredentials = new BasicAWSCredentials("AKIAJPIRN6STW7CXUEUA", "AA3zP/kR3FxpAmzGQhFXMhdbpl0pPdAESM+xWnnv");
        AmazonS3 s3Client = new AmazonS3Client(awsCredentials);
        s3Client.createBucket("atlantpraksa");
        s3Client.putObject("atlantpraksa", s3Key, file);
        s3Client.setObjectAcl("atlantpraksa", s3Key, CannedAccessControlList.PublicRead);

        return ok(Json.toJson("https://s3.amazonaws.com/atlantpraksa/" + s3Key));
    }

    @Transactional
    public Result uploadRestaurantCover(){
        MultipartFormData<File> body = request().body().asMultipartFormData();
        FilePart<File> picture = body.getFile("file");
        File file = picture.getFile();
        String fileName = picture.getFilename();
        String fileExtension = fileName.split("\\.")[1];

        //Generates random filename
        String s3Key = UUID.randomUUID().toString() + "." + fileExtension;

        AWSCredentials awsCredentials = new BasicAWSCredentials("AKIAJPIRN6STW7CXUEUA", "AA3zP/kR3FxpAmzGQhFXMhdbpl0pPdAESM+xWnnv");
        AmazonS3 s3Client = new AmazonS3Client(awsCredentials);
        s3Client.createBucket("atlantpraksa");
        s3Client.putObject("atlantpraksa", s3Key, file);
        s3Client.setObjectAcl("atlantpraksa", s3Key, CannedAccessControlList.PublicRead);

        //Da uploadamo u subfolder
        //s3Client.putObject("atlantpraksa", "gallery/" + s3Key, file);
        //s3Client.setObjectAcl("atlantpraksa", "gallery/" + s3Key, CannedAccessControlList.PublicRead);

        return ok(Json.toJson("https://s3.amazonaws.com/atlantpraksa/" + s3Key));
    }

}
