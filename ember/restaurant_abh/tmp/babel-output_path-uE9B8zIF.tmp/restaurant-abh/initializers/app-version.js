define('restaurant-abh/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'restaurant-abh/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _restaurantAbhConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_restaurantAbhConfigEnvironment['default'].APP.name, _restaurantAbhConfigEnvironment['default'].APP.version)
  };
});