define('restaurant-abh/tests/components/navigation-bar.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/navigation-bar.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/navigation-bar.js should pass jshint.\ncomponents/navigation-bar.js: line 17, col 26, \'data\' is defined but never used.\ncomponents/navigation-bar.js: line 7, col 13, \'self\' is defined but never used.\ncomponents/navigation-bar.js: line 10, col 9, \'$\' is not defined.\n\n3 errors');
  });
});