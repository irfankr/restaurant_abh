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
            User user = findByEmailAndPassword(loginForm.get().email, loginForm.get().password);
            if(user == null) {
                return badRequest("{error: \"User data is not valid!\"}");
            } else {
                session().clear();
                session("email", loginForm.get().email);
                return ok(Json.toJson(user));
            }
        }
    }

    @Transactional
    public static User findByEmailAndPassword(String email, String password){
        try {
            TypedQuery<User> query = JPA.em().createQuery("SELECT u FROM User u WHERE email = ? AND password = ?", User.class);
            query.setParameter(1, email);
            query.setParameter(2, password);
            User user = query.getSingleResult();

            return user;
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }

    public static class UserLoginDto {

        public String email;
        public String password;

    }
}
