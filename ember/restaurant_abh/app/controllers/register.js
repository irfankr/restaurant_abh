import Ember from 'ember';
import User from '../models/user';

export default Ember.Controller.extend({
  countries: ['Bosnia and Herzegovina', 'Serbia', 'Croatia'],
  currentUser: Ember.inject.service(),
  cities: [],
  user: User.create(),
  actions: {
        register: function(){
          var self = this;

          //Define patterns
          var namesPattern = /^[a-zA-Z\'\s]*$/;
          var phonePattern = /^[0-9\-\s]*$/;

          function isValidEmailAddress(emailAddress) {
              var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
              return pattern.test(emailAddress);
          }


          var user = this.get('user');

          //Check all fields required
          if(user.get('firstName')==null || user.get('lastName')==null || user.get('email') == null || user.get('phone') == null || user.get('password') == null || user.get('city') == null || user.get('country') == null){
            //Display alert
            $(".registerNotifications").show();
            //Change alert class
            $(".alert").addClass('alert-danger').removeClass('alert-success');
            //Set alert text
            $(".alertText").html('<strong>Warning!</strong> All fields are required.');
          } else if(!isValidEmailAddress(user.get('email'))){
            //Display alert
            $(".registerNotifications").show();
            //Change alert class
            $(".alert").addClass('alert-danger').removeClass('alert-success');
            //Set alert text
            $(".alertText").html('<strong>Warning!</strong> Email is not valid.');
          } else if(user.get('password') != user.get('confirmpassword')){
            //Display alert
            $(".registerNotifications").show();
            //Change alert class
            $(".alert").addClass('alert-danger').removeClass('alert-success');
            //Set alert text
            $(".alertText").html('<strong>Warning!</strong> Password and Confirm password don\'t match.');
          } else if(!namesPattern.test(user.get('firstName'))){
            //Display alert
            $(".registerNotifications").show();
            //Change alert class
            $(".alert").addClass('alert-danger').removeClass('alert-success');
            //Set alert text
            $(".alertText").html('<strong>Warning!</strong> First name is not valid.');
          } else if(!namesPattern.test(user.get('lastName'))){
            //Display alert
            $(".registerNotifications").show();
            //Change alert class
            $(".alert").addClass('alert-danger').removeClass('alert-success');
            //Set alert text
            $(".alertText").html('<strong>Warning!</strong> Last name is not valid.');
          } else if(!phonePattern.test(user.get('phone')) || user.get('phone').length < 6){
            //Display alert
            $(".registerNotifications").show();
            //Change alert class
            $(".alert").addClass('alert-danger').removeClass('alert-success');
            //Set alert text
            $(".alertText").html('<strong>Warning!</strong> Phone number is not valid.');
          } else {
            //var data = '{"firstName":"'+firstName+'","lastName":"'+lastName+'","email":"'+email+'","phone":"'+phone+'","password":"'+password+'","country":"'+country+'","city":"'+city+'"}';

            var data = JSON.stringify(this.get('user'));
            console.log(data);

            //Sent POST to Play route
            return $.ajax({
              url: "/api/v1/register",
              type: "POST",
              data: data,
              processData: false,
              contentType: "application/json; charset=UTF-8",
            }).fail(function(data) {
              //Display successfull notification
              $(".registerNotifications").show();
              //Change alert class
              $(".alert").addClass('alert-danger').removeClass('alert-success');
              //Set alert text
console.log(data.responseText);
              var json = JSON.parse(data.responseText);

              $(".alertText").html(json["error"]);


            }).then(function(data) {
              console.log(data);

              //Login created user
              var newUser = User.create(data);

              //Set current user data from response
              self.get('currentUser').setUser(newUser);

              //Display successfull notification
              $(".registerNotifications").show();
              //Change alert class
              $(".alert").addClass('alert-success').removeClass('alert-danger');
              //Set alert text
              $(".alertText").html('<strong>Success!</strong> User is registered. You will be redirected to home page in 2s');

              setTimeout(function(){ self.transitionToRoute('index'); }, 3000);

              return User.create(data);
            });

          }


        },

        //When change value in select list call this function
        changeCity: function(){
          if(this.get('user.country') == "Bosnia and Herzegovina"){
            this.set('cities', ['Sarajevo', 'Zenica', 'Banja Luka'])
          } else if(this.get('user.country') == "Serbia"){
            this.set('cities', ['Belgrade', 'Novi Sad', 'Kragujevac'])
          } else if(this.get('user.country') == "Croatia"){
           this.set('cities', ['Zagreb', 'Split', 'Zadar'])
         }

        }
      }
});
