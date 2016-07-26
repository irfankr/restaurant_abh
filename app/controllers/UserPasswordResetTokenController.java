package controllers;

import models.User;
import models.UserPasswordResetToken;
import play.*;
import play.data.Form;
import play.db.*;
import play.db.jpa.*;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.libs.Json.*;
import play.libs.mailer.MailerClient;
import play.mvc.*;

import javax.inject.Inject;
import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static play.data.Form.*;
import static play.libs.Json.toJson;

import com.sendgrid.*;
import java.io.IOException;

import play.Configuration;

public class UserPasswordResetTokenController extends Controller {
    @Inject MailerClient mailerClient;

    @Transactional
    public Result createResetPasswordToken() throws IOException {
        //Create loginForm
        Form<UserPasswordResetToken.UserCreateResetPasswordTokenDto> RegisterForm = form(UserPasswordResetToken.UserCreateResetPasswordTokenDto.class).bindFromRequest();

        //Create user object fron input data
        User user = new User();
        user.setEmail(RegisterForm.get().email);

        //Check user exist
        User checkUser = new User();
        checkUser = checkUser.findByEmail(user.getEmail());

        //Generate token string
        String tokenString = UUID.randomUUID().toString();

        if(checkUser == null){
            return badRequest("{\"error\": \"User doesn't exist!\"}");
        } else {

            String mailRequestBody = "{\"personalizations\":[{\"to\":[{\"email\":\""+checkUser.getEmail()+"\"}],\"subject\":\"RestaurantsABH Password reset\"}],\"from\":{\"email\":\"no-reply@restaurantbh.com\"},\"content\":[{\"type\":\"text/html\",\"value\": \"Hi there,<br><br>Someone recently requested a password change for your RestaurantsABH account. If this was you, you can set a new password <a href=https://salty-shelf-61597.herokuapp.com/resetpassword/"+tokenString+">here</a>.<br><br>Thanks!<br>RestaurantsABH\"}]}";
            try {
                SendGrid sg = new SendGrid(Configuration.root().getString("sendGridAPIKey"));
                Request request = new Request();
                request.method = Method.POST;
                request.endpoint = "mail/send";
                request.body = mailRequestBody;
                Response response = sg.api(request);
                System.out.println("----------------------------------");
                System.out.println(response.statusCode);
                System.out.println(response.body);
                System.out.println(response.headers);
            } catch (IOException ex) {
                throw ex;
            }

            //Create token for password reset with expiration time 30min
            UserPasswordResetToken newToken = new UserPasswordResetToken();
            newToken.setUserToken(checkUser);

            Date currentDateTime = new Date();
            //Add 30mins to current date time
            Date expirationDateTime = new Date(currentDateTime.getTime() + TimeUnit.MINUTES.toMillis(30));
            newToken.setExpirationTime(expirationDateTime);

            //Insert token string
            newToken.setTokenString(tokenString);

            //Save to database reset password token
            newToken.save();

            System.out.println(expirationDateTime);

            //Create token for reset password for 30min
            return ok("{\"ok\": \"Email has been sent to the email address\"}");
        }
    }

    @Transactional
    public Result checkIsTokenValid(){
        Form<UserPasswordResetToken.UserCreateResetPasswordTokenDto> RegisterForm = form(UserPasswordResetToken.UserCreateResetPasswordTokenDto.class).bindFromRequest();

        UserPasswordResetToken passwordResetToken = UserPasswordResetToken.findByTokenString(RegisterForm.get().userToken);

        if(passwordResetToken == null){
            return badRequest("{\"error\": \"Token doesn't exist or expired!\"}");
        } else {
            return ok("");
        }
    }

    @Transactional
    public Result resetUserPassword(){
        Form<UserPasswordResetToken.UserCreateResetPasswordTokenDto> RegisterForm = form(UserPasswordResetToken.UserCreateResetPasswordTokenDto.class).bindFromRequest();

        //Get user token for password reset
        UserPasswordResetToken passwordResetToken = UserPasswordResetToken.findByTokenString(RegisterForm.get().userToken);

        if(passwordResetToken == null || RegisterForm.get().password == null || RegisterForm.get().password == ""){
            return badRequest("{\"error\": \"Something went wrong!\"}");
        } else {
            //Change user password
            passwordResetToken.getUserToken().setPassword(User.md5(RegisterForm.get().password));

            //Delete used token
            passwordResetToken.delete();

            return ok("{\"ok\": \"Your password has been successfully reset! You can login now.\"}");
        }
    }
}
