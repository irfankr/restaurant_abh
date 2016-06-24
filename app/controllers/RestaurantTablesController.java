package controllers;

import models.RestaurantCategories;
import models.RestaurantComment;
import models.Restaurant;
import models.RestaurantTables;

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

public class RestaurantTablesController extends Controller {

    @Transactional
    public Result getAllRestaurantTables() {
        Form<RestaurantTables.RestaurantTableDto> inputForm = form(RestaurantTables.RestaurantTableDto.class).bindFromRequest();

        //Create list of tables
        List<RestaurantTables> tables = new ArrayList();

        //Read from database
        tables = JPA.em().createQuery("SELECT rc FROM RestaurantTables rc WHERE idRestaurant = ? ORDER BY id DESC", RestaurantTables.class).setParameter(1, inputForm.get().id).getResultList();

        //Return JSON of all restaurants
        return ok(Json.toJson(tables));
    }

    @Transactional
    public Result addTable() {
        Form<RestaurantTables.RestaurantTableDto> inputForm = form(RestaurantTables.RestaurantTableDto.class).bindFromRequest();

        //Create table object
        RestaurantTables table = new RestaurantTables();

        table.setSittingPlaces(inputForm.get().sittingPlaces);
        table.setIdRestaurant(inputForm.get().idRestaurant);

        //Save to database
        table.save();

        return ok(Json.toJson(table));
    }

    @Transactional
    public Result editTable() {
        Form<RestaurantTables.RestaurantTableDto> inputForm = form(RestaurantTables.RestaurantTableDto.class).bindFromRequest();

        //Create table object
        RestaurantTables table = new RestaurantTables();
        table = table.findById(inputForm.get().id);

        if(table != null){
            //Update value
            table.setSittingPlaces(inputForm.get().sittingPlaces);

            //Save to database
            table.update();

            return ok(Json.toJson(table));
        } else {
            return badRequest("{\"error\": \"Table doesn't exist!\"}");
        }
    }

    @Transactional
    public Result deleteTable() {
        Form<RestaurantTables.RestaurantTableDto> inputForm = form(RestaurantTables.RestaurantTableDto.class).bindFromRequest();

        //Create table object
        RestaurantTables table = new RestaurantTables();
        table = table.findById(inputForm.get().id);

        table.delete();

        return ok();
    }
}
