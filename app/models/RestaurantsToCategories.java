package models;

import play.*;
import play.db.*;
import play.db.jpa.*;
import play.db.jpa.JPA;
import play.mvc.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

import static play.data.Form.*;

@Entity
@Table(name="restaurantstocategories")
public class RestaurantsToCategories {
    @Id @GeneratedValue long id;
    private long idRestaurant;
    private long idCategory;

    public RestaurantsToCategories() {}

}
