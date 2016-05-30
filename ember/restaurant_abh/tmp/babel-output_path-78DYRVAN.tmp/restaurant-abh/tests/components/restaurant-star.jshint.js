define('restaurant-abh/tests/components/restaurant-star.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/restaurant-star.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/restaurant-star.js should pass jshint.\ncomponents/restaurant-star.js: line 27, col 36, Expected \'===\' and instead saw \'==\'.\ncomponents/restaurant-star.js: line 27, col 84, Expected \'===\' and instead saw \'==\'.\ncomponents/restaurant-star.js: line 25, col 56, \'model\' is defined but never used.\ncomponents/restaurant-star.js: line 37, col 9, \'$\' is not defined.\n\n4 errors');
  });
});