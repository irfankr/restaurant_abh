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
import java.util.List;

import static play.data.Form.*;

@Entity
@Table(name="restauranttables")
public class RestaurantTables {
    @Id @GeneratedValue long id;
    private long idRestaurant;
    private long sittingPlaces;

    public RestaurantTables() {}

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
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

    public void save() { JPA.em().persist(this); }

    public void update() { JPA.em().merge(this); }

    public void delete() {
        JPA.em().remove(this);
    }
}
