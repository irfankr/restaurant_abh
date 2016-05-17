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

import play.db.*;
import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import play.db.jpa.*;
import play.db.jpa.JPAApi;

import play.db.jpa.Transactional;
import play.db.jpa.JPA;

public class UserController extends Controller {

    /* Get data from login */
    @Transactional
    public Result login() {

        //Get input JSON string to (some) object
        JsonNode json = request().body().asJson();

        //Convert input JSON to object
        User user = Json.fromJson(json, User.class);

        //TEST USER INPUT
        User read_user = findByEmailAndPassword(user.getEmail(), user.getPassword());

        //Check is email and password correct
        if(read_user.getEmail().equals(user.getEmail()) && read_user.getPassword().equals(user.getPassword())){
            //Modify user data (test)
            user.setEmail("Modified by Play: " + user.getEmail());
            user.setPassword("Modified by Play: " + user.getPassword());

            //Convert modified object to JSON
            JsonNode userJson = Json.toJson(read_user);

            //Echo Email and Password to Console
            Logger.info(user.getEmail());
            Logger.info(user.getPassword());

            return ok(userJson);
        } else {
            return badRequest("User data is not valid!");
        }

    }

    @Transactional
    public User findByEmailAndPassword(String email, String password){
        EntityManager em = JPA.em();
        Query query = em.createNativeQuery("SELECT * FROM users WHERE email = ? AND password = ?");
        query.setParameter(1, email);
        query.setParameter(2, password);

        Object[] temp_user = (Object[]) query.getSingleResult();

        User user = new User();
        user.setId((int)temp_user[0]);
        user.setEmail((String)temp_user[1]);
        user.setPassword((String)temp_user[2]);
        user.setFirstName((String)temp_user[3]);
        user.setLastName((String)temp_user[4]);
        user.setPhone((String)temp_user[5]);
        user.setCountry((String)temp_user[6]);
        user.setCity((String)temp_user[7]);

        return user;
    }
}
