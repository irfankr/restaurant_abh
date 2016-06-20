import Ember from 'ember';
import Filter from '../models/filter';

export default Ember.Route.extend({
  /*
    Ovim se zabranjivalo da se prikaze ova stranica ako nije ulogovan
    var self = this;
    if(this.get('userLoggedIn') == false){
      self.transitionTo('login');
    }
    */
  listRestaurants: null,
  listRestaurantsLocations: null,
  restaurantsPages: [],
  currentPageNumber: 1,
  itemsPerPage:6,
  filter: Filter.create(),
  categories: [],
  getRestaurants: function(){
    var self = this;

    //Set additional data
    this.set('filter.itemsPerPage', this.get('itemsPerPage'));
    this.set('filter.pageNumber', this.get('currentPageNumber'));
    var data = JSON.stringify(self.get('filter'));

    //Get number of pages for display restaurants
    $.ajax({ //No return here
      url: "/api/v1/getRestaurantsByFilter",
      type: "POST",
      data: data,
      processData: false,
      async:false, //Need to wait
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      //Set info about number of pages
      var numberOfPages = JSON.parse(data.numberOfRestaurantPages);
      self.set('restaurantsPages', []);
      for(var i = 1; i <= numberOfPages; i++){
        self.get('restaurantsPages').push(i);
      }

      //Set restaurants
      self.set('listRestaurants', data.restaurants);

    });
  },

  activePaginationNumber: function() {
    alert(this.get('currentPage'));
    alert(this.get('currentPageNumber'));
    return this.get('currentPage') === this.get('currentPageNumber');
  }.property('currentPage'),

  init(){
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
        self.set('listRestaurantsLocations', data);
      });

    });
  },

  model: function(param){
    var self = this;

    if(param.pageNumber != null){
      //Set page number from url
      this.set('currentPageNumber', param.pageNumber);
    }

    //Get all restaurants
    this.getRestaurants();

    //Return model to template
    return Ember.RSVP.hash({
      listRestaurants: self.get('listRestaurants'),
      listRestaurantsLocations: self.get('listRestaurantsLocations'),
      restaurantsPages: self.get('restaurantsPages'),
      currentPageNumber: self.get('currentPageNumber'),
      filter: self.get('filter'),
      categories: self.get('categories')
    });
  },

  actions: {
    changePage: function(pageNumber){
      //Change page variable
      this.set('currentPageNumber', pageNumber);

      //Refresh list of restaurants on page
      this.getRestaurants();
      this.refresh();

      //Scroll to top
      $("html, body").animate({ scrollTop: 0 }, 500);

      //Set CSS active state
      $(".pagination li").removeClass("active");
      $("#pagination_" + pageNumber).addClass("active");

      //Go to route page
      this.transitionTo('restaurants', pageNumber);
    },

    clickDolar: function(value){
      //Check is activation or deactivation (if is clicked on same value then deactivate)
      if(this.get('filter.priceRange') == value){
        this.set('filter.priceRange', null);
      } else {
        this.set('filter.priceRange', value);
      }

      console.log(this.get('filter'));
    },

    clickStar: function(value){
      //Check is activation or deactivation (if is clicked on same value then deactivate)
      if(this.get('filter.mark') == value){
        this.set('filter.mark', null);
      } else {
        this.set('filter.mark', value);
      }

      console.log(this.get('filter'));
    },

    clickCategory: function(categoryId){
      function isValueInArray(array, value){
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) {
              return true;
            }
        }
        return false;
      }

      //Check is this in category already (if true remove)
      if(isValueInArray(this.get('filter.categories'), categoryId)){
        //Remove element from array
        var indexDeleteElement = this.get('filter.categories').indexOf(categoryId);
        if (indexDeleteElement > -1) {
            this.get('filter.categories').splice(indexDeleteElement, 1);
        }
      } else {
        this.get('filter.categories').pushObject(categoryId);
      }

      //Force template to change active category color
      this.set("filter.categories", this.get('filter.categories').sort().slice());

      //Test log
      console.log(this.get('filter'));
    },

    search: function(){
      this.getRestaurants();
      this.refresh();
      console.log("OVO JE PRETRAGA");
      console.log(this.get('filter'));
    }
  }
});
