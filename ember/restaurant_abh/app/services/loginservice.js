import Ember from 'ember';
import User from '../models/user';

export default Ember.Service.extend({
  checkUser(email, password){

    //Sent POST to Play route
    return $.ajax({
      url: "/login",
      type: "POST",
      data: '{"email":"'+email+'","password":"'+password+'"}',
      processData: false,
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      return User.create(data);
    });
  }
});
