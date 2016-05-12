define('restaurant-abh/tests/services/loginservice.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/loginservice.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/loginservice.js should pass jshint.\nservices/loginservice.js: line 8, col 5, \'$\' is not defined.\nservices/loginservice.js: line 2, col 8, \'user\' is defined but never used.\n\n2 errors');
  });
});