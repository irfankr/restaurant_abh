package models;

import play.*;
import play.db.*;
import play.db.jpa.*;
import play.db.jpa.JPA;
import play.mvc.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

import java.util.ArrayList;
import java.util.List;

import static play.data.Form.*;

@Entity
@Table(name="restaurantstocategories")
public class RestaurantsToCategories {
    @Id @GeneratedValue long id;
    private long idRestaurant;
    private long idCategory;

    public RestaurantsToCategories() {}

    @Transactional
    public static List<Long> getRestaurantCategories(long idRestaurant){
        try {
            TypedQuery<RestaurantsToCategories> query = JPA.em().createQuery("SELECT u FROM RestaurantsToCategories u WHERE idRestaurant = ?", RestaurantsToCategories.class);
            query.setParameter(1, idRestaurant);
            List<RestaurantsToCategories> categories = query.getResultList();

            List<Long> idCategories = new ArrayList();
            for (int i = 0; i < categories.size(); i++) {
                idCategories.add(categories.get(i).getIdCategory());
            }

            return idCategories;
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(long idCategory) {
        this.idCategory = idCategory;
    }

    public long getIdRestaurant() {
        return idRestaurant;
    }

    public void setIdRestaurant(long idRestaurant) {
        this.idRestaurant = idRestaurant;
    }
}
