package controllers;

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

    @Transactional
    public Result addMenuItem() {
        Form<RestaurantMenuItem.RestaurantMenuItemDto> inputForm = form(RestaurantMenuItem.RestaurantMenuItemDto.class).bindFromRequest();

        //Create menuitem object
        RestaurantMenuItem menuItem = new RestaurantMenuItem();

        menuItem.setIdRestaurant(inputForm.get().idRestaurant);
        menuItem.setDescription(inputForm.get().description);
        menuItem.setName(inputForm.get().name);
        menuItem.setPrice(inputForm.get().price);
        menuItem.setType(inputForm.get().type);

        //Save to database
        menuItem.save();

        return ok(Json.toJson(menuItem));
    }

    @Transactional
    public Result editMenuItem() {
        Form<RestaurantMenuItem.RestaurantMenuItemDto> inputForm = form(RestaurantMenuItem.RestaurantMenuItemDto.class).bindFromRequest();

        //Create menu item object
        RestaurantMenuItem menuItem = new RestaurantMenuItem();
        menuItem = menuItem.findById(inputForm.get().id);

        if(menuItem != null){
            //Update value
            menuItem.setDescription(inputForm.get().description);
            menuItem.setName(inputForm.get().name);
            menuItem.setPrice(inputForm.get().price);
            menuItem.setType(inputForm.get().type);

            //Save to database
            menuItem.update();

            return ok(Json.toJson(menuItem));
        } else {
            return badRequest("{\"error\": \"Menu item doesn't exist!\"}");
        }
    }

    @Transactional
    public Result deleteMenuItem() {
        Form<RestaurantMenuItem.RestaurantMenuItemDto> inputForm = form(RestaurantMenuItem.RestaurantMenuItemDto.class).bindFromRequest();

        //Create menu item object
        RestaurantMenuItem menuItem = new RestaurantMenuItem();
        menuItem = menuItem.findById(inputForm.get().id);

        menuItem.delete();

        return ok();
    }
}
