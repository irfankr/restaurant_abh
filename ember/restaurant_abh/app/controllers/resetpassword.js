import Ember from 'ember';
import User from '../models/user';

export default Ember.Controller.extend({
  tokenString: null,
  showResetPasswordFields: false,
  user: User.create(),

  checkIsTokenValid: function(){
    var self = this;

    self.set('tokenString', self.get('model.tokenString'));

    //Check reset password token exist
    $.ajax({
      url: "/api/v1/checkIsTokenValid",
      type: "POST",
      data: '{"userToken":"'+self.get('tokenString')+'"}',
      processData: false,
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      //Hide reset input fields
      self.set('showResetPasswordFields', false);

      //Display alert
      $(".loginNotifications").show();
      //Change alert class
      $(".alert").addClass('alert-danger').removeClass('alert-success');

      //Set alert text
      console.log(data.responseText);
      var json = JSON.parse(data.responseText);

      //Set alert text
      $(".alertText").html(json["error"]);
    }).then(function(data) {
      //Show reset input fields
      self.set('showResetPasswordFields', true);
    });
  }.observes('model.tokenString'),

  actions: {
    setNewPassword: function(){
      var self = this;

      //Set token value
      self.set('user.userToken', self.get('tokenString'));

      if(self.get('user.password') != self.get('user.confirmpassword') || self.get('user.password') == "" || self.get('user.confirmpassword') == "" || self.get('user.password') == "undefined" || self.get('user.confirmpassword') == "undefined" || self.get('user.password') == null || self.get('user.confirmpassword') == null){
        //Display alert
        $(".loginNotifications").show();
        //Change alert class
        $(".alert").addClass('alert-danger').removeClass('alert-success');
        //Set alert text
        $(".alertText").html('<strong>Warning!</strong> Password and Confirm password don\'t match.');
      } else {
        $.ajax({
          url: "/api/v1/resetUserPassword",
          type: "POST",
          data: JSON.stringify(self.get('user')),
          processData: false,
          contentType: "application/json; charset=UTF-8",
        }).fail(function(data) {
          console.log(data);
        }).then(function(data) {
          //Hide reset input fields
          self.set('showResetPasswordFields', false);

          //Show notification
          $(".loginNotifications").show();
          //Change alert class
          $(".alert").addClass('alert-success').removeClass('alert-danger');
          //Set alert text
          var json = JSON.parse(data);
          //Set alert text
          $(".alertText").html(json["ok"]);
        });
      }
    }
  }
});
