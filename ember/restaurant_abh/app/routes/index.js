import Ember from 'ember';

export default Ember.Route.extend({
  listRestaurants: null,
  listRestaurantsLocations: null,
  model: function(){
    var self = this;

    //Get list of all restaurants from database
    $.ajax({ //No return here
      url: "/api/v1/allRestaurantsSortReservationsToday",
      type: "GET",
      processData: false,
      async:false, //Need to wait
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      self.set('listRestaurants', data);

      //Get all locations for restaurants
      $.ajax({ //No return here
        url: "/api/v1/getRestaurantsLocations",
        type: "GET",
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        self.set('listRestaurantsLocations', data);
      });
    });

    //Return model to template
    return Ember.RSVP.hash({
      listRestaurants: self.get('listRestaurants'),
      listRestaurantsLocations: self.get('listRestaurantsLocations')
    });

  }
});
