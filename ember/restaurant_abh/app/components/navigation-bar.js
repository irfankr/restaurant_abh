import Ember from 'ember';

export default Ember.Component.extend({
  currentUser: Ember.inject.service(),
  actions: {
      logOut: function(){
        var self = this;

        //Send POST to Play vote route
        $.ajax({
          url: "/api/v1/logout",
          type: "GET",
          processData: false,
          contentType: "application/json; charset=UTF-8",
        }).fail(function(data) {
          console.log(data);
        }).done(function(data) {
          window.location.reload();
        });
      }
    }
});
