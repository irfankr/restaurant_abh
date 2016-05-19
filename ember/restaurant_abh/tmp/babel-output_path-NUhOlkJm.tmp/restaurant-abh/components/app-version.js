define('restaurant-abh/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'restaurant-abh/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _restaurantAbhConfigEnvironment) {

  var name = _restaurantAbhConfigEnvironment['default'].APP.name;
  var version = _restaurantAbhConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});