package models;

import java.util.Date;
import java.util.*;

import play.db.*;
import javax.persistence.*;
/**
 * Created by irfank on 5/16/16.
 */
@Entity
public class User {
    @Id @GeneratedValue long Id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phone;
    private String country;
    private String city;

    public User(String email, String password, String firstName, String lastName, String phone, String country, String city) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.country = country;
        this.city = city;
    }

    public static void insert(String email, String password, String firstName, String lastName, String phone, String country, String city) {
        User u = new User(email, password, firstName, lastName, phone, country, city);
    }
}
