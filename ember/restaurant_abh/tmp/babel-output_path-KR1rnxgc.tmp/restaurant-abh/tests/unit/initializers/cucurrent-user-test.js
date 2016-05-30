define('restaurant-abh/tests/unit/initializers/cucurrent-user-test', ['exports', 'ember', 'restaurant-abh/initializers/cucurrent-user', 'qunit'], function (exports, _ember, _restaurantAbhInitializersCucurrentUser, _qunit) {

  var application = undefined;

  (0, _qunit.module)('Unit | Initializer | cucurrent user', {
    beforeEach: function beforeEach() {
      _ember['default'].run(function () {
        application = _ember['default'].Application.create();
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _restaurantAbhInitializersCucurrentUser['default'].initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});