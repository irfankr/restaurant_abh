define('restaurant-abh/tests/routes/restaurant.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/restaurant.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/restaurant.js should pass jshint.');
  });
});