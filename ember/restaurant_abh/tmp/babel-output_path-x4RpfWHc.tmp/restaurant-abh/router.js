define('restaurant-abh/router', ['exports', 'ember', 'restaurant-abh/config/environment'], function (exports, _ember, _restaurantAbhConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _restaurantAbhConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('login');
    this.route('restaurants');
    this.route('register');
    this.route('restaurant', { path: '/restaurant/:restaurantId' });
    this.route('completereservation');
    this.route('reservations');
  });

  exports['default'] = Router;
});