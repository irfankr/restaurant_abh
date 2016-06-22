package models;

import controllers.RestaurantController;
import play.*;
import play.data.DynamicForm;
import static play.data.Form.*;
import play.data.Form;
import play.mvc.*;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.*;

import models.RestaurantCategories;

import play.db.*;

//import javax.management.Query;
import javax.persistence.Query;


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

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import play.db.jpa.*;
import play.db.jpa.JPAApi;

import play.db.jpa.Transactional;
import play.db.jpa.JPA;

import java.io.IOException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;

import models.RestaurantTables;
import models.RestaurantMenuItem;

import java.util.concurrent.TimeUnit;

@Entity
@Table(name="restaurants")
public class Restaurant {
    @Id @GeneratedValue long id;
    private String restaurantName;
    private String description;
    private float latitude;
    private float longitude;
    private float mark;
    private long votes;
    private long priceRange;
    private String imageFileName;
    private long location;
    private String foodType;

    //@ElementCollection
    //@Column(name="comments")
    //private List<String> comments;


    public Restaurant() {}

    public long getId() {
        return id;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public float getMark() {
        return mark;
    }

    public void setMark(float mark) {
        this.mark = mark;
    }

    public long getVotes() {
        return votes;
    }

    public void setVotes(long votes) {
        this.votes = votes;
    }

    public long getPriceRange() {
        return priceRange;
    }

    public void setPriceRange(long priceRange) {
        this.priceRange = priceRange;
    }

    public String getImageFileName() {
        return imageFileName;
    }

    public void setImageFileName(String imageFileName) {
        this.imageFileName = imageFileName;
    }

    public long getLocation() {
        return location;
    }

    public void setLocation(long location) {
        this.location = location;
    }

    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    /*
    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }

    public void addComment(String comment){
        this.comments.add(comment);
    }
    */

    public void save() { JPA.em().persist(this); }

    public void update() { JPA.em().merge(this); }

    public void delete() {
        JPA.em().remove(this);
    }


    @Transactional
    public static Restaurant findById(long id){
        try {
            return JPA.em().find(Restaurant.class, id);
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }

    public static List<Restaurant> getAll() {
        return JPA.em().createQuery("SELECT u FROM Restaurant u ORDER BY id ASC", Restaurant.class).getResultList();
    }

    @Transactional
    public static List<Restaurant> getAllWithTextFilter(String text) {
        if(text != null) {
            text = "%" + text + "%";
            return JPA.em().createQuery("SELECT r FROM Restaurant r WHERE restaurantName LIKE ? OR description LIKE ? ORDER BY id ASC", Restaurant.class).setParameter(1, text).setParameter(2, text).getResultList();
        } else {
            return JPA.em().createQuery("SELECT r FROM Restaurant r ORDER BY id ASC", Restaurant.class).getResultList();
        }
    }

    @Transactional
    public static String getStringRestaurantCategories(long idRestaurant){

        //Execute SQL Query
        Query query = JPA.em().createNativeQuery("SELECT rc.name AS categoryName FROM restaurantcategories rc, restaurantstocategories rtc WHERE rc.id = rtc.idCategory AND rtc.idRestaurant = ?");
        query.setParameter(1, idRestaurant);
        List resultList = query.getResultList();

        Iterator resultListIterator = resultList.iterator();

        String finalCategoriesString = "";

        while (resultListIterator.hasNext()) {
            String categoryName = (String)resultListIterator.next();

            finalCategoriesString += categoryName;

            if (resultListIterator.hasNext()) {
                finalCategoriesString += " | ";
            }

        }

        return finalCategoriesString;
    }

    @Transactional
    public static List<Restaurant> getAllSortByTodayReservations() {
        List<Restaurant> restaurants = JPA.em().createNativeQuery("SELECT *, (SELECT COUNT(rs.id) FROM reservations rs, restauranttables rt WHERE date_part('day', rs.reservationDateTime) = date_part('day', NOW()) AND rs.idTable = rt.id AND restaurants.id = rt.idRestaurant GROUP BY rt.idRestaurant) AS sortingnumber FROM restaurants ORDER BY sortingnumber DESC nulls last LIMIT 6", Restaurant.class).getResultList();
        return restaurants;
    }

    @Transactional
    public static List<RestaurantMenuItem> getMenuItems(long idRestaurant, String type){
        try {
            TypedQuery<RestaurantMenuItem> query = JPA.em().createQuery("SELECT u FROM RestaurantMenuItem u WHERE idRestaurant = ? AND type = ?", RestaurantMenuItem.class);
            query.setParameter(1, idRestaurant);
            query.setParameter(2, type);

            //Get results from query
            List<RestaurantMenuItem> restaurantMenuItems = query.getResultList();

            return restaurantMenuItems;
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }

    @Transactional
    public static List<RestaurantTables> checkReservationAvailability(long persons, String reservationDateTime, long idRestaurant){
        try {
            //Query query = JPA.em().createNativeQuery("SELECT * FROM restauranttables rtt WHERE sittingPlaces >= ? AND (SELECT COUNT(rsv.id) FROM reservations rsv WHERE ((? > rsv.reservationDateTime AND ? < (rsv.reservationDateTime + INTERVAL '2 hour')) OR ((? + INTERVAL '2 hour') > rsv.reservationDateTime AND (? + INTERVAL '2 hour') < (rsv.reservationDateTime + INTERVAL '2 hour')))AND rsv.idtable = rtt.id) = 0 AND rtt.idRestaurant = ?");

            String reservationDateTime2HRS = "";

            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                Date parsed = format.parse(reservationDateTime);

                //Add two hours
                Date newDate = new Date(parsed.getTime() + TimeUnit.HOURS.toMillis(2));

                reservationDateTime2HRS = format.format(newDate);
            }
            catch(ParseException pe) {
                System.out.println("ERROR: Cannot parse date in Restaurant.checkReservationAvailability \"" + reservationDateTime + "\"");
            }

            System.out.println(reservationDateTime);
            System.out.println(reservationDateTime2HRS);


            Query query = JPA.em().createNativeQuery("SELECT * FROM restauranttables rtt WHERE sittingPlaces >= ? AND (SELECT COUNT(rsv.id) FROM reservations rsv WHERE ((to_timestamp(?, 'YYYY-MM-DD HH24:MI:SS') >= rsv.reservationDateTime AND to_timestamp(?, 'YYYY-MM-DD HH24:MI:SS') <= (rsv.reservationDateTime + INTERVAL '2 hour')) OR (to_timestamp(?, 'YYYY-MM-DD HH24:MI:SS') >= rsv.reservationDateTime AND to_timestamp(?, 'YYYY-MM-DD HH24:MI:SS') <= (rsv.reservationDateTime + INTERVAL '2 hour')))AND rsv.idtable = rtt.id) = 0 AND rtt.idRestaurant = ?");

            query.setParameter(1, persons);
            query.setParameter(2, reservationDateTime);
            query.setParameter(3, reservationDateTime);
            query.setParameter(4, reservationDateTime2HRS);
            query.setParameter(5, reservationDateTime2HRS);
            query.setParameter(6, idRestaurant);

            //Execute SQL Query

            List resultList = query.getResultList();
            Iterator resultListIterator = resultList.iterator();

            //Create restaurants tables list object
            List<RestaurantTables> restaurantsTables = new ArrayList();

            while (resultListIterator.hasNext()) {
                Object col[] = (Object[])resultListIterator.next();
                RestaurantTables restaurantTable = new RestaurantTables();
                //Set attribute values
                BigInteger temp1 = (BigInteger)col[0];
                restaurantTable.setId(temp1.longValue());

                BigInteger temp2 = (BigInteger)col[1];
                restaurantTable.setIdRestaurant(temp2.longValue());

                BigInteger temp3 = (BigInteger)col[2];
                restaurantTable.setSittingPlaces(temp3.longValue());

                restaurantsTables.add(restaurantTable);
            }

            //System.out.println(restaurantsTables);

            return restaurantsTables;
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }

    public static class PaginationNumberOfPagesDto {
        public long itemsPerPage;
    }

    public static class PaginationPagesDto {
        public long numberOfPages;

        public void setNumberOfPages(long numberOfPages) {
            this.numberOfPages = numberOfPages;
        }
    }

    public static class RestaurantsFilterDto {
        public long priceRange;
        public long mark;
        public List<Long> categories = new ArrayList<Long>();
        public String searchText;
        public long itemsPerPage;
        public long pageNumber;
        public String location;

        public long getPriceRange() {
            return priceRange;
        }

        public void setPriceRange(long priceRange) {
            this.priceRange = priceRange;
        }

        public long getMark() {
            return mark;
        }

        public void setMark(long mark) {
            this.mark = mark;
        }

        public List<Long> getCategories() {
            return categories;
        }

        public void setCategories(List<Long> categories) {
            this.categories = categories;
        }

        public String getSearchText() {
            return searchText;
        }

        public void setSearchText(String searchText) {
            this.searchText = searchText;
        }

        public long getItemsPerPage() {
            return itemsPerPage;
        }

        public void setItemsPerPage(long itemsPerPage) {
            this.itemsPerPage = itemsPerPage;
        }

        public long getPageNumber() {
            return pageNumber;
        }

        public void setPageNumber(long pageNumber) {
            this.pageNumber = pageNumber;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }
    }

    public static class RestaurantsDto {
        public List<Restaurant> restaurants = new ArrayList<Restaurant>();
        public long numberOfRestaurantPages;

        public List<Restaurant> getRestaurants() {
            return restaurants;
        }

        public void setRestaurants(List<Restaurant> restaurants) {
            this.restaurants = restaurants;
        }

        public long getNumberOfRestaurantPages() {
            return numberOfRestaurantPages;
        }

        public void setNumberOfRestaurantPages(long numberOfRestaurantPages) {
            this.numberOfRestaurantPages = numberOfRestaurantPages;
        }
    }

    public static class RestaurantDetailsDto {
        public long id;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }
    }

    public static class RestaurantMenuDto {
        public long idRestaurant;
        public String type;

        public long getIdRestaurant() {
            return idRestaurant;
        }

        public void setIdRestaurant(long idRestaurant) {
            this.idRestaurant = idRestaurant;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
    }

    public static class RestaurantVoteDto {
        public long id;
        public long mark;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public long getMark() {
            return mark;
        }

        public void setMark(long mark) {
            this.mark = mark;
        }
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

    public static class PaginationDto {
        public long pageNumber;
        public long itemsPerPage;

        public long getPageNumber() {
            return pageNumber;
        }

        public void setPageNumber(long pageNumber) {
            this.pageNumber = pageNumber;
        }

        public long getItemsPerPage() {
            return itemsPerPage;
        }

        public void setItemsPerPage(long itemsPerPage) {
            this.itemsPerPage = itemsPerPage;
        }
    }

    public static class ReservationDto {
        public long idRestaurant;
        public String persons;
        public String reservationDate;
        public String reservationHour;

        public long getIdRestaurant() {
            return idRestaurant;
        }

        public void setIdRestaurant(long idRestaurant) {
            this.idRestaurant = idRestaurant;
        }

        public String getPersons() {
            return persons;
        }

        public void setPersons(String persons) {
            this.persons = persons;
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

    public static class FormRestaurantDto {
        public long id;
        public String restaurantName;
        public String description;
        public float latitude;
        public float longitude;
        public float mark = 0;
        public long votes = 0;
        public long priceRange;
        public String imageFileName;
        public long location;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getRestaurantName() {
            return restaurantName;
        }

        public void setRestaurantName(String restaurantName) {
            this.restaurantName = restaurantName;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public float getLatitude() {
            return latitude;
        }

        public void setLatitude(float latitude) {
            this.latitude = latitude;
        }

        public float getLongitude() {
            return longitude;
        }

        public void setLongitude(float longitude) {
            this.longitude = longitude;
        }

        public float getMark() {
            return mark;
        }

        public void setMark(float mark) {
            this.mark = mark;
        }

        public long getVotes() {
            return votes;
        }

        public void setVotes(long votes) {
            this.votes = votes;
        }

        public long getPriceRange() {
            return priceRange;
        }

        public void setPriceRange(long priceRange) {
            this.priceRange = priceRange;
        }

        public String getImageFileName() {
            return imageFileName;
        }

        public void setImageFileName(String imageFileName) {
            this.imageFileName = imageFileName;
        }

        public long getLocation() {
            return location;
        }

        public void setLocation(long location) {
            this.location = location;
        }
    }

    public static class AdministrationCountersDto {
        public long restaurantsNumber;
        public long locationsNumber;
        public long usersNumber;

        public long getRestaurantsNumber() {
            return restaurantsNumber;
        }

        public void setRestaurantsNumber(long restaurantsNumber) {
            this.restaurantsNumber = restaurantsNumber;
        }

        public long getLocationsNumber() {
            return locationsNumber;
        }

        public void setLocationsNumber(long locationsNumber) {
            this.locationsNumber = locationsNumber;
        }

        public long getUsersNumber() {
            return usersNumber;
        }

        public void setUsersNumber(long usersNumber) {
            this.usersNumber = usersNumber;
        }
    }
}
