define('restaurant-abh/tests/controllers/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 23, col 11, \'$\' is not defined.\ncontrollers/login.js: line 25, col 11, \'$\' is not defined.\ncontrollers/login.js: line 28, col 11, \'$\' is not defined.\ncontrollers/login.js: line 30, col 11, \'$\' is not defined.\ncontrollers/login.js: line 41, col 15, \'$\' is not defined.\ncontrollers/login.js: line 43, col 15, \'$\' is not defined.\ncontrollers/login.js: line 45, col 15, \'$\' is not defined.\n\n7 errors');
  });
});