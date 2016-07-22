import Ember from 'ember';

export default Ember.Route.extend({
  listRestaurants: null,
  listNearestRestaurants: null,
  listRestaurantsLocations: null,

  currentLocationCoordinates: [],
  showNearestRestaurants: false,

  geolocation: Ember.inject.service(),

  getUserLocation: function() {
    var self = this;

    this.get('geolocation').getLocation().then(function(geoObject) {
      var currentLocation = self.get('geolocation').get('currentLocation');

      //Set current coodrinates
      self.set('currentLocationCoordinates', currentLocation);

      console.log(currentLocation);
      return currentLocation;
    });
  },

  model: function(){
    var self = this;

    //Get current user location
    this.getUserLocation();

    //Get list of popular restaurants for lunch today
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

        if(self.get('currentLocationCoordinates').length == 0){
          self.set('showNearestRestaurants', false);
        } else {
          //Return nearest restaurants
          $.ajax({ //No return here
            url: "/api/v1/getAllNearestRestaurants",
            type: "POST",
            data: '{"latitude":'+self.get('currentLocationCoordinates')[0]+', "longitude":'+self.get('currentLocationCoordinates')[1]+'}',
            processData: false,
            async:false, //Need to wait
            contentType: "application/json; charset=UTF-8",
          }).fail(function(data) {
            console.log(data);
          }).then(function(data) {
            self.set('listNearestRestaurants', data);
            self.set('showNearestRestaurants', true);
          });
        }

      });

    });

    //Return model to template
    return Ember.RSVP.hash({
      listRestaurants: self.get('listRestaurants'),
      listNearestRestaurants: self.get('listNearestRestaurants'),
      listRestaurantsLocations: self.get('listRestaurantsLocations'),
      showNearestRestaurants: self.get('showNearestRestaurants')
    });

  }
});






