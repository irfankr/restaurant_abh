package models;

import play.*;
import play.data.DynamicForm;
import static play.data.Form.*;
import play.data.Form;
import play.mvc.*;

import java.util.Date;
import java.util.*;

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

@Entity
@Table(name="restaurants")
public class Restaurant {
    @Column(name="id") @Id @GeneratedValue long id;
    @Column(name="restaurantName") private String restaurantName;
    @Column(name="description") private String description;
    @Column(name="latitude") private float latitude;
    @Column(name="longitude")  private float longitude;
    @Column(name="mark") private float mark;
    @Column(name="votes") private long votes;
    @Column(name="priceRange") private long priceRange;
    @Column(name="imageFileName") private String imageFileName;
    @Column(name="locationName") private String locationName;
    @Column(name="foodType") private String foodType;

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

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }



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

    @Transactional
    public static List<Restaurant> getAll() {
        List<Restaurant> restaurants = JPA.em().createNativeQuery("SELECT * FROM restaurants", Restaurant.class).getResultList();
        return restaurants;
    }


    @Transactional
    public static List<Restaurant> getAllSortByTodayReservations() {
        List<Restaurant> restaurants = JPA.em().createNativeQuery("SELECT *, (SELECT COUNT(rs.id) FROM reservations rs, restauranttables rt WHERE date_part('day', rs.reservationDateTime) = date_part('day', NOW()) AND rs.idTable = rt.id AND restaurants.id = rt.idRestaurant GROUP BY rt.idRestaurant) AS sortingnumber FROM restaurants ORDER BY sortingnumber DESC nulls last LIMIT 6", Restaurant.class).getResultList();
        return restaurants;
    }

    /*
    @Transactional
    public static RestaurantTables checkReservationAvailability(long persons, Date reservationDateTime, long idRestaurant){
        try {
            TypedQuery<RestaurantTables> query = JPA.em().createQuery("SELECT * FROM restauranttables rtt WHERE sittingPlaces >= ? AND (SELECT COUNT(rsv.id) FROM reservations rsv WHERE ((? > rsv.reservationDateTime AND ? < (rsv.reservationDateTime + INTERVAL '2 hour')) OR ((? + INTERVAL '2 hour') > rsv.reservationDateTime AND (? + INTERVAL '2 hour') < (rsv.reservationDateTime + INTERVAL '2 hour')))AND rsv.idtable = rtt.id) = 0 AND rtt.idRestaurant = ?", RestaurantTables.class);
            //TypedQuery<RestaurantTables> query = JPA.em().createQuery("SELECT * FROM restauranttables rtt WHERE sittingPlaces >= 4 AND (SELECT COUNT(rsv.id) FROM reservations rsv WHERE (('2016-05-27 16:00:00' > rsv.reservationDateTime AND '2016-05-27 16:00:00' < (rsv.reservationDateTime + INTERVAL '2 hour')) OR ('2016-05-27 18:00:00' > rsv.reservationDateTime AND '2016-05-27 18:00:00' < (rsv.reservationDateTime + INTERVAL '2 hour')))AND rsv.idtable = rtt.id) = 0 AND rtt.idRestaurant = 4", RestaurantTables.class);


            query.setParameter(1, persons);
            query.setParameter(2, reservationDateTime);
            query.setParameter(3, reservationDateTime);
            query.setParameter(4, reservationDateTime);
            query.setParameter(5, reservationDateTime);
            query.setParameter(6, idRestaurant);

            RestaurantTables table = query.getSingleResult();

            return table;
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }
    */
}
