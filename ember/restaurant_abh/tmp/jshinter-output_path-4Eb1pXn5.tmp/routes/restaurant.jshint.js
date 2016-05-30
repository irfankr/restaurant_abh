QUnit.module('JSHint - routes/restaurant.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/restaurant.js should pass jshint.\nroutes/restaurant.js: line 16, col 47, Expected \'===\' and instead saw \'==\'.\nroutes/restaurant.js: line 17, col 55, Missing semicolon.\nroutes/restaurant.js: line 19, col 49, Missing semicolon.\nroutes/restaurant.js: line 23, col 49, Missing semicolon.\nroutes/restaurant.js: line 30, col 5, \'$\' is not defined.\nroutes/restaurant.js: line 43, col 7, \'$\' is not defined.\n\n6 errors');
});
