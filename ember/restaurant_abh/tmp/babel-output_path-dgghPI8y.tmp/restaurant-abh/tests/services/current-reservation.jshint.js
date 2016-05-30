define('restaurant-abh/tests/services/current-reservation.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/current-reservation.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/current-reservation.js should pass jshint.\nservices/current-reservation.js: line 2, col 8, \'Reservation\' is defined but never used.\n\n1 error');
  });
});