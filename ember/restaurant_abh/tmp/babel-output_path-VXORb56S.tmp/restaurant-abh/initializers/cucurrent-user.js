define('restaurant-abh/initializers/cucurrent-user', ['exports'], function (exports) {
  exports.initialize = initialize;

  function initialize(application) {
    // application.inject('route', 'foo', 'service:foo');

    // application.deferReadiness();
    // application.advanceReadiness();

    // fetch current user
    // - inject if user exists;
    // - nista

  }

  exports['default'] = {
    name: 'cucurrent-user',
    initialize: initialize
  };
});