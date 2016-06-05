import Ember from 'ember';
import User from '../models/user';

export default Ember.Service.extend({
  checkUser(email, password, rememberMe){

    //Sent POST to Play route
    return $.ajax({
      url: "/api/v1/login",
      type: "POST",
      data: '{"email":"'+email+'","password":"'+password+'","rememberMe":"'+rememberMe+'"}',
      processData: false,
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      //Display alert
      $(".loginNotifications").show();
      //Change alert class
      $(".alert").addClass('alert-danger').removeClass('alert-success');
      //Set alert text
      $(".alertText").html('<strong>Warning!</strong> Entered data is not valid.');

      console.log(data);
    }).then(function(data) {
      return User.create(data);
    });
  }
});
