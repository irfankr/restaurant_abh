define('restaurant-abh/tests/routes/restaurants.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/restaurants.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/restaurants.js should pass jshint.');
  });
});