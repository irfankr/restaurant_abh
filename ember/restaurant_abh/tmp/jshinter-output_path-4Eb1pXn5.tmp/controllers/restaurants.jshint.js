QUnit.module('JSHint - controllers/restaurants.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/restaurants.js should pass jshint.\ncontrollers/restaurants.js: line 2, col 8, \'Restaurant\' is defined but never used.\n\n1 error');
});
