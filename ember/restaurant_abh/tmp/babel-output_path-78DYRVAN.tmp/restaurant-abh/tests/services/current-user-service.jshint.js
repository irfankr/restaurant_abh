define('restaurant-abh/tests/services/current-user-service.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/current-user-service.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/current-user-service.js should pass jshint.\nservices/current-user-service.js: line 2, col 8, \'User\' is defined but never used.\n\n1 error');
  });
});