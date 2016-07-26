package controllers;

import play.*;
import play.data.DynamicForm;
import static play.data.Form.*;
import play.data.Form;
import play.mvc.*;

import java.rmi.server.ExportException;
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

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Envelope;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.LineString;
import com.vividsolutions.jts.geom.LinearRing;
import com.vividsolutions.jts.geom.MultiLineString;
import com.vividsolutions.jts.geom.MultiPoint;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.geom.Polygon;

import play.Configuration;

public class RestaurantController extends Controller {

    @Transactional
    public Result getRestaurantDetails() {
        //Create restaurantForm

        Form<Restaurant.RestaurantDetailsDto> restaurantForm = form(Restaurant.RestaurantDetailsDto.class).bindFromRequest();
        Restaurant restaurant = new Restaurant();

        //Get restaurant
        restaurant = restaurant.findById(restaurantForm.get().id);
        System.out.println(restaurant.getLocation().getName());

        if(restaurant != null){
            Restaurant.FormRestaurantDto returnRestaurant = new Restaurant.FormRestaurantDto();

            returnRestaurant.setId(restaurant.getId());
            returnRestaurant.setImageFileName(restaurant.getImageFileName());
            returnRestaurant.setCoverFileName(restaurant.getCoverFileName());
            returnRestaurant.setDescription(restaurant.getDescription());
            returnRestaurant.setLatitude(restaurant.getLatitude());
            returnRestaurant.setLongitude(restaurant.getLongitude());
            returnRestaurant.setMark(restaurant.getMark());
            returnRestaurant.setLocation(restaurant.getLocation().getId());
            returnRestaurant.setPriceRange(restaurant.getPriceRange());
            returnRestaurant.setVotes(restaurant.getVotes());
            returnRestaurant.setRestaurantName(restaurant.getRestaurantName());
            returnRestaurant.setFoodType(Restaurant.getStringRestaurantCategories(restaurantForm.get().id));

            return ok(Json.toJson(returnRestaurant));
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

        //Get values from form
        Restaurant.RestaurantsFilterDto newRestaurantFilter = new Restaurant.RestaurantsFilterDto();
            newRestaurantFilter.setLongitude(restaurantForm.get().longitude);
            newRestaurantFilter.setLatitude(restaurantForm.get().latitude);
            newRestaurantFilter.setPriceRange(restaurantForm.get().priceRange);
            newRestaurantFilter.setSearchText(restaurantForm.get().searchText);
            newRestaurantFilter.setMark(restaurantForm.get().mark);
            newRestaurantFilter.setCategories(restaurantForm.get().categories);
            newRestaurantFilter.setLocation(restaurantForm.get().location);
            newRestaurantFilter.setPageNumber(restaurantForm.get().pageNumber);
            newRestaurantFilter.setItemsPerPage(restaurantForm.get().itemsPerPage);

        //Creare query
        Restaurant.FilterRestaurantsQueryBuilderDto newRestaurantsFilterQuery = FilterRestaurantsQueryBuilder(newRestaurantFilter);
            String filterSqlString = newRestaurantsFilterQuery.getSqlString();
            String filterSqlStringWithLimit = newRestaurantsFilterQuery.getSqlStringWithLimit();
            ArrayList<Object> filterParameters = newRestaurantsFilterQuery.getFilterParameters();


        //Create query
        Query query = JPA.em().createNativeQuery(filterSqlStringWithLimit, Restaurant.class);

        //Add parameters to query string
        for(int i=0; i < filterParameters.size(); i++){
            query.setParameter(i+1, filterParameters.get(i));
        }

        //Execute query
        System.out.println("---------------------------"); System.out.println(filterSqlString);
        List<Restaurant> paginatedRestaurants = query.getResultList();

        //Create return class
        Restaurant.RestaurantsDto returnRestaurants = new Restaurant.RestaurantsDto();


        //Insert restaurants
        returnRestaurants.setRestaurants(paginatedRestaurants);

        //Insert info about total restaurants number
        int restaurantsSize = totalFilteredRestaurantsNumber(filterSqlString, filterParameters);
        int numberOfRestaurantPages = (int) Math.ceil(restaurantsSize*1.00 / newRestaurantFilter.getItemsPerPage()*1.00);
        returnRestaurants.setNumberOfRestaurantPages(numberOfRestaurantPages);

        return ok(Json.toJson(returnRestaurants));
    }

    public int totalFilteredRestaurantsNumber(String sqlString, ArrayList<Object> filterParameters){
        //Create query
        Query query = JPA.em().createNativeQuery(sqlString, Restaurant.class);

        //Add parameters to query string
        for(int i=0; i < filterParameters.size(); i++){
            query.setParameter(i+1, filterParameters.get(i));
        }

        List<Restaurant> paginatedRestaurants = query.getResultList();

        return paginatedRestaurants.size();
    }

    public static Restaurant.FilterRestaurantsQueryBuilderDto FilterRestaurantsQueryBuilder(Restaurant.RestaurantsFilterDto newRestaurantFilter){

        double longitude = newRestaurantFilter.getLongitude();
        double latitude = newRestaurantFilter.getLatitude();

        System.out.println("FILTRIRANJE RESTORANA");
        System.out.println("Longitude: " + longitude);
        System.out.println("Latitude: " + latitude);

        //Test echo coordinates
        //System.out.println("Latitude: " + latitude);
        //System.out.println("Longitude: " + longitude);

        //SQL String
        //PRIVREMENO
        //String sqlString = "SELECT * FROM restaurants rest ";
        //int startingParametersCount = 0;

        //LOCIRANJE
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        String sqlString = "SELECT *, st_distance_sphere(st_makepoint(?, ?), st_makepoint(rest.latitude, rest.longitude)) AS distance FROM restaurants rest ";
        int startingParametersCount = 2;

        //List of parameters
        ArrayList<Object> filterParameters = new ArrayList();

        //Add location parameters
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        filterParameters.add(latitude);
        filterParameters.add(longitude);

        //Add filters
        //Price range
        if(newRestaurantFilter.getPriceRange() != 0){
            //Check is this first filter
            if(filterParameters.size() == startingParametersCount) sqlString += "WHERE "; else sqlString += "AND ";

            //Add string part
            sqlString += "rest.priceRange = ? ";

            //Add parameter to list
            filterParameters.add(newRestaurantFilter.getPriceRange());
        }

        //Search text
        if(newRestaurantFilter.getSearchText() != null && newRestaurantFilter.getSearchText() != "") {
            //Check is this first filter
            if(filterParameters.size() == startingParametersCount) sqlString += "WHERE "; else sqlString += "AND ";

            //Add string part
            sqlString += "UPPER(rest.restaurantName) LIKE ? ";

            //Add parameter to list
            filterParameters.add("%" + newRestaurantFilter.getSearchText().toUpperCase() + "%");
        }

        //Mark
        if(newRestaurantFilter.getMark() != 0) {
            //Check is this first filter
            if(filterParameters.size() == startingParametersCount) sqlString += "WHERE "; else sqlString += "AND ";

            //Add string part
            sqlString += "ROUND(rest.mark / rest.votes) >= ? ";

            //Add parameter to list
            filterParameters.add(newRestaurantFilter.getMark());
        }

        //Categories
        if(newRestaurantFilter.getCategories().size() > 0){
            //Check is this first filter
            if(filterParameters.size() == startingParametersCount) sqlString += "WHERE ("; else sqlString += "AND (";

            for(int i=0; i < newRestaurantFilter.getCategories().size(); i++){
                //Add string part
                sqlString += "? IN (SELECT restcateg.idcategory FROM restaurantstocategories restcateg WHERE restcateg.idrestaurant = rest.id) ";

                //If it's not last add OR for more
                if(i < newRestaurantFilter.getCategories().size()-1){
                    sqlString += "OR ";
                } else {
                    sqlString += ") ";
                }

                //Add parameter to list
                filterParameters.add(newRestaurantFilter.getCategories().get(i));
            }
        }

        //Location
        if(newRestaurantFilter.getLocation() != null) {
            //Check is this first filter
            if(filterParameters.size() == startingParametersCount) sqlString += "WHERE "; else sqlString += "AND ";

            //Add string part
            sqlString += "rest.location = ? ";

            //Add parameter to list
            filterParameters.add(RestaurantLocation.findByName(newRestaurantFilter.getLocation()).getId());
        }

        //Ordering
        //PRIVREMENO
        //sqlString += "ORDER BY rest.id ASC ";

        //Sort by distance
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        sqlString += "ORDER BY distance ASC ";

        //Get segment of display restaurants for pagination
        long offsetRestaurants = (newRestaurantFilter.getPageNumber()) * newRestaurantFilter.getItemsPerPage() - newRestaurantFilter.getItemsPerPage();
        int offsetRestaurantsInt = (int) offsetRestaurants;
        int itemsPerPageInt = (int) newRestaurantFilter.getItemsPerPage();

        //Create LIMIT part
        String sqlStringLimit = "LIMIT " + itemsPerPageInt + " OFFSET " + offsetRestaurantsInt;

        //Create return
        Restaurant.FilterRestaurantsQueryBuilderDto newRestaurantsFilterQuery = new Restaurant.FilterRestaurantsQueryBuilderDto();
            newRestaurantsFilterQuery.setSqlString(sqlString);
            newRestaurantsFilterQuery.setSqlStringWithLimit(sqlString + sqlStringLimit);
            newRestaurantsFilterQuery.setFilterParameters(filterParameters);

        return newRestaurantsFilterQuery;
    }

    @Transactional
    public Result getRestaurantsLocations() {

        //Execute SQL Query
        Query query = JPA.em().createNativeQuery("SELECT r.location AS location, COUNT(r.id) AS number FROM restaurants r GROUP BY r.location");
        List resultList = query.getResultList();
        Iterator resultListIterator = resultList.iterator();

        //Create restaurants locations list object
        List<Restaurant.RestaurantLocationDto> restaurantsLocations = new ArrayList();

        while (resultListIterator.hasNext()) {
            Object col[] = (Object[])resultListIterator.next();
            Restaurant.RestaurantLocationDto restaurantLocation = new Restaurant.RestaurantLocationDto();
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
            reservation.setReservationuser(User.findById(userId));

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
                //reservation.setIdTable(firstFreeTable.getId());
                reservation.setRestauranttables(RestaurantTables.findById(firstFreeTable.getId()));

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
    public Result getAllNearestRestaurants() {
        Form<Restaurant.FormRestaurantDto> inputForm = form(Restaurant.FormRestaurantDto.class).bindFromRequest();

        double latitude = inputForm.get().latitude;
        double longitude = inputForm.get().longitude;

        //Test echo coordinates

        System.out.println("NAJBLIZI RESTORANI");
        System.out.println("Longitude: " + longitude);
        System.out.println("Latitude: " + latitude);

        //SORTIRANJE NAJBLIZIH
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        List<Restaurant> restaurants = JPA.em().createNativeQuery("SELECT *, st_distance_sphere(st_makepoint(?, ?), st_makepoint(rst.latitude, rst.longitude)) AS distance FROM restaurants rst ORDER BY distance ASC nulls last LIMIT 6", Restaurant.class).setParameter(1, latitude).setParameter(2, longitude).getResultList();

        //PRIVREMENO
        //List<Restaurant> restaurants = JPA.em().createNativeQuery("SELECT *, (SELECT COUNT(rs.id) FROM reservations rs, restauranttables rt WHERE date_part('day', rs.reservationDateTime) = date_part('day', NOW()) AND rs.idTable = rt.id AND restaurants.id = rt.idRestaurant GROUP BY rt.idRestaurant) AS sortingnumber FROM restaurants ORDER BY sortingnumber DESC nulls last LIMIT 6", Restaurant.class).getResultList();

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
        comment.setRestaurantComments(Restaurant.findById(inputForm.get().idRestaurant));
        comment.setComment(inputForm.get().comment);
        comment.setUserComments(User.findById(inputForm.get().idUser));
        comment.setMark(inputForm.get().mark);

        //Current date
        Date date = new Date();
        comment.setInsertTime(date);


        //Modify restaurant details
        Restaurant restaurant = new Restaurant();
        long addMark;
        int addVotes;

        //Check is this user already voted
        if(RestaurantComment.findByUserAndRestaurant(User.findById(inputForm.get().idUser), Restaurant.findById(inputForm.get().idRestaurant)) == null){
            addMark = inputForm.get().mark;

            addVotes = 1;
        } else {
            //Get last vote and comment inserted
            RestaurantComment restaurantComment = RestaurantComment.findByUserAndRestaurant(User.findById(inputForm.get().idUser), Restaurant.findById(inputForm.get().idRestaurant));

            //Old mark
            long votedMark = restaurantComment.getMark();

            //New mark
            long newMark = inputForm.get().mark;

            addVotes = 0;

            //Generate mark to add to restaurant
            addMark = newMark - votedMark;
        }


        restaurant = restaurant.findById(inputForm.get().idRestaurant);

        restaurant.setMark(restaurant.getMark() + addMark);

        //Increase number of votings
        restaurant.setVotes(restaurant.getVotes() + addVotes);

        restaurant.update();

        //Save comment to database
        comment.save();

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
            user = user.findById(comments.get(i).getUserComments().getId());

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

    @Transactional
    public Result getAllRestaurantReservations() {
        Form<Reservation.ReservationDto> inputForm = form(Reservation.ReservationDto.class).bindFromRequest();

        //Create list of reservations
        //List<Reservation> reservations = JPA.em().createNativeQuery("SELECT * FROM reservations rsv, restauranttables rsttbl WHERE rsv.idtable = rsttbl.id AND rsttbl.idrestaurant = ? ORDER BY rsv.id DESC", Reservation.class).setParameter(1, inputForm.get().idRestaurant).getResultList();

        //Execute SQL Query
        Query query = JPA.em().createNativeQuery("SELECT rsv.id AS id, rsv.idtable AS idtable, rsv.persons AS persons, rsv.reservationDateTime AS reservationDateTime, usr.firstname AS firstname, usr.lastname AS lastname FROM reservations rsv, restauranttables rsttbl, users usr WHERE rsv.idtable = rsttbl.id AND rsttbl.idrestaurant = ? AND usr.id = rsv.iduser ORDER BY rsv.id DESC");
        query.setParameter(1, inputForm.get().idRestaurant);
        List resultList = query.getResultList();

        Iterator resultListIterator = resultList.iterator();

        //Create restaurants locations list object
        List<Reservation.RestaurantReservationsDto> restaurantReservations = new ArrayList();

        while (resultListIterator.hasNext()) {
            Object col[] = (Object[])resultListIterator.next();
            Reservation.RestaurantReservationsDto restaurantReservation = new Reservation.RestaurantReservationsDto();

            //Id
            BigInteger temp1 = (BigInteger)col[0];
            restaurantReservation.setId(temp1.longValue());

            //Id table
            BigInteger temp2 = (BigInteger)col[1];
            restaurantReservation.setIdTable(temp2.longValue());

            //Persons
            BigInteger temp3 = (BigInteger)col[2];
            restaurantReservation.setPersons(temp3.longValue());

            //Date and time
            Date reservationDateTime = (Date)col[3];
            SimpleDateFormat formatDateForEmber = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            restaurantReservation.setReservationDateTime(formatDateForEmber.format(reservationDateTime));

            //User first name and last name
            restaurantReservation.setUserName((String)col[4] + " " + (String)col[5]);

            //Expired
            Date now = new Date();

            if(now.compareTo(reservationDateTime) == 1) {
                restaurantReservation.setExpired(true);
            } else {
                restaurantReservation.setExpired(false);
            }


            restaurantReservations.add(restaurantReservation);
        }

        //Return JSON of all restaurants
        return ok(Json.toJson(restaurantReservations));
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
            predicates.add(qb.like(qb.upper(query.<String>get("restaurantName")), "%"+inputForm.get().searchText.toUpperCase()+"%"));
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
        //restaurant.setLocation(inputForm.get().location);
        restaurant.setLocation(RestaurantLocation.findById(inputForm.get().location));
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
            restaurant.setLocation(RestaurantLocation.findById(inputForm.get().location));
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

            List<RestaurantCategories.FormCategoriesDto> categoriesWithNames = new ArrayList<RestaurantCategories.FormCategoriesDto>();

            for(int i=0; i<categories.size(); i++){
                RestaurantCategories.FormCategoriesDto tempCategoryWithName = new RestaurantCategories.FormCategoriesDto();
                tempCategoryWithName.setId(categories.get(i).getCategory().getId());
                tempCategoryWithName.setName(categories.get(i).getCategory().getName());

                categoriesWithNames.add(tempCategoryWithName);
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

        AWSCredentials awsCredentials = new BasicAWSCredentials(Configuration.root().getString("awsAccessKeyId"), Configuration.root().getString("awsSecretAccessKey"));
        AmazonS3 s3Client = new AmazonS3Client(awsCredentials);
        s3Client.createBucket(Configuration.root().getString("s3BucketName"));
        s3Client.putObject(Configuration.root().getString("s3BucketName"), s3Key, file);
        s3Client.setObjectAcl(Configuration.root().getString("s3BucketName"), s3Key, CannedAccessControlList.PublicRead);

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

        AWSCredentials awsCredentials = new BasicAWSCredentials(Configuration.root().getString("awsAccessKeyId"), Configuration.root().getString("awsSecretAccessKey"));
        AmazonS3 s3Client = new AmazonS3Client(awsCredentials);
        s3Client.createBucket(Configuration.root().getString("s3BucketName"));
        s3Client.putObject(Configuration.root().getString("s3BucketName"), s3Key, file);
        s3Client.setObjectAcl(Configuration.root().getString("s3BucketName"), s3Key, CannedAccessControlList.PublicRead);

        //Da uploadamo u subfolder
        //s3Client.putObject("atlantpraksa", "gallery/" + s3Key, file);
        //s3Client.setObjectAcl("atlantpraksa", "gallery/" + s3Key, CannedAccessControlList.PublicRead);

        return ok(Json.toJson("https://s3.amazonaws.com/atlantpraksa/" + s3Key));
    }

}
