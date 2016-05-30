define("restaurant-abh/routes/restaurants", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    /*
      Ovim se zabranjivalo da se prikaze ova stranica ako nije ulogovan
      var self = this;
      if(this.get('userLoggedIn') == false){
        self.transitionTo('login');
      }
      */
    listRestaurants: null,
    listRestaurantsLocations: null,
    model: function model() {
      var self = this;

      //Get list of all restaurants from database
      $.ajax({ //No return here
        url: "/api/v1/getAllRestaurants",
        type: "GET",
        processData: false,
        async: false, //Need to wait
        contentType: "application/json; charset=UTF-8"
      }).fail(function (data) {
        console.log(data);
      }).then(function (data) {
        self.set('listRestaurants', data);

        //Get all locations for restaurants
        $.ajax({ //No return here
          url: "/api/v1/getRestaurantsLocations",
          type: "GET",
          processData: false,
          async: false, //Need to wait
          contentType: "application/json; charset=UTF-8"
        }).fail(function (data) {
          console.log(data);
        }).then(function (data) {
          self.set('listRestaurantsLocations', data);
        });
      });

      //Return model to template
      return _ember["default"].RSVP.hash({
        listRestaurants: self.get('listRestaurants'),
        listRestaurantsLocations: self.get('listRestaurantsLocations')
      });
    }
  });
});