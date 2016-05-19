QUnit.module('JSHint - controllers/register.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/register.js should pass jshint.\ncontrollers/register.js: line 21, col 18, \'$\' is not defined.\ncontrollers/register.js: line 31, col 20, \'User\' is not defined.\n\n2 errors');
});
