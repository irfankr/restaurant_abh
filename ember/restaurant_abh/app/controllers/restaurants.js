import Ember from 'ember';
import Restaurant from '../models/restaurant';

export default Ember.Controller.extend({
  CurrentUser: Ember.inject.service(),
  listRestaurants: null,
  listRestaurantsLocations: null,
  testvar: null,
  init: function() {
      var self = this;
      this._super.apply(this, arguments);

      //Function that creates string for pricerange (5max)
      function priceRangeString(priceRange){
        var priceRangeString = '<span class="active">';
        for (var i = 1; i <= priceRange; i++) {
            priceRangeString += '$';
        }
        priceRangeString += '</span>';

        for (var i = 5; i > priceRange; i--) {
            priceRangeString += '$';
        }
        return priceRangeString;
      }

      //Get list of all restaurants from database
      return $.ajax({
        url: "/api/v1/getAllRestaurants",
        type: "GET",
        processData: false,
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        //console.log(data);
        self.set('listRestaurants', data);

        console.log("LISTA RESTORANA:" + self.get('listRestaurants'));
      });

      //Get list of all restaurants locations
      return $.ajax({
        url: "/api/v1/getRestaurantsLocations",
        type: "GET",
        processData: false,
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        //console.log(data);
        self.set('listRestaurantsLocations', data);
      });

      //console.log("Ispis iz route:" + this.get('currentuserservice.userFirstName'));
    }
});
