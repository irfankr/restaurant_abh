package controllers;

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
import java.util.ArrayList;
import java.util.List;

import static play.data.Form.*;
import static play.libs.Json.toJson;

public class RestaurantLocationController extends Controller {

    @Transactional
    public Result getFilteredLocations() {
        Form<RestaurantLocation.LocationsFilterDto> locationForm = form(RestaurantLocation.LocationsFilterDto.class).bindFromRequest();

        EntityManager em = JPA.em();
        CriteriaBuilder qb = em.getCriteriaBuilder();
        CriteriaQuery<RestaurantLocation> criteria = qb.createQuery(RestaurantLocation.class);
        Root<RestaurantLocation> query = criteria.from(RestaurantLocation.class);

        //Create conditions
        List<Predicate> predicates = new ArrayList<Predicate>();

            if(locationForm.get().searchText != null && locationForm.get().searchText != "") {
                //Search text
                predicates.add(qb.like(query.<String>get("name"), "%"+locationForm.get().searchText+"%"));
            }

        //Execute query
        criteria.select(query).where(predicates.toArray(new Predicate[]{}));
        criteria.orderBy(qb.asc(query.get("id")));

        //Get result from query
        long offsetCategories = (locationForm.get().pageNumber-1) * locationForm.get().itemsPerPage;
        int offsetCategoriesInt = (int) offsetCategories;
        int itemsPerPageInt = (int) locationForm.get().itemsPerPage;
        List<RestaurantLocation> locations = em.createQuery(criteria).setMaxResults(itemsPerPageInt).setFirstResult(offsetCategoriesInt).getResultList();

        //Create return class
        RestaurantLocation.LocationsDto returnLocations = new RestaurantLocation.LocationsDto();

        //Insert
        returnLocations.setLocations(locations);

        List<RestaurantLocation> locationsTemp = em.createQuery(criteria).getResultList();

        int locationsSize = (int) locationsTemp.size();
        int numberOfPages = (int) Math.ceil(locationsSize*1.00 / itemsPerPageInt*1.00);

        returnLocations.setNumberOfPages(numberOfPages);

        return ok(Json.toJson(returnLocations));
    }

    @Transactional
    public Result addLocation() {
        Form<RestaurantLocation.FormLocationsDto> locationForm = form(RestaurantLocation.FormLocationsDto.class).bindFromRequest();

        //Create object
        RestaurantLocation location = new RestaurantLocation();

        //Check is there category with this name already
        if(location.findByName(locationForm.get().name) == null){
            location.setName(locationForm.get().name);

            //Save to database
            location.save();

            return ok(Json.toJson(location));
        } else {
            return badRequest("{\"error\": \"Location already exist!\"}");
        }
    }

    @Transactional
    public Result editLocation() {
        Form<RestaurantLocation.FormLocationsDto> locationForm = form(RestaurantLocation.FormLocationsDto.class).bindFromRequest();

        //Create object
        RestaurantLocation location = new RestaurantLocation();
        location = location.findById(locationForm.get().id);

        if(location != null){
            //Update value
            location.setName(locationForm.get().name);

            //Save to database
            location.update();

            return ok(Json.toJson(location));
        } else {
            return badRequest("{\"error\": \"Location doesn't exist!\"}");
        }
    }

    @Transactional
    public Result deleteLocation() {
        Form<RestaurantLocation.FormLocationsDto> locationForm = form(RestaurantLocation.FormLocationsDto.class).bindFromRequest();

        //Create object
        RestaurantLocation location = new RestaurantLocation();
        location = location.findById(locationForm.get().id);

        location.delete();

        return ok();
    }

    @Transactional
    public Result getLocationDetails() {
        Form<RestaurantLocation.FormLocationsDto> locationForm = form(RestaurantLocation.FormLocationsDto.class).bindFromRequest();

        //Create object
        RestaurantLocation location = new RestaurantLocation();
        location = location.findById(locationForm.get().id);

        return ok(Json.toJson(location));
    }
}
