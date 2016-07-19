import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Find table',

  currentReservation: Ember.inject.service(),
  restaurants: [],

  actions: {
    proceedToReservationComplete: function(){
      //Transition to route
      this.transitionTo('completereservation');
    }
  },

  model: function(){
    //console.log(this.get('currentReservation.date'));
    //console.log(JSON.stringify(this.get('currentReservation')));
    var self = this;

    //Set default values
    //self.set('guests', )

    if(this.get('currentReservation.people') == null){
      this.transitionTo('index');
    } else {
      $.ajax({ //No return here
        url: "/api/v1/getFreeTables",
        type: "POST",
        data: JSON.stringify(this.get('currentReservation')),
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        //Set fetched data
        self.set('restaurants', data);
        console.log(self.get('restaurants'));
      });
    }

    //Return model to template
    return Ember.RSVP.hash({
      restaurants: self.get('restaurants'),
      currentReservation: self.get('currentReservation')
    });
  }
});
