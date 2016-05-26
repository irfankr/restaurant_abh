import Ember from 'ember';
import Restaurant from '../models/restaurant';

export default Ember.Route.extend({
  restaurantId: null,
  restaurant: Restaurant.create(),
  currentUser: Ember.inject.service(),
  restaurantDetails: null, //This is in return
  restaurantsStatsStyle: null,
  model: function(param){
    var self = this;

    //If logged set style that enable hover on stars for vote
    if(this.get('currentUser.userLoggedIn') == true){
      this.set('restaurantsStatsStyle', 'statslogged')
    } else {
      this.set('restaurantsStatsStyle', 'stats')
    }

    //Put url id into restaurant object
    this.set('restaurant.id', param.restaurantId);

    //Convert object in JSON
    var data = JSON.stringify(this.get('restaurant'));


    //Ajax call to get restaurant details
    $.ajax({ //No return here
      url: "/api/v1/getRestaurantDetails",
      type: "POST",
      data: data,
      processData: false,
      async:false, //Need to wait
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      self.set('restaurantDetails', data);

      //Get menu for restaurant
      $.ajax({ //No return here
        url: "/api/v1/getRestaurantMenu",
        type: "POST",
        data: '{"id":"1"}',
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        console.log(data);
      });

    });
    //Return model to template
    return Ember.RSVP.hash({
      restaurantDetails: self.get('restaurantDetails'),
      restaurantsStatsStyle: self.get('restaurantsStatsStyle'),
    });

  }
});
