QUnit.module('JSHint - controllers/login.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 8, col 11, \'password\' is defined but never used.\ncontrollers/login.js: line 11, col 27, \'user\' is not defined.\ncontrollers/login.js: line 14, col 7, \'user\' is not defined.\n\n3 errors');
});
