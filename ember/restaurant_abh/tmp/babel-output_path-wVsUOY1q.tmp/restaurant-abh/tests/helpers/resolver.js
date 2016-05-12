define('restaurant-abh/tests/helpers/resolver', ['exports', 'restaurant-abh/resolver', 'restaurant-abh/config/environment'], function (exports, _restaurantAbhResolver, _restaurantAbhConfigEnvironment) {

  var resolver = _restaurantAbhResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _restaurantAbhConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _restaurantAbhConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});