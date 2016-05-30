QUnit.module('JSHint - routes/index.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 10, col 5, \'$\' is not defined.\nroutes/index.js: line 22, col 7, \'$\' is not defined.\n\n2 errors');
});
