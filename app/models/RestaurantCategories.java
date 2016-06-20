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
@Table(name="restaurantcategories")
public class RestaurantCategories {
    @Id @GeneratedValue long id;
    private String name;

    public RestaurantCategories() {}

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

    public static List<RestaurantCategories> getAll() {
        return JPA.em().createQuery("SELECT u FROM RestaurantCategories u ORDER BY id ASC", RestaurantCategories.class).getResultList();
    }

    @Transactional
    public static RestaurantCategories findById(long id){
        try {
            return JPA.em().find(RestaurantCategories.class, id);
        } catch(NoResultException noresult) { //If there is no
            return null;
        }
    }

    @Transactional
    public static RestaurantCategories findByName(String name){
        try {
            TypedQuery<RestaurantCategories> query = JPA.em().createQuery("SELECT u FROM RestaurantCategories u WHERE name = ?", RestaurantCategories.class);
            query.setParameter(1, name);
            RestaurantCategories category = query.getSingleResult();

            return category;
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }

    public static class CategoriesFilterDto {
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

    public static class CategoriesDto {
        public List<RestaurantCategories> categories = new ArrayList<RestaurantCategories>();
        public long numberOfPages;

        public List<RestaurantCategories> getCategories() {
            return categories;
        }

        public void setCategories(List<RestaurantCategories> categories) {
            this.categories = categories;
        }

        public long getNumberOfPages() {
            return numberOfPages;
        }

        public void setNumberOfPages(long numberOfPages) {
            this.numberOfPages = numberOfPages;
        }
    }

    public static class FormCategoriesDto {
        public long id;
        public String categoryName;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getCategoryName() {
            return categoryName;
        }

        public void setCategoryName(String categoryName) {
            this.categoryName = categoryName;
        }
    }
}
