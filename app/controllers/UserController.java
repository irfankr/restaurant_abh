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

import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


public class UserController extends Controller {
    @Inject MailerClient mailerClient;

    /* Get data from login */
    @Transactional
    public Result login() {
        //Create loginForm
        Form<User.UserLoginDto> loginForm = form(User.UserLoginDto.class).bindFromRequest();
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
            return badRequest("{\"error\": \"User doesn't exist!\"}");
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

    @Transactional
    public Result register() {
        //Create loginForm
        Form<User.UserRegisterDto> RegisterForm = form(User.UserRegisterDto.class).bindFromRequest();

        //Create user object
        User user = new User();

        user.setFirstName(RegisterForm.get().firstName);
        user.setLastName(RegisterForm.get().lastName);
        user.setEmail(RegisterForm.get().email);
        user.setPhone(RegisterForm.get().phone);
        user.setPassword(User.md5(RegisterForm.get().password));
        user.setCity(RegisterForm.get().city);
        user.setCountry(RegisterForm.get().country);

        User checkUser = new User();


        //Check is there user with same email
        if(checkUser.findByEmail(user.getEmail()) == null){

            //Validation
            if(!user.getFirstName().matches("[A-Z][a-zA-Z]*")){ //First name
                return badRequest("{\"error\": \"First name is not valid!\"}");
            }

            if(!user.getLastName().matches("[a-zA-z]+([ '-][a-zA-Z]+)*")){ //Last name
                return badRequest("{\"error\": \"Last name is not valid!\"}");
            }

            if(!user.getPhone().matches("[0-9-()\\/ ]*[1-9][0-9-() ]*")){ //Phone number
                return badRequest("{\"error\": \"Phone number is not valid!\"}");
            }

            //Store user in database
            long idCreatedUser = user.save();

            //Set value to session that user is logged in
            //Put user id in session
            session().clear();
            session("idUser", Long.toString(idCreatedUser));

            return ok(Json.toJson(user));
        } else {
            return badRequest("{\"error\": \"User with entered mail exist!\"}");
        }

    }

    @Transactional
    public Result createResetPasswordToken() {
        //Create loginForm
        Form<User.UserCreateResetPasswordTokenDto> RegisterForm = form(User.UserCreateResetPasswordTokenDto.class).bindFromRequest();

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
            .setFrom("RestaurantABH <no-reply@restaurantbh.com>")
            .addTo("Irfan Krijestorac <irfankr91@gmail.com>")
                    // sends text, HTML or both...
            .setBodyHtml("<html><body><p>An <b>html</b> Podnijeli ste zahtjev za slanje emaila</p></body></html>");
            mailerClient.send(email);

            //Create token for reset password for 30min
            return ok("Saljemo");
        }
    }

    @Transactional
    public Result getAllUsers() {
        //Create loginForm
        Form<User.AdminUsersListDto> UsersForm = form(User.AdminUsersListDto.class).bindFromRequest();
        System.out.println("ID Stranice: " + UsersForm.get().pageId);
        //Declare list
        List<User> users = new ArrayList<User>();
        User user = new User();
        users = user.getAll(UsersForm.get().pageId);

        //Return JSON of all users
        return ok(Json.toJson(users));
    }

    /* Admin */
    @Transactional
    public Result getFilteredUsers() {
        Form<User.UsersFilterDto> inputForm = form(User.UsersFilterDto.class).bindFromRequest();

        EntityManager em = JPA.em();
        CriteriaBuilder qb = em.getCriteriaBuilder();
        CriteriaQuery<User> criteria = qb.createQuery(User.class);
        Root<User> query = criteria.from(User.class);

        //Create conditions
        List<Predicate> predicates = new ArrayList<Predicate>();

        if(inputForm.get().searchText != null && inputForm.get().searchText != "") {
            //Search text
            predicates.add(
                    qb.or(
                            qb.like(qb.upper(query.<String>get("email")), "%"+inputForm.get().searchText.toUpperCase()+"%"),
                            qb.like(qb.upper(query.<String>get("firstname")), "%"+inputForm.get().searchText.toUpperCase()+"%"),
                            qb.like(qb.upper(query.<String>get("lastname")), "%"+inputForm.get().searchText.toUpperCase()+"%")
                    )
            );
        }

        //Execute query
        criteria.select(query).where(predicates.toArray(new Predicate[]{}));
        criteria.orderBy(qb.asc(query.get("id")));

        //Get result from query
        long offsetItems = (inputForm.get().pageNumber-1) * inputForm.get().itemsPerPage;
        int offsetItemsInt = (int) offsetItems;
        int itemsPerPageInt = (int) inputForm.get().itemsPerPage;
        List<User> users = em.createQuery(criteria).setMaxResults(itemsPerPageInt).setFirstResult(offsetItemsInt).getResultList();

        //Create return class
        User.UsersDto returnItems = new User.UsersDto();

        //Insert restaurants
        returnItems.setUsers(users);

        //Insert number of restaurants page
        List<User> itemsTemp = em.createQuery(criteria).getResultList();

        int itemsSize = (int) itemsTemp.size();
        int numberOfPages = (int) Math.ceil(itemsSize*1.00 / itemsPerPageInt*1.00);

        returnItems.setNumberOfPages(numberOfPages);

        return ok(Json.toJson(returnItems));
    }

    @Transactional
    public Result addUser() {
        Form<User.UserRegisterDto> inputForm = form(User.UserRegisterDto.class).bindFromRequest();

        //Create object
        User user = new User();

        //Check is there user with this name already
        if(user.findByEmail(inputForm.get().email) == null){

            //Insert values
            user.setFirstName(inputForm.get().firstName);
            user.setLastName(inputForm.get().lastName);
            user.setEmail(inputForm.get().email);
            user.setPhone(inputForm.get().phone);
            user.setPassword(User.md5(inputForm.get().password));
            user.setCity(inputForm.get().city);
            user.setCountry(inputForm.get().country);

            //Save to database
            user.save();

            return ok(Json.toJson(user));
        } else {
            return badRequest("{\"error\": \"User already exist!\"}");
        }
    }

    @Transactional
    public Result editUser() {
        Form<User.UserRegisterDto> inputForm = form(User.UserRegisterDto.class).bindFromRequest();

        //Create object
        User user = new User();
        user = user.findById(inputForm.get().id);

        if(user != null){
            //Update values
            user.setFirstName(inputForm.get().firstName);
            user.setLastName(inputForm.get().lastName);
            user.setEmail(inputForm.get().email);
            user.setPhone(inputForm.get().phone);
            user.setCity(inputForm.get().city);
            user.setCountry(inputForm.get().country);

            if(inputForm.get().password != "") {
                user.setPassword(User.md5(inputForm.get().password));
            }

            //Save to database
            user.update();

            return ok(Json.toJson(user));
        } else {
            return badRequest("{\"error\": \"User doesn't exist!\"}");
        }
    }

    @Transactional
    public Result deleteUser() {
        Form<User.UserRegisterDto> inputForm = form(User.UserRegisterDto.class).bindFromRequest();

        //Create category object
        User user = new User();
        user = user.findById(inputForm.get().id);

        user.delete();

        return ok();
    }

    @Transactional
    public Result getUserDetails() {
        Form<User.UserRegisterDto> inputForm = form(User.UserRegisterDto.class).bindFromRequest();

        //Create object
        User user = new User();
        user = user.findById(inputForm.get().id);

        return ok(Json.toJson(user));
    }
}
