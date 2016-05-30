define('restaurant-abh/tests/routes/restaurants.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/restaurants.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/restaurants.js should pass jshint.\nroutes/restaurants.js: line 17, col 5, \'$\' is not defined.\nroutes/restaurants.js: line 29, col 7, \'$\' is not defined.\n\n2 errors');
  });
});