import Ember from 'ember';
import User from '../../../models/user';
import Notification from '../../../models/notification';

export default Ember.Controller.extend({
  user: User.create(),
  countries: ['Bosnia and Herzegovina', 'Serbia', 'Croatia'],
  cities: [],
  notification: Notification.create(),
  finished: false,

  whenIdUserIsLoaded: function(){
    var self = this;

    if(this.get('model.idUser') != null){
      //Set restaurant id
      $.ajax({ //No return here
        url: "/api/v1/admin/getUserDetails",
        type: "POST",
        data: '{"id":'+this.get('model.idUser')+'}',
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        //Set fetched items
        self.set('user', data);

        //Set cities
        if(self.get('user.country') == "Bosnia and Herzegovina"){
          self.set('cities', ['Sarajevo', 'Zenica', 'Banja Luka']);
        } else if(self.get('user.country') == "Serbia"){
          self.set('cities', ['Belgrade', 'Novi Sad', 'Kragujevac']);
        } else if(self.get('user.country') == "Croatia"){
          self.set('cities', ['Zagreb', 'Split', 'Zadar']);
        }

        //Set username password and confirm password fields empty
        self.set('user.password', "");
        self.set('user.confirmPassword', "");
      });
    }
  }.observes("model.idUser"),

  actions: {
    resetDataOnExit: function(){
      this.set('notification.visible', false);
      this.set('finished', false);
    },
    changeCity: function(){
      var cities;

      if(this.get('user.country') == "Bosnia and Herzegovina"){
        cities = ['Sarajevo', 'Zenica', 'Banja Luka'];
      } else if(this.get('user.country') == "Serbia"){
        cities = ['Belgrade', 'Novi Sad', 'Kragujevac'];
      } else if(this.get('user.country') == "Croatia"){
        cities = ['Zagreb', 'Split', 'Zadar'];
      }

      this.set('cities', cities);

      //Reset user city
      this.set('user.city', null);
    },

    editItem: function(){
      var self = this;

      //Define patterns
      var namesPattern = /^[a-zA-Z\'\s]*$/;
      var phonePattern = /^[0-9\-\s]*$/;

      function isValidEmailAddress(emailAddress) {
          var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
          return pattern.test(emailAddress);
      }

      if(self.get('user.email') == null || self.get('user.email') == "" || self.get('user.phone') == null || self.get('user.phone') == "" || self.get('user.country') == null || self.get('user.country') == "" || self.get('user.city') == null || self.get('user.city') == "" || self.get('user.firstName') == null || self.get('user.firstName') == "" || self.get('user.lastName') == null || self.get('user.lastName') == ""){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'All fields are required!');
        self.refresh();
      } else if(!isValidEmailAddress(self.get('user.email'))){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'Email is not valid');
      } else if((self.get('user.password') != "" || self.get('user.confirmPassword') != "") && (self.get('user.password') != self.get('user.confirmPassword'))){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'Password and Confirm password don\'t match.');
      } else if(!namesPattern.test(self.get('user.firstName'))){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'First name is not valid.');
      } else if(!namesPattern.test(self.get('user.lastName'))){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'Last name is not valid.');
      } else if(!phonePattern.test(self.get('user.phone')) || self.get('user.phone').length < 6){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'Phone number is not valid.');
      } else {
        //Remove confirmPassword from user
        self.set('user.confirmPassword', null);

        var data = JSON.stringify(self.get('user'));

        $.ajax({ //No return here
          url: "/api/v1/admin/editUser",
          type: "POST",
          data: data,
          processData: false,
          async:false, //Need to wait
          contentType: "application/json; charset=UTF-8",
        }).fail(function(data) {
          console.log(data);
        }).then(function(data) {
          //Display notification
          self.set('notification.visible', true);
          self.set('notification.classStyle', 'alert-success');
          self.set('notification.text', 'Successful update!');

          //Set finished flag
          self.set('finished', true);
        });
      }
    },
    cancel: function(){
      this.transitionToRoute('admin.users');
    }
  }
});
