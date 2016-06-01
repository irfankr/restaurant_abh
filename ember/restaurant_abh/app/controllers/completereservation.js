import Ember from 'ember';
import User from '../models/user';

export default Ember.Controller.extend({
  currentReservation: Ember.inject.service(),
  currentUser: Ember.inject.service(),
  user: User.create(),

  countries: ['Bosnia and Herzegovina', 'Serbia', 'Croatia'],
  cities: [],
  remainingTime: '03:00',
  t:null,

  init: function(){
    var self = this;

    if(this.get('currentReservation.restaurandId') == null){
      self.transitionToRoute('index');
    }

    function countdownRemainingTime() {
        var myTime = self.get('remainingTime');
        var ss = myTime.split(":");
        var dt = new Date();
        dt.setHours(0);
        dt.setMinutes(ss[0]);
        dt.setSeconds(ss[1]);

        var dt2 = new Date(dt.valueOf() - 1000);
        var temp = dt2.toTimeString().split(" ");
        var ts = temp[0].split(":");

        self.set('remainingTime', ts[1]+":"+ts[2]);

        if(self.get('remainingTime') == "00:00"){
          clearTimeout(self.get('t'));

          //Erase current reservation
          self.get('currentReservation').removeReservation();
          self.set('remainingTime', '03:00');

          history.go(-1);
        } else {
          self.set('t', setTimeout(countdownRemainingTime, 1000));
        }

    }

    countdownRemainingTime();
  },
  actions: {
    completeReservation: function(){
      var self = this;

      //Send reservation for this user
      var user = this.get('user');

      function makeReservation(){
          //Set user details
          $.ajax({ //No return here
              url: "/api/v1/makeReservation",
              type: "POST",
              data: '{"idRestaurant":"'+self.get('currentReservation.restaurandId')+'", "persons":"'+self.get('currentReservation.people')+'", "reservationDate":"'+self.get('currentReservation.date')+'", "reservationHour":"'+self.get('currentReservation.hour')+'"}',
              processData: false,
              async:false, //Need to wait
              contentType: "application/json; charset=UTF-8",
          }).fail(function(data) {
              $(".registrationsuccessfull").show();
              //Change alert class
              $(".alert").addClass('alert-danger').removeClass('alert-success');
              //Set alert text
              $(".alertText").html('<strong>Error!</strong> Sorry, available table is reserved meanwhile');
          }).then(function(data) {
              //Display notification that reservation is created
              $(".registrationsuccessfull").show();
          });
      }

      //Check is user logged in
      if(this.get('currentUser.userLoggedIn') == true){

          //Make reservation
          makeReservation();

          //Stop countdown timer
          clearTimeout(self.get('t'));

      } else { //if not, registration is required

          function isValidEmailAddress(emailAddress) {
              var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
              return pattern.test(emailAddress);
          }

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

          } else {
            //var data = '{"firstName":"'+firstName+'","lastName":"'+lastName+'","email":"'+email+'","phone":"'+phone+'","password":"'+password+'","country":"'+country+'","city":"'+city+'"}';

              var data = JSON.stringify(this.get('user'));

              //Sent POST to Play route
              $.ajax({
                  url: "/api/v1/register",
                  type: "POST",
                  data: data,
                  processData: false,
                  async:false, //Need to wait
                  contentType: "application/json; charset=UTF-8",
              }).fail(function(data) {
                  //Display successfull notification
                  $(".registerNotifications").show();
                  //Change alert class
                  $(".alert").addClass('alert-danger').removeClass('alert-success');
                  //Set alert text
                  var json = JSON.parse(data.responseText);

                  $(".alertText").html(json["error"]);

                  console.log(data);
              }).then(function(data) {

                  //Login created user
                  var newUser = User.create(data);

                  //Set current user data from response
                  self.get('currentUser').setUser(newUser);

                  //Make reservation
                  makeReservation();

                  //Display successfull notification
                  $(".registrationsuccessfull").show();

                  //Stop countdown timer
                  clearTimeout(self.get('t'));

              });

          }

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
