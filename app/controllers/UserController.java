package controllers;

import play.*;
import play.data.DynamicForm;
import play.data.Form;
import play.mvc.*;

import models.User;

import models.*;

import play.mvc.BodyParser;
import play.libs.Json;
import play.libs.Json.*;
import static play.libs.Json.toJson;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class UserController extends Controller {

    /* Get data from login */
    public Result login() {

        //Hardcoded email and password for user
        String hc_Email = "irfankr91@gmail.com";
        String hc_Password = "12345";

        //Get input JSON string to (some) object
        JsonNode json = request().body().asJson();

        //Convert input JSON to object
        User user = Json.fromJson(json, User.class);

        //Check is email and password correct
        if(hc_Email.equals(user.getEmail()) && hc_Password.equals(user.getPassword())){
            //Modify user data (test)
            user.setEmail("Modified by Play: " + user.getEmail());
            user.setPassword("Modified by Play: " + user.getPassword());

            //Convert modified object to JSON
            JsonNode userJson = Json.toJson(user);

            //Echo Email and Password to Console
            Logger.info(user.getEmail());
            Logger.info(user.getPassword());

            return ok(userJson);
        } else {
            return badRequest("User data is not valid!");
        }

    }

}
