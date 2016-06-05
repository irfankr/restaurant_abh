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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import play.db.*;
import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.concurrent.TimeUnit;
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

            //Create session that stores wrong attempts
        } else {
            User user = User.findByEmailAndPassword(loginForm.get().email, loginForm.get().password);
            if(user == null) {
                return badRequest("{error: \"User data is not valid!\"}");
            } else {
                //Put user id in session
                //session().clear();
                session("idUser", Long.toString(user.getId()));

                //If user didn't check remember me option, then don't set session expiration
                if(Boolean.valueOf(loginForm.get().rememberMe) == false){
                    //Add 20 minutes to current
                    Date currentTime = new Date();
                    Date newDate = new Date(currentTime.getTime() + TimeUnit.MINUTES.toMillis(20));

                    session("userLogInExpiration", newDate.toString()); //When will user session expire

                    System.out.println(session("userLogInExpiration"));
                }

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
            //Get current time
            Date currentTime = new Date();
            Date userLogInExpiration = null;

            if(session("userLogInExpiration") != null) { //If this var is !=null it means that user didn't check remember me

                try {
                    SimpleDateFormat format = new SimpleDateFormat("EEE MMM dd kk:mm:ss z yyyy");
                    userLogInExpiration = format.parse(session("userLogInExpiration"));
                } catch (ParseException pe) {
                    System.out.println("ERROR: Cannot parse date in UserController.getCurrentUser");
                }

                //Check is user remembered, and is session expired
                if (session("userLogInExpiration") != null && currentTime.after(userLogInExpiration)) {
                    return null;
                }
            }

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

            //Validation
            if(!user.getFirstName().matches("[A-Z][a-zA-Z]*")){ //First name
                return badRequest("{\"error\": \"First name is not valid!\"}");
            }

            if(!user.getFirstName().matches("[a-zA-z]+([ '-][a-zA-Z]+)*")){ //Last name
                return badRequest("{\"error\": \"Last name is not valid!\"}");
            }

            if(!user.getPhone().matches("[0-9-()\\/ ]*[1-9][0-9-() ]*")){ //Phone number
                return badRequest("{\"error\": \"Phone number is not valid!\"}");
            }

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
        public String rememberMe;
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
