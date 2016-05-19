QUnit.module('JSHint - routes/restaurants.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/restaurants.js should pass jshint.\nroutes/restaurants.js: line 9, col 35, Expected \'===\' and instead saw \'==\'.\n\n1 error');
});
