import Ember from 'ember';
import Restaurant from '../models/restaurant';

export default Ember.Route.extend({
  restaurantId: null,
  restaurant: Restaurant.create(),
  model: function(param){
    //OVO RADI I OVO POMOCU PARAM DOBIJEM ID RESTORANA
    //console.log("ID iz URL:" + param.restaurantId);
    //this.store.push(param.restaurantId);
    //return param.id;

    var self = this;

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


    //Put url id into restaurant object
    this.set('restaurant.id', param.restaurantId);

    //Convert object in JSON
    var data = JSON.stringify(this.get('restaurant'));

    //Ajax call to get restaurant details
    return $.ajax({
      url: "/api/v1/getRestaurantDetails",
      type: "POST",
      data: data,
      processData: false,
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      //console.log(data);
      self.set('restaurantDetails', data);

      var restaurantDetails = self.get('restaurantDetails');

      //String with price range string
      restaurantDetails.priceRange = priceRangeString(restaurantDetails.priceRange);
      //console.log("STRING" + restaurantDetails.priceRange);

      return restaurantDetails;

      //console.log("DETALJI RESTORANA: " + self.get('restaurantDetails.restaurantName'));
    });
  }
});
