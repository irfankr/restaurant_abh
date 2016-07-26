package models;

import play.*;
import play.data.DynamicForm;
import static play.data.Form.*;
import play.data.Form;
import play.mvc.*;

import java.util.Date;
import java.util.*;

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

import java.io.IOException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by irfank on 5/16/16.
 */
@Entity
@Table(name="users")
public class User {
    @Id @GeneratedValue long id;
    private String email;
    @JsonIgnore private String password;
    private String firstname;
    private String lastname;
    private String phone;
    private String country;
    private String city;

    public User() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstname;
    }

    public void setFirstName(String firstName) {
        this.firstname = firstName;
    }

    public String getLastName() {
        return lastname;
    }

    public void setLastName(String lastName) {
        this.lastname = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public long save() {
        JPA.em().persist(this);
        return this.getId();
    }

    public void update() { JPA.em().merge(this); }

    public void delete() {
        JPA.em().remove(this);
    }

    @Transactional
    public static List<User> getAll(long pageId) {
        List<User> users = JPA.em().createNativeQuery("SELECT * FROM users ORDER BY id ASC LIMIT 13 OFFSET ?", User.class).setParameter(1, pageId).getResultList();
        return users;
    }

    @Transactional
    public static User findById(long id){
        try {
            return JPA.em().find(User.class, id);
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }

    @Transactional
    public static User findByEmailAndPassword(String email, String password){
        try {
            TypedQuery<User> query = JPA.em().createQuery("SELECT u FROM User u WHERE email = ? AND password = ?", User.class);
            query.setParameter(1, email);
            query.setParameter(2, md5(password));
            User user = query.getSingleResult();

            return user;
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }

    @Transactional
    public static User findByEmail(String email){
        try {
            TypedQuery<User> query = JPA.em().createQuery("SELECT u FROM User u WHERE email = ?", User.class);
            query.setParameter(1, email);
            User user = query.getSingleResult();

            return user;
        } catch(NoResultException noresult) { //If there is no user with
            return null;
        }
    }

    public static String md5(String input) {

        String md5 = null;

        if(null == input) return null;

        try {

            //Create MessageDigest object for MD5
            MessageDigest digest = MessageDigest.getInstance("MD5");

            //Update input string in message digest
            digest.update(input.getBytes(), 0, input.length());

            //Converts message digest value in base 16 (hex)
            md5 = new BigInteger(1, digest.digest()).toString(16);

        } catch (NoSuchAlgorithmException e) {

            e.printStackTrace();
        }
        return md5;
    }

    public static class UserLoginDto {
        public String email;
        public String password;
        public String rememberMe;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getRememberMe() {
            return rememberMe;
        }

        public void setRememberMe(String rememberMe) {
            this.rememberMe = rememberMe;
        }
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

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getCountry() {
            return country;
        }

        public void setCountry(String country) {
            this.country = country;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }
    }

    public static class AdminUsersListDto {
        public long pageId;

        public long getPageId() {
            return pageId;
        }

        public void setPageId(long pageId) {
            this.pageId = pageId;
        }
    }

    public static class UsersFilterDto {
        public String searchText;
        public long itemsPerPage;
        public long pageNumber;

        public String getSearchText() {
            return searchText;
        }

        public void setSearchText(String searchText) {
            this.searchText = searchText;
        }

        public long getItemsPerPage() {
            return itemsPerPage;
        }

        public void setItemsPerPage(long itemsPerPage) {
            this.itemsPerPage = itemsPerPage;
        }

        public long getPageNumber() {
            return pageNumber;
        }

        public void setPageNumber(long pageNumber) {
            this.pageNumber = pageNumber;
        }
    }

    public static class UsersDto {
        public List<User> users = new ArrayList<User>();
        public long numberOfPages;

        public List<User> getUsers() {
            return users;
        }

        public void setUsers(List<User> users) {
            this.users = users;
        }

        public long getNumberOfPages() {
            return numberOfPages;
        }

        public void setNumberOfPages(long numberOfPages) {
            this.numberOfPages = numberOfPages;
        }
    }
}
