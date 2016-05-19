define('restaurant-abh/tests/initializers/cucurrent-user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - initializers/cucurrent-user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'initializers/cucurrent-user.js should pass jshint.\ninitializers/cucurrent-user.js: line 1, col 28, \'application\' is defined but never used.\n\n1 error');
  });
});