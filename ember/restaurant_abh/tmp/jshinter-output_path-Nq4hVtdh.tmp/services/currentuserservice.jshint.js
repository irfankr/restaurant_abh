QUnit.module('JSHint - services/currentuserservice.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'services/currentuserservice.js should pass jshint.\nservices/currentuserservice.js: line 8, col 11, \'user\' is defined but never used.\nservices/currentuserservice.js: line 2, col 8, \'User\' is defined but never used.\n\n2 errors');
});
