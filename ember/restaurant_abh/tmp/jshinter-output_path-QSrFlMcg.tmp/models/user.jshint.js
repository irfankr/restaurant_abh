QUnit.module('JSHint - models/user.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/user.js should pass jshint.\nmodels/user.js: line 3, col 1, Forgotten \'debugger\' statement?\n\n1 error');
});
