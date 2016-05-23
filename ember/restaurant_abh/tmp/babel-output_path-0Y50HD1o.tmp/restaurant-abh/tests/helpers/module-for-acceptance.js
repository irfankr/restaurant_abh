define('restaurant-abh/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'restaurant-abh/tests/helpers/start-app', 'restaurant-abh/tests/helpers/destroy-app'], function (exports, _qunit, _restaurantAbhTestsHelpersStartApp, _restaurantAbhTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _restaurantAbhTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _restaurantAbhTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});