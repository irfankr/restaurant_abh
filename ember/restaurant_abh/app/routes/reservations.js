import Ember from 'ember';

export default Ember.Route.extend({
  listReservations: null,
  currentUser: Ember.inject.service(),
  model: function(){
    var self = this;

    if(this.get('currentUser.userLoggedIn') == false){
      self.transitionTo('index');
    }

    //Get list of all restaurants from database
    $.ajax({ //No return here
      url: "/api/v1/getListOfReservationsForUser",
      type: "GET",
      processData: false,
      async:false, //Need to wait then send as model
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      console.log(data);
      self.set('listReservations', data);
    });

    //Return model to template
    return Ember.RSVP.hash({
      listReservations: self.get('listReservations')
    });
  }
});
