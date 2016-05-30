QUnit.module('JSHint - controllers/completereservation.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/completereservation.js should pass jshint.\ncontrollers/completereservation.js: line 21, col 40, Expected \'===\' and instead saw \'==\'.\ncontrollers/completereservation.js: line 22, col 24, \'t\' used out of scope.\ncontrollers/completereservation.js: line 30, col 29, Missing semicolon.\n\n3 errors');
});
