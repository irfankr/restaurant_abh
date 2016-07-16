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

  locationBoundaryTop: null,
  locationBoundaryDown: null,
  locationBoundaryLeft: null,
  locationBoundaryRight: null,

  setLocationCoordinates: function(setCoordinates){
    var self = this;
    var locationName = null;

    //Set coordinates of location when location is changed
    var locationId = this.get('restaurant.location');

    for(var i=0; i < self.get('locations').length; i++){
      if(self.get('locations')[i].id == locationId){
        locationName = self.get('locations')[i].name;
        break;
      }
    }
    console.log('IME LOKACIJE: ' + locationName + ", ID: " + locationId);
    //Get coordinates for that location
    $.ajax({ //No return here
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationName + "&key=AIzaSyDOBtNUVb3u39Vnu2xcEhxlS8pyozc4Gvs",
      type: "GET",
      processData: false,
      async:false, //Need to wait
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      console.log(data);

      //Set location boundaries
      self.set('locationBoundaryTop', data.results[0].geometry.bounds.northeast.lat);
      self.set('locationBoundaryRight', data.results[0].geometry.bounds.northeast.lng);
      self.set('locationBoundaryBottom', data.results[0].geometry.bounds.southwest.lat);
      self.set('locationBoundaryLeft', data.results[0].geometry.bounds.southwest.lng);

      if(setCoordinates){
        //Set current coorinates to location coordinates
        self.set('restaurant.longitude', data.results[0].geometry.location.lng);
        self.set('restaurant.latitude', data.results[0].geometry.location.lat);
      }
    });
  },

  markerPositionChanged: function(){
    var self = this;

    var lng = this.get('restaurant.longitude');
    var lat = this.get('restaurant.latitude');

    var boundTop = this.get('locationBoundaryTop');
    var boundLeft = this.get('locationBoundaryLeft');
    var boundBottom = this.get('locationBoundaryBottom');
    var boundRight = this.get('locationBoundaryRight');

    if(lng != 0 && lat != 0){
        //Check is marker out of bounds
        if(lat > boundTop || lat < boundBottom || lng <  boundLeft || lng > boundRight){
          //Display notification
          self.set('notification.visible', true);
          self.set('notification.classStyle', 'alert-danger');
          self.set('notification.text', 'Marker position is not in selected location');

          //Reset location select
          self.set('restaurant.location', null);

          //Reset boundares
          self.set('locationBoundaryTop', null);
          self.set('locationBoundaryDown', null);
          self.set('locationBoundaryLeft', null);
          self.set('locationBoundaryRight', null);

        } else {
          //Hide notification
          self.set('notification.visible', false);
        }
    }

  },

  whenIdRestaurantIsLoaded: function(){
    var self = this;

    if(this.get('model.idRestaurant') == null){
      this.set('notification.visible', false);
      this.set('restaurant', Restaurant.create());
      this.set('restaurant.longitude', 0);
      this.set('restaurant.latitude', 0);
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
        url: "/api/v1/admin/getFilteredLocations",
        type: "POST",
        data: '{"itemsPerPage":1000, "pageNumber":1}',
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        self.set('locations', data.locations);
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

        //Set coordinates
        self.setLocationCoordinates(false);

        //Dinamicaly add observer
        self.addObserver('restaurant.latitude', self, "markerPositionChanged");

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
    } else {
      //Dinamicaly add observer
      self.addObserver('restaurant.latitude', self, "markerPositionChanged");
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

      //Remove observer
      this.removeObserver('restaurant.latitude', self, "markerPositionChanged");

      //Empty restaurants var
      this.set('restaurant', Restaurant.create());

      //Reset boundares
      this.set('locationBoundaryTop', null);
      this.set('locationBoundaryDown', null);
      this.set('locationBoundaryLeft', null);
      this.set('locationBoundaryRight', null);
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
    },

    changeLocation: function(){
      this.setLocationCoordinates(true);
    }
  }
});
