package controllers;

import models.Restaurant;
import models.RestaurantCategories;

import models.RestaurantLocation;
import play.*;
import play.data.Form;
import play.db.*;
import play.db.jpa.*;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.libs.Json.*;
import play.mvc.*;

import javax.persistence.*;
import javax.persistence.criteria.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import static play.data.Form.*;
import static play.libs.Json.toJson;

import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;

public class RestaurantCategoriesController extends Controller {

    @Transactional
    public Result getAllCategories() {
        //Declare list
        List<RestaurantCategories> restaurants = new ArrayList<RestaurantCategories>();
        RestaurantCategories restaurantCategory = new RestaurantCategories();

        //Return JSON of all restaurants
        return ok(Json.toJson(restaurantCategory.getAll()));
    }

    @Transactional
    public Result getFilteredCategories() {
        Form<RestaurantCategories.CategoriesFilterDto> categoryForm = form(RestaurantCategories.CategoriesFilterDto.class).bindFromRequest();

        EntityManager em = JPA.em();
        CriteriaBuilder qb = em.getCriteriaBuilder();
        CriteriaQuery<RestaurantCategories> criteria = qb.createQuery(RestaurantCategories.class);
        Root<RestaurantCategories> query = criteria.from(RestaurantCategories.class);

        //Create conditions
        List<Predicate> predicates = new ArrayList<Predicate>();

            if(categoryForm.get().searchText != null && categoryForm.get().searchText != "") {
                //Search text
                predicates.add(qb.like(query.<String>get("name"), "%"+categoryForm.get().searchText+"%"));
            }

        //Execute query
        criteria.select(query).where(predicates.toArray(new Predicate[]{}));
        criteria.orderBy(qb.asc(query.get("id")));

        //Get result from query
        long offsetCategories = (categoryForm.get().pageNumber-1) * categoryForm.get().itemsPerPage;
        int offsetCategoriesInt = (int) offsetCategories;
        int itemsPerPageInt = (int) categoryForm.get().itemsPerPage;
        List<RestaurantCategories> categories = em.createQuery(criteria).setMaxResults(itemsPerPageInt).setFirstResult(offsetCategoriesInt).getResultList();

        //Create return class
        RestaurantCategories.CategoriesDto returnCategories = new RestaurantCategories.CategoriesDto();

        //Insert restaurants
        returnCategories.setCategories(categories);

        //Insert number of restaurants page
        List<RestaurantCategories> categoriesTemp = em.createQuery(criteria).getResultList();

        int categoriesSize = (int) categoriesTemp.size();
        int numberOfCategoriesPages = (int) Math.ceil(categoriesSize*1.00 / itemsPerPageInt*1.00);

        returnCategories.setNumberOfPages(numberOfCategoriesPages);

        return ok(Json.toJson(returnCategories));
    }

    @Transactional
    public Result addCategory() {
        Form<RestaurantCategories.FormCategoriesDto> categoryForm = form(RestaurantCategories.FormCategoriesDto.class).bindFromRequest();

        //Create category object
        RestaurantCategories category = new RestaurantCategories();

        //Check is there category with this name already
        if(category.findByName(categoryForm.get().name) == null){
            category.setName(categoryForm.get().name);

            //Save to database
            category.save();

            return ok(Json.toJson(category));
        } else {
            return badRequest("{\"error\": \"Category already exist!\"}");
        }
    }

    @Transactional
    public Result editCategory() {
        Form<RestaurantCategories.FormCategoriesDto> categoryForm = form(RestaurantCategories.FormCategoriesDto.class).bindFromRequest();

        //Create category object
        RestaurantCategories category = new RestaurantCategories();

        category = category.findById(categoryForm.get().id);

        if(category != null){
            //Update value
            category.setName(categoryForm.get().name);

            //Save to database
            category.update();

            return ok(Json.toJson(category));
        } else {
            return badRequest("{\"error\": \"Category doesn't exist!\"}");
        }
    }

    @Transactional
    public Result deleteCategory() {
        Form<RestaurantCategories.FormCategoriesDto> categoryForm = form(RestaurantCategories.FormCategoriesDto.class).bindFromRequest();

        //Create category object
        RestaurantCategories category = new RestaurantCategories();
        category = category.findById(categoryForm.get().id);

        category.delete();

        return ok();
    }

    @Transactional
    public Result getCategoryDetails() {
        Form<RestaurantCategories.FormCategoriesDto> categoryForm = form(RestaurantCategories.FormCategoriesDto.class).bindFromRequest();

        //Create object
        RestaurantCategories category = new RestaurantCategories();
        category = category.findById(categoryForm.get().id);

        return ok(Json.toJson(category));
    }
}
