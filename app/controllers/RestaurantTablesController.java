package controllers;

import models.*;

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
        tables = JPA.em().createQuery("SELECT rc FROM RestaurantTables rc WHERE idRestaurant = ? ORDER BY id DESC", RestaurantTables.class).setParameter(1, inputForm.get().idRestaurant).getResultList();

        //Return JSON of all restaurants
        return ok(Json.toJson(tables));
    }

    public void addTable(RestaurantTables tableItemInput, long idRestaurant) {
        //Create table object
        RestaurantTables table = new RestaurantTables();

        table.setSittingPlaces(tableItemInput.getSittingPlaces());
        table.setRestauranttables(Restaurant.findById(idRestaurant));

        //Save to database
        table.save();
    }

    public void editTable(RestaurantTables tableItemInput) {
        //Create table object
        RestaurantTables table = new RestaurantTables();
        table = table.findById(tableItemInput.getId());

        if(table != null){
            //Update value
            table.setSittingPlaces(tableItemInput.getSittingPlaces());

            //Save to database
            table.update();
        }
    }

    public void deleteTable(RestaurantTables tableItemInput) {
        //Create table object
        RestaurantTables table = new RestaurantTables();
        table = table.findById(tableItemInput.getId());

        table.delete();
    }

    @Transactional
    public Result adminTableItems() {
        Form<RestaurantTables.RestaurantTableAdministrationDto> inputForm = form(RestaurantTables.RestaurantTableAdministrationDto.class).bindFromRequest();

        //Add new table items
        List<RestaurantTables> addQueue = new ArrayList<RestaurantTables>(inputForm.get().addQueue);
        for(int i=0; i<addQueue.size(); i++){
            addTable(addQueue.get(i), inputForm.get().idRestaurant);
        }

        List<RestaurantTables> editQueue = new ArrayList<RestaurantTables>(inputForm.get().editQueue);
        //Edit table items
        for(int i=0; i<editQueue.size(); i++){
            editTable(editQueue.get(i));
        }

        List<RestaurantTables> deleteQueue = new ArrayList<RestaurantTables>(inputForm.get().deleteQueue);
        //Delete table item
        for(int i=0; i<deleteQueue.size(); i++){
            deleteTable(deleteQueue.get(i));
        }

        return ok();
    }
}
