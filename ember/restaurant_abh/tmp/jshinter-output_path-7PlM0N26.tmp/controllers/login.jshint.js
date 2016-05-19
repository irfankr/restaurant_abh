QUnit.module('JSHint - controllers/login.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 24, col 11, \'$\' is not defined.\ncontrollers/login.js: line 26, col 11, \'$\' is not defined.\ncontrollers/login.js: line 29, col 11, \'$\' is not defined.\ncontrollers/login.js: line 31, col 11, \'$\' is not defined.\ncontrollers/login.js: line 40, col 15, \'$\' is not defined.\ncontrollers/login.js: line 42, col 15, \'$\' is not defined.\ncontrollers/login.js: line 44, col 15, \'$\' is not defined.\ncontrollers/login.js: line 2, col 8, \'User\' is defined but never used.\n\n8 errors');
});
