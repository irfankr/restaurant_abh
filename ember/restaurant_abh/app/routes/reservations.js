import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Reservations',

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
  },

  actions: {
    cancelReservation(idReservation){
      var self = this;

      //Get list of all restaurants from database
      $.ajax({ //No return here
        url: "/api/v1/cancelReservation",
        type: "POST",
        data: '{"idReservation": '+idReservation+'}',
        processData: false,
        async:false, //Need to wait then send as model
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        self.refresh();

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
});
