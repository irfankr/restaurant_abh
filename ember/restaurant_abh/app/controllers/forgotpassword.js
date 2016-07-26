import Ember from 'ember';
import User from '../models/user';

export default Ember.Controller.extend({
    user: User.create(),
    actions: {
      createResetPasswordToken: function(){
        var self = this;

        //Sent POST to Play route
        $.ajax({
          url: "/api/v1/createResetPasswordToken",
          type: "POST",
          data: JSON.stringify(this.get('user')),
          processData: false,
          contentType: "application/json; charset=UTF-8",
        }).fail(function(data) {
          //Display alert
          $(".loginNotifications").show();
          //Change alert class
          $(".alert").addClass('alert-danger').removeClass('alert-success');

          //Set alert text
          var json = JSON.parse(data.responseText);
          //Set alert text
          $(".alertText").html(json["error"]);
        }).then(function(data) {

          //Display alert
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
});
