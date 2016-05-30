package controllers;

import play.*;
import play.data.DynamicForm;
import static play.data.Form.*;
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
        //Create loginForm
        Form<UserLoginDto> loginForm = form(UserLoginDto.class).bindFromRequest();

        if (loginForm.hasErrors()) {
            return badRequest("Some error happend!");
        } else {
            User user = User.findByEmailAndPassword(loginForm.get().email, loginForm.get().password);
            if(user == null) {
                return badRequest("{error: \"User data is not valid!\"}");
            } else {
                //Put user id in session
                session().clear();
                session("idUser", Long.toString(user.getId()));

                return ok(Json.toJson(user));
            }
        }
    }

    public Result logout(){
        //Delete user from session
        session().clear();

        return ok();
    }

    @Transactional
    public Result currentUser(){
        User user = getCurrentUser();
        if(user == null){
            return badRequest("{error: \"User doesn't exist!\"}");
        } else {
            return ok(Json.toJson(user));
        }
    }

    @Transactional
    public static User getCurrentUser() {
        //Creare user object
        User user = new User();

        //Get user id from session
        if(session("idUser") == null){
            return null;
        } else {
            long userId = Long.parseLong(session("idUser"));
            //Logger.info("SESSION ID: " + session("idUser"));

            //Find user with that id
            user = user.findById(userId);

            return user;
        }

    }

    /* Get data from register */
    @Transactional
    public Result register() {
        //Create loginForm
        Form<UserRegisterDto> RegisterForm = form(UserRegisterDto.class).bindFromRequest();

        //Create user object
        User user = new User();

        user.setFirstName(RegisterForm.get().firstName);
        user.setLastName(RegisterForm.get().lastName);
        user.setEmail(RegisterForm.get().email);
        user.setPhone(RegisterForm.get().phone);
        user.setPassword(RegisterForm.get().password);
        user.setCity(RegisterForm.get().city);
        user.setCountry(RegisterForm.get().country);

        User checkUser = new User();

        //Check is there user with same email
        if(checkUser.findByEmail(user.getEmail()) == null){
            //Store user in database
            user.save();

            //Get information about created user (this info contains id of created user)
            User createdUser = User.findByEmailAndPassword(user.getEmail(), user.getPassword());

            //Set value to session that user is logged in
            //Put user id in session
            session().clear();
            session("idUser", Long.toString(createdUser.getId()));

            return ok(Json.toJson(createdUser));
        } else {
            return badRequest("{\"error\": \"User with entered mail exist!\"}");
        }



    }

    public static class UserLoginDto {
        public String email;
        public String password;
    }

    public static class UserRegisterDto {
        public long id;
        public String email;
        public String password;
        public String firstName;
        public String lastName;
        public String phone;
        public String country;
        public String city;
    }

}
