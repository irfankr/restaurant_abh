package models;

import play.*;
import play.db.*;
import play.db.jpa.*;
import play.db.jpa.JPA;
import play.mvc.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static play.data.Form.*;

@Entity
@Table(name="restaurantlocations")
public class RestaurantLocation {
    @Id @GeneratedValue long id;
    private String name;

    public RestaurantLocation() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void save() { JPA.em().persist(this); }

    public void update() { JPA.em().merge(this); }

    public void delete() {
        JPA.em().remove(this);
    }

    public static List<RestaurantLocation> getAll() {
        return JPA.em().createQuery("SELECT u FROM RestaurantLocation u ORDER BY id ASC", RestaurantLocation.class).getResultList();
    }

    @Transactional
    public static RestaurantLocation findById(long id){
        try {
            return JPA.em().find(RestaurantLocation.class, id);
        } catch(NoResultException noresult) { //If there is no
            return null;
        }
    }

    @Transactional
    public static RestaurantLocation findByName(String name){
        try {
            TypedQuery<RestaurantLocation> query = JPA.em().createQuery("SELECT u FROM RestaurantLocation u WHERE name = ?", RestaurantLocation.class);
            query.setParameter(1, name);
            RestaurantLocation location = query.getSingleResult();

            return location;
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }

    public static class LocationsFilterDto {
        public String searchText;
        public long itemsPerPage;
        public long pageNumber;

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
    }

    public static class LocationsDto {
        public List<RestaurantLocation> locations = new ArrayList<RestaurantLocation>();
        public long numberOfPages;

        public List<RestaurantLocation> getLocations() {
            return locations;
        }

        public void setLocations(List<RestaurantLocation> locations) {
            this.locations = locations;
        }

        public long getNumberOfPages() {
            return numberOfPages;
        }

        public void setNumberOfPages(long numberOfPages) {
            this.numberOfPages = numberOfPages;
        }
    }

    public static class FormLocationsDto {
        public long id;
        public String locationName;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getLocationName() {
            return locationName;
        }

        public void setLocationName(String locationName) {
            this.locationName = locationName;
        }
    }
}
