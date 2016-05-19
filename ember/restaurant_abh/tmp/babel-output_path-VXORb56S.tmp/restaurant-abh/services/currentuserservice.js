define('restaurant-abh/services/currentuserservice', ['exports', 'ember', 'restaurant-abh/models/user'], function (exports, _ember, _restaurantAbhModelsUser) {
  exports['default'] = _ember['default'].Service.extend({
    userLoggedIn: false,
    userId: null,
    userFirstName: null,
    setUser: function setUser(user) {
      this.set("userLoggedIn", true);
      this.set("userFirstName", user.get("firstName"));
    }
  });
});