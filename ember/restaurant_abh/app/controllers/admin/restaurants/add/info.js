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
  edit: false,

  whenIdRestaurantIsLoaded: function(){
      var self = this;

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

      if(this.get('model.idRestaurant') != null){
        //Set restaurant id
        $.ajax({ //No return here
          url: "/api/v1/getRestaurantDetails",
          type: "POST",
          data: '{"id":'+this.get('model.idRestaurant')+'}',
          processData: false,
          async:false, //Need to wait
          contentType: "application/json; charset=UTF-8",
        }).fail(function(data) {
          console.log(data);
        }).then(function(data) {
          //Set fetched items
          self.set('restaurant', data);

          //Get selected Categories for this restaurant
          $.ajax({ //No return here
            url: "/api/v1/admin/getRestaurantCategories",
            type: "POST",
            data: '{"id":'+self.get('model.idRestaurant')+'}',
            processData: false,
            async:false, //Need to wait
            contentType: "application/json; charset=UTF-8",
          }).fail(function(data) {
            console.log(data);
          }).then(function(data) {
            //Set fetched items
            self.set('selectedCategories', data);

            self.set('edit', true);
          });
        });
      }
    }.observes("model.idRestaurant"),

  actions: {
    resetDataOnExit: function(){
      this.set('notification.visible', false);
      //Empty restaurants var
      this.set('restaurant', Restaurant.create());
    },

    addItem: function(){
      var self = this;

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
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-success');
        self.set('notification.text', 'Restaurant created!');

        self.send('setIdRestaurant', data.id);
      });

    },
    editItem: function(){
      var self = this;

      console.log(this.get('selectedCategories'));

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
        url: "/api/v1/admin/editRestaurant",
        type: "POST",
        data: JSON.stringify(self.get('restaurant')),
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-success');
        self.set('notification.text', 'Successful edit!');
      });
    },

    removedItemInCategoriesDropDown: function(category){
      var self = this;
      //Remove item from items selected
      for(var i=0; i<self.get('selectedCategories').length; i++){
        console.log(self.get('selectedCategories')[i]);
        if(self.get('selectedCategories')[i].id == category.id){
          self.get('selectedCategories').removeObject(self.get('selectedCategories')[i]);
        }
      }
    }
  }
});
