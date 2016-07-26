package models;

import play.*;
import play.db.*;
import play.db.jpa.*;
import play.db.jpa.JPA;
import play.mvc.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static play.data.Form.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="restaurantcomments")
public class RestaurantComment {
    @Id @GeneratedValue long id;
    private long mark;

    private String comment;
    private Date insertTime;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="idrestaurant")
    @JsonIgnore
    private Restaurant restaurantComments;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="iduser")
    @JsonIgnore
    private User userComments;

    public RestaurantComment() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getMark() {
        return mark;
    }

    public void setMark(long mark) {
        this.mark = mark;
    }

    public User getUserComments() {
        return userComments;
    }

    public void setUserComments(User userComments) {
        this.userComments = userComments;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getInsertTime() {
        return insertTime;
    }

    public void setInsertTime(Date insertTime) {
        this.insertTime = insertTime;
    }

    public Restaurant getRestaurantComments() {
        return restaurantComments;
    }

    public void setRestaurantComments(Restaurant restaurantComments) {
        this.restaurantComments = restaurantComments;
    }

    public void save() { JPA.em().persist(this); }

    @Transactional
    public static RestaurantComment findByUserAndRestaurant(User user, Restaurant restaurant){
        TypedQuery<RestaurantComment> query = JPA.em().createQuery("SELECT rc FROM RestaurantComment rc WHERE rc.userComments = ? AND rc.restaurantComments = ? ORDER BY rc.id DESC", RestaurantComment.class);
        query.setParameter(1, user);
        query.setParameter(2, restaurant);
        List<RestaurantComment> restaurantComment = query.getResultList();

        if(restaurantComment.size() > 0){
            return restaurantComment.get(0);
        } else {
            return null;
        }

    }

    public static class InputCommentDto {
        public long mark;
        public long idUser;
        public long idRestaurant;
        public String comment;

        public long getMark() {
            return mark;
        }

        public void setMark(long mark) {
            this.mark = mark;
        }

        public long getIdUser() {
            return idUser;
        }

        public void setIdUser(long idUser) {
            this.idUser = idUser;
        }

        public long getIdRestaurant() {
            return idRestaurant;
        }

        public void setIdRestaurant(long idRestaurant) {
            this.idRestaurant = idRestaurant;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }
    }

    public static class OutputCommentsDto {
        public long mark;
        public String name;
        public String insertTime;
        public String comment;

        public long getMark() {
            return mark;
        }

        public void setMark(long mark) {
            this.mark = mark;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getInsertTime() {
            return insertTime;
        }

        public void setInsertTime(String insertTime) {
            this.insertTime = insertTime;
        }

        public String getComment() {
            return comment;
        }

        public void setComment(String comment) {
            this.comment = comment;
        }
    }
}
