package models;

import play.*;
import play.db.*;
import play.db.jpa.*;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import play.mvc.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

import static play.data.Form.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="restauranttables")
public class RestaurantTables {
    @Id @GeneratedValue long id;
    private long sittingPlaces;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="idrestaurant")
    @JsonIgnore
    private Restaurant restauranttables;




    public RestaurantTables() {}

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public Restaurant getRestauranttables() {
        return restauranttables;
    }

    public void setRestauranttables(Restaurant restauranttables) {
        this.restauranttables = restauranttables;
    }

    public long getSittingPlaces() {
        return sittingPlaces;
    }

    public void setSittingPlaces(long sittingPlaces) {
        this.sittingPlaces = sittingPlaces;
    }

    public void save() { JPA.em().persist(this); }

    public void update() { JPA.em().merge(this); }

    public void delete() {
        JPA.em().remove(this);
    }

    @Transactional
    public static RestaurantTables findById(long id){
        try {
            return JPA.em().find(RestaurantTables.class, id);
        } catch(NoResultException noresult) { //If there is no
            return null;
        }
    }

    public static class RestaurantTableDto {
        public long id;
        public long idRestaurant;
        public long sittingPlaces;

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

        public long getSittingPlaces() {
            return sittingPlaces;
        }

        public void setSittingPlaces(long sittingPlaces) {
            this.sittingPlaces = sittingPlaces;
        }
    }

    public static class RestaurantTableAdministrationDto {
        public List<RestaurantTables> addQueue = new ArrayList<RestaurantTables>();
        public List<RestaurantTables> editQueue = new ArrayList<RestaurantTables>();
        public List<RestaurantTables> deleteQueue = new ArrayList<RestaurantTables>();
        public long idRestaurant;

        public List<RestaurantTables> getAddQueue() {
            return addQueue;
        }

        public void setAddQueue(List<RestaurantTables> addQueue) {
            this.addQueue = addQueue;
        }

        public List<RestaurantTables> getEditQueue() {
            return editQueue;
        }

        public void setEditQueue(List<RestaurantTables> editQueue) {
            this.editQueue = editQueue;
        }

        public List<RestaurantTables> getDeleteQueue() {
            return deleteQueue;
        }

        public void setDeleteQueue(List<RestaurantTables> deleteQueue) {
            this.deleteQueue = deleteQueue;
        }

        public long getIdRestaurant() {
            return idRestaurant;
        }

        public void setIdRestaurant(long idRestaurant) {
            this.idRestaurant = idRestaurant;
        }
    }
}
