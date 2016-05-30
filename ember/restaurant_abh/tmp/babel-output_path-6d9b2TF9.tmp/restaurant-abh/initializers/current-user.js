define('restaurant-abh/initializers/current-user', ['exports', 'restaurant-abh/models/user', 'restaurant-abh/services/current-user-service'], function (exports, _restaurantAbhModelsUser, _restaurantAbhServicesCurrentUserService) {
  exports.initialize = initialize;

  function initialize(application) {
    var self = this;
    // application.inject('route', 'foo', 'service:foo');

    //Start waiting for response from Play
    application.deferReadiness();

    return $.ajax({
      url: "/api/v1/currentUser",
      type: "GET",
      contentType: "application/json; charset=UTF-8"
    }).fail(function (data) {
      console.log(data);

      //Continue with app
      application.advanceReadiness();

      var servistest = _restaurantAbhServicesCurrentUserService['default'].create();
      application.register('service:current-user', servistest, { instantiate: false, singleton: true });

      //self.transitionTo('login');
    }).done(function (data) {
      //console.log(data);

      var servistest = _restaurantAbhServicesCurrentUserService['default'].create();
      var user = _restaurantAbhModelsUser['default'].create(data);

      //Insert user data in service
      servistest.setUser(user);

      //application.unregister('service:currentuserservice');
      //application.register('service:currentuserservice', servistest, {instantiate: false, singleton: true});
      application.register('service:current-user', servistest, { instantiate: false, singleton: true });

      //Inject service
      //application.inject('route', 'CurrentUser', 'service:current-user');

      //Continue with app
      application.advanceReadiness();

      //return User.create(data);
    });
  }

  exports['default'] = {
    initialize: initialize
  };
});