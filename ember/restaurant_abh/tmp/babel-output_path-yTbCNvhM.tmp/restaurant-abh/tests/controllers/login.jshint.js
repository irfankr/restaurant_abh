define('restaurant-abh/tests/controllers/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 1, col 26, Missing semicolon.\ncontrollers/login.js: line 2, col 8, \'user\' is defined but never used.\n\n2 errors');
  });
});