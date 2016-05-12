define('restaurant-abh/tests/services/login-se-service.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/login-se-service.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/login-se-service.js should pass jshint.\nservices/login-se-service.js: line 6, col 15, \'user\' is defined but never used.\n\n1 error');
  });
});