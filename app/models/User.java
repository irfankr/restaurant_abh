package models;

import play.*;
import play.data.DynamicForm;
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

/**
 * Created by irfank on 5/16/16.
 */
@Entity
@Table(name="users")
public class User {
    @Id @GeneratedValue int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phone;
    private String country;
    private String city;

    public User() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
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


    public static User findById(int id){
        EntityManager em = JPA.em();
        User user = em.find(User.class, id);

        return user;
    }

    public void save() {
        EntityManager em = JPA.em();
        Query query = em.createNativeQuery("INSERT INTO users (email, password, firstName, lastName, phone, country, city) VALUES(?, ?, ?, ?, ?, ?, ?)");
        query.setParameter(1, this.getEmail());
        query.setParameter(2, this.getPassword());
        query.setParameter(3, this.getFirstName());
        query.setParameter(4, this.getLastName());
        query.setParameter(5, this.getPhone());
        query.setParameter(6, this.getCountry());
        query.setParameter(7, this.getCity());
        query.executeUpdate();
    }

    public void update() {
        EntityManager em = JPA.em();
        Query query = em.createNativeQuery("UPDATE users SET email = ?, password = ?, firstName = ?, lastName = ?, phone = ?, country = ?, city = ? WHERE id = ?");
        query.setParameter(1, this.getEmail());
        query.setParameter(2, this.getPassword());
        query.setParameter(3, this.getFirstName());
        query.setParameter(4, this.getLastName());
        query.setParameter(5, this.getPhone());
        query.setParameter(6, this.getCountry());
        query.setParameter(7, this.getCity());
        query.setParameter(8, this.getId());
        query.executeUpdate();
    }

    public void delete() {
        User user = this.findById(this.getId());
        EntityManager em = JPA.em();
        em.remove(user);
    }
}
