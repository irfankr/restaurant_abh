define('restaurant-abh/components/restaurant-star', ['exports', 'ember', 'restaurant-abh/models/restaurant'], function (exports, _ember, _restaurantAbhModelsRestaurant) {
  exports['default'] = _ember['default'].Component.extend({
    classNameBindings: ['inlineStars'],
    inlineStars: true,
    voted: false,
    currentUser: _ember['default'].inject.service(),
    restaurant: _restaurantAbhModelsRestaurant['default'].create(),
    stars: (function () {
      //Count how much is filled stars
      var numberOfFilledStars = Math.round(this.get('value') / this.get('votes'));
      var result = [];
      for (var i = 0; i < this.get('max'); i++) {
        var star = {
          isFilled: i < numberOfFilledStars,
          starNumber: i + 1 //Used to numerate star for voting
        };

        result.push(star);
      }
      return result;
    }).property('max', 'value'),
    actions: {
      voteRestaurant: function voteRestaurant(restaurantId, starNumber, model) {
        var self = this;
        if (this.get('voteAllowed') == true && this.get('currentUser.userLoggedIn') == true) {
          //Set values to restaurant object
          self.set('restaurant.id', restaurantId);
          self.set('restaurant.mark', starNumber); //Star number is mark

          //Test echo to console
          console.log("Broj restorana: " + restaurantId);
          console.log("Rb. zvijezde: " + starNumber);

          //Send POST to Play vote route
          $.ajax({
            url: "/api/v1/restaurantVote",
            type: "POST",
            data: JSON.stringify(this.get('restaurant')),
            processData: false,
            contentType: "application/json; charset=UTF-8"
          }).fail(function (data) {
            console.log(data);
          }).done(function (data) {
            console.log(data);

            //Set voted variable to true
            self.set('voted', true);
          });
        }
      }
    }
  });
});