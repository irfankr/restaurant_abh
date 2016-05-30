define('restaurant-abh/tests/models/restaurant.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/restaurant.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/restaurant.js should pass jshint.');
  });
});