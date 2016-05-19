define('restaurant-abh/tests/services/loginservice.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/loginservice.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/loginservice.js should pass jshint.\nservices/loginservice.js: line 8, col 12, \'$\' is not defined.\n\n1 error');
  });
});