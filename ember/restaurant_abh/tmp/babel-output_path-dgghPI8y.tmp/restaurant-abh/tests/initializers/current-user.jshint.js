define('restaurant-abh/tests/initializers/current-user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - initializers/current-user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'initializers/current-user.js should pass jshint.\ninitializers/current-user.js: line 5, col 7, \'self\' is defined but never used.\ninitializers/current-user.js: line 11, col 10, \'$\' is not defined.\n\n2 errors');
  });
});