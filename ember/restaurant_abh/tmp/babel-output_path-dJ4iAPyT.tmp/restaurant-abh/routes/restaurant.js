define('restaurant-abh/routes/restaurant', ['exports', 'ember', 'restaurant-abh/models/restaurant', 'restaurant-abh/models/restaurantmenu'], function (exports, _ember, _restaurantAbhModelsRestaurant, _restaurantAbhModelsRestaurantmenu) {
  exports['default'] = _ember['default'].Route.extend({
    restaurantId: null,
    restaurant: _restaurantAbhModelsRestaurant['default'].create(),
    currentUser: _ember['default'].inject.service(),
    restaurantDetails: null, //This is in return
    restaurantsStatsStyle: null,
    restaurantMenu: _restaurantAbhModelsRestaurantmenu['default'].create(),
    model: function model(param) {
      var self = this;

      //If logged set style that enable hover on stars for vote
      if (this.get('currentUser.userLoggedIn') == true) {
        this.set('restaurantsStatsStyle', 'statslogged');
      } else {
        this.set('restaurantsStatsStyle', 'stats');
      }

      //Put url id into restaurant object
      this.set('restaurantId', param.restaurantId);
      this.set('restaurant.id', param.restaurantId);

      //Convert object in JSON
      var data = JSON.stringify(this.get('restaurant'));

      //Ajax call to get restaurant details
      $.ajax({ //No return here
        url: "/api/v1/getRestaurantDetails",
        type: "POST",
        data: data,
        processData: false,
        async: false, //Need to wait
        contentType: "application/json; charset=UTF-8"
      }).fail(function (data) {
        console.log(data);
      }).then(function (data) {
        self.set('restaurantDetails', data);

        //Get menu for restaurant
        $.ajax({ //No return here
          url: "/api/v1/getRestaurantMenu",
          type: "POST",
          data: '{"idRestaurant":"' + param.restaurantId + '", "type":"Breakfast"}',
          processData: false,
          async: false, //Need to wait
          contentType: "application/json; charset=UTF-8"
        }).fail(function (data) {
          console.log(data);
        }).then(function (data) {
          self.set('restaurantMenu', data);
        });
      });
      //Return model to template
      return _ember['default'].RSVP.hash({
        restaurantDetails: self.get('restaurantDetails'),
        restaurantsStatsStyle: self.get('restaurantsStatsStyle'),
        restaurantMenu: self.get('restaurantMenu')
      });
    },
    actions: {
      showMenu: function showMenu(post) {
        var self = this;

        //Change style of clicked element
        $(".restaurant_menu_item_title a:link").removeClass("active");
        $(".menu_title_" + post).addClass("active");

        //Load new menu list
        $.ajax({ //No return here
          url: "/api/v1/getRestaurantMenu",
          type: "POST",
          data: '{"idRestaurant":"' + self.get('restaurantId') + '", "type":"' + post + '"}',
          processData: false,
          async: false, //Need to wait
          contentType: "application/json; charset=UTF-8"
        }).fail(function (data) {
          console.log(data);
        }).then(function (data) {
          console.log(data);
          self.set('model.restaurantMenu', data);
        });
      }
    }
  });
});