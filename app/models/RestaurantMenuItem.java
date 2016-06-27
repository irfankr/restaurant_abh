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

import static play.data.Form.*;

@Entity
@Table(name="restaurantmenuitem")
public class RestaurantMenuItem {
    @Id @GeneratedValue long id;
    private long idRestaurant;
    private String type;
    private String name;
    private float price;
    private String description;

    public RestaurantMenuItem() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void save() { JPA.em().persist(this); }

    public void update() { JPA.em().merge(this); }

    public void delete() {
        JPA.em().remove(this);
    }

    @Transactional
    public static RestaurantMenuItem findById(long id){
        try {
            return JPA.em().find(RestaurantMenuItem.class, id);
        } catch(NoResultException noresult) { //If there is no
            return null;
        }
    }

    public static class RestaurantMenuItemDto {
        public long id;
        public long idRestaurant;
        public String type;
        public String name;
        public float price;
        public String description;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

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

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public float getPrice() {
            return price;
        }

        public void setPrice(float price) {
            this.price = price;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    public static class RestaurantMenuAdministrationDto {
        public List<RestaurantMenuItem> addQueue = new ArrayList<RestaurantMenuItem>();
        public List<RestaurantMenuItem> editQueue = new ArrayList<RestaurantMenuItem>();
        public List<RestaurantMenuItem> deleteQueue = new ArrayList<RestaurantMenuItem>();

        public List<RestaurantMenuItem> getAddQueue() {
            return addQueue;
        }

        public void setAddQueue(List<RestaurantMenuItem> addQueue) {
            this.addQueue = addQueue;
        }

        public List<RestaurantMenuItem> getEditQueue() {
            return editQueue;
        }

        public void setEditQueue(List<RestaurantMenuItem> editQueue) {
            this.editQueue = editQueue;
        }

        public List<RestaurantMenuItem> getDeleteQueue() {
            return deleteQueue;
        }

        public void setDeleteQueue(List<RestaurantMenuItem> deleteQueue) {
            this.deleteQueue = deleteQueue;
        }
    }
}
