QUnit.module('JSHint - controllers/restaurant.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/restaurant.js should pass jshint.\ncontrollers/restaurant.js: line 13, col 26, The array literal notation [] is preferable.\ncontrollers/restaurant.js: line 20, col 11, \'date\' is already defined.\ncontrollers/restaurant.js: line 28, col 8, \'$\' is not defined.\ncontrollers/restaurant.js: line 29, col 8, \'$\' is not defined.\ncontrollers/restaurant.js: line 32, col 8, \'$\' is not defined.\ncontrollers/restaurant.js: line 50, col 9, \'$\' is not defined.\n\n6 errors');
});
