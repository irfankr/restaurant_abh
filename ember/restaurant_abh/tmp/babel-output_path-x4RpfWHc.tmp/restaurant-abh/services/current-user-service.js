define('restaurant-abh/services/current-user-service', ['exports', 'ember', 'restaurant-abh/models/user'], function (exports, _ember, _restaurantAbhModelsUser) {
  exports['default'] = _ember['default'].Service.extend({
    userLoggedIn: false,
    userId: null,
    userFirstName: null,
    setUser: function setUser(user) {
      console.log(user);
      this.set("userLoggedIn", true);
      //console.log(this.get('userLoggedIn'));
      this.set("userFirstName", user.get('firstName'));
    },
    init: function init() {
      console.log('Hello From Session Service');
    }
  });
});