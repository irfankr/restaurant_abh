QUnit.module('JSHint - controllers/login.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 8, col 11, \'email\' is defined but never used.\ncontrollers/login.js: line 9, col 11, \'password\' is defined but never used.\ncontrollers/login.js: line 11, col 11, \'temp_objekat\' is defined but never used.\ncontrollers/login.js: line 2, col 8, \'user\' is defined but never used.\n\n4 errors');
});
