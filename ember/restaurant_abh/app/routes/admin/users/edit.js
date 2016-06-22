import Ember from 'ember';
import User from '../../../models/user';
import Notification from '../../../models/notification';

export default Ember.Route.extend({
  user: User.create(),
  confirmPassword: null,
  countries: ['Bosnia and Herzegovina', 'Serbia', 'Croatia'],
  cities: [],
  notification: Notification.create(),

  exit: function(){
    this.set('notification.visible', false);
  },

  actions: {
    editItem: function(){
      var self = this;

      function isValidEmailAddress(emailAddress) {
          var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
          return pattern.test(emailAddress);
      }
      console.log(self.get('user.password'));
      console.log(self.get('confirmPassword'));
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
      } else if((self.get('user.password') != null || self.get('user.password') != "" || self.get('confirmPassword') != null || self.get('confirmPassword') != "") && (self.get('user.password') != self.get('confirmPassword'))){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'Password and Confirm password don\'t match.');
      } else {
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
          self.set('notification.text', 'Successful edit!');
        });
      }
    },
    cancel: function(){
      this.transitionTo('admin.users');
    },
    changeCityInRoute: function(listOfCities, country){
      this.set('cities', listOfCities);
      this.refresh();
    }
  },
  model: function(param){
    var self = this;

    if(param.id != null){
      //Set restaurant id
      $.ajax({ //No return here
        url: "/api/v1/admin/getUserDetails",
        type: "POST",
        data: '{"id":'+param.id+'}',
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
       //Set fetched items
        self.set('user', data);
      });
    }

    //Scroll to top
    $("html, body").animate({ scrollTop: 0 }, 500);

    //Return model to template
    return Ember.RSVP.hash({
      user: self.get('user'),
      cities: self.get('cities'),
      countries: self.get('countries'),
      notification: self.get('notification'),
      confirmPassword: self.get('confirmPassword'),
      param: param
    });

  }
});
