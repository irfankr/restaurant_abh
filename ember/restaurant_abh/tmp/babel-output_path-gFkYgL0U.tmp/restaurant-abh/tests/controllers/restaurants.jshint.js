define('restaurant-abh/tests/controllers/restaurants.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/restaurants.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/restaurants.js should pass jshint.');
  });
});