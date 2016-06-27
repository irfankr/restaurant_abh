package controllers;

import models.Restaurant;
import models.RestaurantCategories;
import models.RestaurantMenuItem;


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

public class RestaurantMenuItemController extends Controller {

    public void addMenuItem(RestaurantMenuItem menuItemInput) {
        //Create menuitem object
        RestaurantMenuItem menuItem = new RestaurantMenuItem();

        menuItem.setIdRestaurant(menuItemInput.getIdRestaurant());
        menuItem.setDescription(menuItemInput.getDescription());
        menuItem.setName(menuItemInput.getName());
        menuItem.setPrice(menuItemInput.getPrice());
        menuItem.setType(menuItemInput.getType());

        //Save to database
        menuItem.save();
    }


    public void editMenuItem(RestaurantMenuItem menuItemInput) {

        //Create menu item object
        RestaurantMenuItem menuItem = new RestaurantMenuItem();
        menuItem = menuItem.findById(menuItemInput.getId());

        //Update value
        menuItem.setDescription(menuItemInput.getDescription());
        menuItem.setName(menuItemInput.getName());
        menuItem.setPrice(menuItemInput.getPrice());
        menuItem.setType(menuItemInput.getType());

        //Save to database
        //menuItem.update();
    }

    public void deleteMenuItem(RestaurantMenuItem menuItemInput) {

        //Create menu item object
        RestaurantMenuItem menuItem = new RestaurantMenuItem();
        menuItem = menuItem.findById(menuItemInput.getId());

        //Save to database
        menuItem.delete();
    }

    @Transactional
    public Result adminMenuItems() {
        Form<RestaurantMenuItem.RestaurantMenuAdministrationDto> inputForm = form(RestaurantMenuItem.RestaurantMenuAdministrationDto.class).bindFromRequest();

        //Add new menu items
        List<RestaurantMenuItem> addQueue = new ArrayList<RestaurantMenuItem>(inputForm.get().addQueue);
        for(int i=0; i<addQueue.size(); i++){
            addMenuItem(addQueue.get(i));
        }

        List<RestaurantMenuItem> editQueue = new ArrayList<RestaurantMenuItem>(inputForm.get().editQueue);
        //Edit menu items
        for(int i=0; i<editQueue.size(); i++){
            editMenuItem(editQueue.get(i));
        }

        List<RestaurantMenuItem> deleteQueue = new ArrayList<RestaurantMenuItem>(inputForm.get().deleteQueue);
        //Add new menu items
        for(int i=0; i<deleteQueue.size(); i++){
            deleteMenuItem(deleteQueue.get(i));
        }

        return ok();
    }
}
