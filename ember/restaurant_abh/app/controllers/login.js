import Ember from 'ember';
import User from '../models/user';

export default Ember.Controller.extend({
    loginservice: Ember.inject.service(),
    currentUser: Ember.inject.service(),
    actions: {
      login: function(){
        var self = this;

        //Get values from form
        var email = this.get('email');
        var password = this.get('password');
        var rememberMe = this.get('rememberMe');

        //Function for email validation
        function isValidEmailAddress(emailAddress) {
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return pattern.test(emailAddress);
        }

        //Check all fields required
        if(email == null || password == null){
          //Display alert
          $(".loginNotifications").show();

          //Set alert text
          $(".alertText").html('<strong>Warning!</strong> All fields are required.');
        } else if(!isValidEmailAddress(email)){
          //Display alert
          $(".loginNotifications").show();

          //Set alert text
          $(".alertText").html('<strong>Warning!</strong> Email is not valid.');
        } else {
          //Call login service
          this.get("loginservice").checkUser(email, password, rememberMe)
            .done(function(data) {
              var user = User.create(data);

              //Set current user data from response
              self.get('currentUser').setUser(user);

              //Display successfull notification
              $(".loginNotifications").show();
              //Change alert class
              $(".alert").addClass('alert-success').removeClass('alert-danger');
              //Set alert text
              $(".alertText").html('<strong>Success!</strong> You will be redirected to restaurants page in 2s');

              setTimeout(function(){ self.transitionToRoute('restaurants'); }, 2000);

            });


          //console.log("Email form input:" + email);
          //console.log("Password form input:" + password);
        }
      }
    }
});
