define('restaurant-abh/tests/helpers/start-app', ['exports', 'ember', 'restaurant-abh/app', 'restaurant-abh/config/environment'], function (exports, _ember, _restaurantAbhApp, _restaurantAbhConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _restaurantAbhConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _restaurantAbhApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});