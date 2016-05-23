QUnit.module('JSHint - initializers/cucurrent-user.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'initializers/cucurrent-user.js should pass jshint.\ninitializers/cucurrent-user.js: line 4, col 7, \'self\' is defined but never used.\ninitializers/cucurrent-user.js: line 15, col 10, \'$\' is not defined.\ninitializers/cucurrent-user.js: line 1, col 8, \'User\' is defined but never used.\n\n3 errors');
});
