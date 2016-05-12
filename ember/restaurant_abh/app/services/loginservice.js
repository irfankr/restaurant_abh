import Ember from 'ember';
import user from 'ember-data/model';

export default Ember.Service.extend({
  checkUser(email, password){

    //Sent POST to Play route
    $.ajax({
      url: "/login",
      type: "POST",
      data: '{"email":"'+email+'","password":"'+password+'"}',
      processData: false,
      contentType: "application/json; charset=UTF-8",
      async: false,
    }).done(function(data) {
      console.log(data);

      //Return user JSON
      return data;
    }).fail(function(data) {
      console.log(data);
    });

  }
});
