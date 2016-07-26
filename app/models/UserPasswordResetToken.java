package models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import play.*;
import play.db.*;
import play.db.jpa.*;
import play.db.jpa.JPA;
import play.mvc.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static play.data.Form.*;

@Entity
@Table(name="userpasswordresettokens")
public class UserPasswordResetToken {
    @Id @GeneratedValue long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="iduser")
    @JsonIgnore
    private User userToken;

    private String tokenString;
    private Date expirationTime;

    public UserPasswordResetToken() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(Date expirationTime) {
        this.expirationTime = expirationTime;
    }

    public User getUserToken() {
        return userToken;
    }

    public void setUserToken(User userToken) {
        this.userToken = userToken;
    }

    public String getTokenString() {
        return tokenString;
    }

    public void setTokenString(String tokenString) {
        this.tokenString = tokenString;
    }

    public void save() { JPA.em().persist(this); }

    public void delete() {
        JPA.em().remove(this);
    }

    @Transactional
    public static UserPasswordResetToken findByTokenString(String tokenString){
        try {
            TypedQuery<UserPasswordResetToken> query = JPA.em().createQuery("SELECT u FROM UserPasswordResetToken u WHERE tokenString = ? AND now() < u.expirationTime", UserPasswordResetToken.class);
            query.setParameter(1, tokenString);
            UserPasswordResetToken resetToken = query.getSingleResult();

            return resetToken;
        } catch(NoResultException noresult) { //If there is no user reset token
            return null;
        }
    }

    public static class UserCreateResetPasswordTokenDto {
        public String email;
        public String userToken;
        public String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getUserToken() {
            return userToken;
        }

        public void setUserToken(String userToken) {
            this.userToken = userToken;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
