package controllers;

import play.*;
import play.data.DynamicForm;
import static play.data.Form.*;
import play.data.Form;
import play.mvc.*;

import models.Restaurant;

import models.*;

import play.mvc.BodyParser;
import play.libs.Json;
import play.libs.Json.*;
import static play.libs.Json.toJson;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.math.BigInteger;
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

    public static class RestaurantDetailsDto {
        public String id;
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
    //Logger.info("SESSION ID: " + session("idUser"));
}
