import Ember from 'ember';
import Notification from '../../../../models/notification';
import Restaurant from '../../../../models/restaurant';

export default Ember.Controller.extend({
  categories: [],
  locations: [],
  edit: false,

  priceRange: JSON.parse('{"priceRange":[{"name": "Rank 1", "value": 1}, {"name": "Rank 2", "value": 2}, {"name": "Rank 3", "value": 3}, {"name": "Rank 4", "value": 4}, {"name": "Rank 5", "value": 5}]}'),

  restaurant: Restaurant.create(),
  selectedCategories: [],
  notification: Notification.create(),

  edit: false,
  showImageUploader: true,
  showCoverUploader: true,

  whenIdRestaurantIsLoaded: function(){
    var self = this;

    if(this.get('model.idRestaurant') == null){
      this.set('notification.visible', false);
      this.set('restaurant', Restaurant.create());
      this.set('restaurant.longitude', -80.21);
      this.set('restaurant.latitude', 25.77);
      this.set('selectedCategories', []);
      this.set('edit', false);
      this.set('showImageUploader', true);
      this.set('showCoverUploader', true);
    } else {
      this.set('edit', true);
      this.set('showImageUploader', false);
      this.set('showCoverUploader', false);
    }

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

  validateInput: function(){
    var self = this;

    //Check restaurant name
    if(this.get('restaurant.restaurantName') == null || this.get('restaurant.restaurantName') == ""){
      //Display notification
      self.set('notification.visible', true);
      self.set('notification.classStyle', 'alert-danger');
      self.set('notification.text', 'Restaurant name field is empty!');

      return false;
    }

    //Check price range
    if(this.get('restaurant.priceRange') == null || this.get('restaurant.priceRange') == ""){
      //Display notification
      self.set('notification.visible', true);
      self.set('notification.classStyle', 'alert-danger');
      self.set('notification.text', 'Price range field is empty!');

      return false;
    }

    //Check location
    if(this.get('restaurant.location') == null || this.get('restaurant.location') == ""){
      //Display notification
      self.set('notification.visible', true);
      self.set('notification.classStyle', 'alert-danger');
      self.set('notification.text', 'Location field is empty!');

      return false;
    }

    //Check categories
    if(this.get('selectedCategories').length == 0){
      //Display notification
      self.set('notification.visible', true);
      self.set('notification.classStyle', 'alert-danger');
      self.set('notification.text', 'No category is selected!');

      return false;
    }

    return true;
  },

  actions: {
    showImageUploader: function(){
      this.set('showImageUploader', true);
    },
    showCoverUploader: function(){
       this.set('showCoverUploader', true);
    },

    addedFileLogo: function(file, res){
      //Set logo name
      console.log("Logo je dodan");
      this.set('restaurant.imageFileName', res);
    },
    addedFileCover: function(file, res){
      console.log("Cover je dodan");
      this.set('restaurant.coverFileName', res);
    },

    resetDataOnExit: function(){
      this.set('notification.visible', false);
      //Empty restaurants var
      this.set('restaurant', Restaurant.create());
    },

    addItem: function(){
      var self = this;

      if(this.get('restaurant.imageFileName') == null){
        this.set('restaurant.imageFileName', 'assets/images/restaurant_logo.jpg');
      }

      if(this.get('restaurant.coverFileName') == null){
        this.set('restaurant.coverFileName', 'assets/images/restaurant_cover.jpg');
      }

      //Insert categories id's in database
      var tempCategories = this.get('selectedCategories');
      var tempCategoriesIdsArray = Array();
      for (var i = 0; i < tempCategories.length; i++) {
        tempCategoriesIdsArray.push(tempCategories[i].id);
      }
      this.set('restaurant.categories', tempCategoriesIdsArray);

      //Display restaurant data
      console.log(JSON.stringify(this.get('restaurant')));

      //Call validation function
      if(!this.validateInput()) return false;

      //Check description
      if(this.get('restaurant.description') == null){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'Restaurant description field is empty!');

        return false;
      }

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
        self.set('notification.text', 'Successful insert!');

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

      //Call validation function
      if(!this.validateInput()) return false;

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
        self.set('notification.text', 'Successful update!');
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
