import Ember from 'ember';
import Notification from '../../../../models/notification';
import Restaurant from '../../../../models/restaurant';

export default Ember.Controller.extend({
  categories: [],
  locations: [],

  priceRange: JSON.parse('{"priceRange":[{"name": "Rank 1", "value": 1}, {"name": "Rank 2", "value": 2}, {"name": "Rank 3", "value": 3}, {"name": "Rank 4", "value": 4}, {"name": "Rank 5", "value": 5}]}'),


  restaurant: Restaurant.create(),
  selectedCategories: [],

  notification: Notification.create(),
  init: function(){
    var self = this;

    this.set('restaurant.latitude', 41);
    this.set('restaurant.longitude', 87);

    //Get all categories of restaurant
    $.ajax({ //No return here
      url: "/api/v1/getAllCategories",
      type: "GET",
      processData: false,
      async:false, //Need to wait
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      self.set('categories', data);

      //Set categories
      self.set('categories', data);

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
        self.set('locations', data);
      });

    });
  },
  actions: {
    addItem: function(){
      var self = this;

      console.log(this.get('selectedCategories'));

      //TEMP HARDCODED
      this.set('restaurant.imageFileName', 'suki');

      //Insert categories id's in database
      var tempCategories = this.get('selectedCategories');
      var tempCategoriesIdsArray = Array();
      for (var i = 0; i < tempCategories.length; i++) {
        tempCategoriesIdsArray.push(tempCategories[i].id);
      }
      this.set('restaurant.categories', tempCategoriesIdsArray);

      //Display restaurant data
      console.log(JSON.stringify(this.get('restaurant')));

      $.ajax({ //No return here
        url: "/api/v1/admin/addRestaurant",
        type: "POST",
        data: JSON.stringify(self.get('restaurant')),
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        console.log('UNIO RESTORAAAN');
        console.log(data);
        self.send('setIdRestaurant', data.id);
      });

    }
  }
});
