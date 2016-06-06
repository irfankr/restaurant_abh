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

import play.libs.mailer.Email;
import play.libs.mailer.MailerClient;
import javax.inject.Inject;
import java.io.File;
import org.apache.commons.mail.EmailAttachment;

public class UserController extends Controller {
    @Inject MailerClient mailerClient;

    /* Get data from login */
    @Transactional
    public Result login() {
        //Create loginForm
        Form<UserLoginDto> loginForm = form(UserLoginDto.class).bindFromRequest();
        Date currentTime = new Date();
        Date userLogInLockedUntil = new Date();

        if (loginForm.hasErrors()) {
            return badRequest("{\"error\": \"Some error happend!\"}");
        } else if(session("loginLockedUntil") != null) {
            try {
                SimpleDateFormat format = new SimpleDateFormat("EEE MMM dd kk:mm:ss z yyyy");
                userLogInLockedUntil = format.parse(session("loginLockedUntil"));
            } catch (ParseException pe) {
                System.out.println("ERROR: Cannot parse date in UserController.login");
            }

            if(session("numberOfInvalidInput").equals("5") && userLogInLockedUntil.after(currentTime)){
                return badRequest("{\"error\": \"Your account is currently locked for 15 minutes!\"}");
            } else {
                session().clear();
                return badRequest("{\"error\": \"Your account is now unlocked!\"}");
            }
        } else {
            User user = User.findByEmailAndPassword(loginForm.get().email, loginForm.get().password);
            if(user == null) {

                //If entered data is wrong, check is there session variable with number of errors
                if(session("numberOfInvalidInput") == null){
                    session("numberOfInvalidInput", "1");
                } else {
                    //Get old value
                    int foo = Integer.parseInt(session("numberOfInvalidInput"));
                    foo += 1;
                    //Insert new value
                    String strNumber = Integer.toString(foo);
                    session("numberOfInvalidInput", strNumber);

                    if(foo == 5){
                        Date newDate = new Date(currentTime.getTime() + TimeUnit.MINUTES.toMillis(15));
                        session("loginLockedUntil", newDate.toString()); //Lock account for input for 15min
                    }
                }

                return badRequest("{\"error\": \"Entered data is not valid! You have " + session("numberOfInvalidInput") + " of 5 attempts!\"}");
            } else {
                //Put user id in session
                session().clear();
                session("idUser", Long.toString(user.getId()));

                //If user didn't check remember me option, then don't set session expiration
                if(Boolean.valueOf(loginForm.get().rememberMe) == false){
                    //Add 20 minutes to current
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

    @Transactional

    public Result createResetPasswordToken() {
        //Create loginForm
        Form<UserCreateResetPasswordTokenDto> RegisterForm = form(UserCreateResetPasswordTokenDto.class).bindFromRequest();

        //Create user object fron input data
        User user = new User();
        user.setEmail(RegisterForm.get().email);

        //Check user exist
        User checkUser = new User();

        if(checkUser.findByEmail(user.getEmail()) == null){
            return badRequest("{\"error\": \"User doesn't exist!\"}");
        } else {
            //Send Email to user address
            String cid = "1234";
            Email email = new Email()
            .setSubject("Resetovana sifra")
            .setFrom("RestaurantABH <no-reply@restaurantabh.com>")
            .addTo("Irfan Krijestorac <irfankr91@gmail.com>")
                    // sends text, HTML or both...
            .setBodyHtml("<html><body><p>An <b>html</b> Podnijeli ste zahtjev za slanje emaila</p></body></html>");
            mailerClient.send(email);

            //Create token for reset password for 30min
            return ok("Saljemo");
        }

    }

    public static class UserCreateResetPasswordTokenDto {
        public String email;
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
