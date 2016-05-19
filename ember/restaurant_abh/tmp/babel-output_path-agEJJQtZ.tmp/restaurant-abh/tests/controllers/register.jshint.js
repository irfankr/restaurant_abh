define('restaurant-abh/tests/controllers/register.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/register.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/register.js should pass jshint.\ncontrollers/register.js: line 19, col 157, \'country\' is not defined.\ncontrollers/register.js: line 19, col 178, \'city\' is not defined.\ncontrollers/register.js: line 23, col 18, \'$\' is not defined.\n\n3 errors');
  });
});