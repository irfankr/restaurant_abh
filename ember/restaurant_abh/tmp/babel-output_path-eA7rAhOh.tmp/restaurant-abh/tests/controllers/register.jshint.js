define('restaurant-abh/tests/controllers/register.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/register.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/register.js should pass jshint.\ncontrollers/register.js: line 35, col 44, Expected \'!==\' and instead saw \'!=\'.\ncontrollers/register.js: line 23, col 13, \'$\' is not defined.\ncontrollers/register.js: line 25, col 13, \'$\' is not defined.\ncontrollers/register.js: line 27, col 13, \'$\' is not defined.\ncontrollers/register.js: line 30, col 13, \'$\' is not defined.\ncontrollers/register.js: line 32, col 13, \'$\' is not defined.\ncontrollers/register.js: line 34, col 13, \'$\' is not defined.\ncontrollers/register.js: line 37, col 13, \'$\' is not defined.\ncontrollers/register.js: line 39, col 13, \'$\' is not defined.\ncontrollers/register.js: line 41, col 13, \'$\' is not defined.\ncontrollers/register.js: line 49, col 13, \'$\' is not defined.\ncontrollers/register.js: line 51, col 13, \'$\' is not defined.\ncontrollers/register.js: line 53, col 13, \'$\' is not defined.\ncontrollers/register.js: line 58, col 20, \'$\' is not defined.\n\n14 errors');
  });
});