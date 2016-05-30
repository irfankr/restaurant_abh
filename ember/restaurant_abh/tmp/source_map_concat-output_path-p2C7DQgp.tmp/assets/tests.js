define('restaurant-abh/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('restaurant-abh/tests/components/navigation-bar.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/navigation-bar.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/navigation-bar.js should pass jshint.\ncomponents/navigation-bar.js: line 17, col 26, \'data\' is defined but never used.\ncomponents/navigation-bar.js: line 7, col 13, \'self\' is defined but never used.\ncomponents/navigation-bar.js: line 10, col 9, \'$\' is not defined.\n\n3 errors');
  });
});
define('restaurant-abh/tests/components/restaurant-item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/restaurant-item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/restaurant-item.js should pass jshint.');
  });
});
define('restaurant-abh/tests/components/restaurant-price-range.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/restaurant-price-range.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/restaurant-price-range.js should pass jshint.');
  });
});
define('restaurant-abh/tests/components/restaurant-star.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/restaurant-star.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/restaurant-star.js should pass jshint.\ncomponents/restaurant-star.js: line 27, col 36, Expected \'===\' and instead saw \'==\'.\ncomponents/restaurant-star.js: line 27, col 84, Expected \'===\' and instead saw \'==\'.\ncomponents/restaurant-star.js: line 25, col 56, \'model\' is defined but never used.\ncomponents/restaurant-star.js: line 37, col 9, \'$\' is not defined.\n\n4 errors');
  });
});
define('restaurant-abh/tests/controllers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });
});
define('restaurant-abh/tests/controllers/completereservation.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/completereservation.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/completereservation.js should pass jshint.\ncontrollers/completereservation.js: line 21, col 40, Expected \'===\' and instead saw \'==\'.\ncontrollers/completereservation.js: line 22, col 24, \'t\' used out of scope.\ncontrollers/completereservation.js: line 30, col 29, Missing semicolon.\n\n3 errors');
  });
});
define('restaurant-abh/tests/controllers/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass jshint.');
  });
});
define('restaurant-abh/tests/controllers/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 23, col 11, \'$\' is not defined.\ncontrollers/login.js: line 25, col 11, \'$\' is not defined.\ncontrollers/login.js: line 28, col 11, \'$\' is not defined.\ncontrollers/login.js: line 30, col 11, \'$\' is not defined.\ncontrollers/login.js: line 41, col 15, \'$\' is not defined.\ncontrollers/login.js: line 43, col 15, \'$\' is not defined.\ncontrollers/login.js: line 45, col 15, \'$\' is not defined.\n\n7 errors');
  });
});
define('restaurant-abh/tests/controllers/register.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/register.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/register.js should pass jshint.\ncontrollers/register.js: line 35, col 44, Expected \'!==\' and instead saw \'!=\'.\ncontrollers/register.js: line 78, col 41, Expected \'===\' and instead saw \'==\'.\ncontrollers/register.js: line 79, col 69, Missing semicolon.\ncontrollers/register.js: line 80, col 48, Expected \'===\' and instead saw \'==\'.\ncontrollers/register.js: line 81, col 71, Missing semicolon.\ncontrollers/register.js: line 82, col 48, Expected \'===\' and instead saw \'==\'.\ncontrollers/register.js: line 83, col 60, Missing semicolon.\ncontrollers/register.js: line 23, col 13, \'$\' is not defined.\ncontrollers/register.js: line 25, col 13, \'$\' is not defined.\ncontrollers/register.js: line 27, col 13, \'$\' is not defined.\ncontrollers/register.js: line 30, col 13, \'$\' is not defined.\ncontrollers/register.js: line 32, col 13, \'$\' is not defined.\ncontrollers/register.js: line 34, col 13, \'$\' is not defined.\ncontrollers/register.js: line 37, col 13, \'$\' is not defined.\ncontrollers/register.js: line 39, col 13, \'$\' is not defined.\ncontrollers/register.js: line 41, col 13, \'$\' is not defined.\ncontrollers/register.js: line 49, col 13, \'$\' is not defined.\ncontrollers/register.js: line 51, col 13, \'$\' is not defined.\ncontrollers/register.js: line 53, col 13, \'$\' is not defined.\ncontrollers/register.js: line 58, col 20, \'$\' is not defined.\n\n20 errors');
  });
});
define('restaurant-abh/tests/controllers/restaurant.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/restaurant.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/restaurant.js should pass jshint.\ncontrollers/restaurant.js: line 10, col 26, The array literal notation [] is preferable.\ncontrollers/restaurant.js: line 17, col 11, \'date\' is already defined.\ncontrollers/restaurant.js: line 25, col 8, \'$\' is not defined.\ncontrollers/restaurant.js: line 26, col 8, \'$\' is not defined.\ncontrollers/restaurant.js: line 29, col 8, \'$\' is not defined.\n\n5 errors');
  });
});
define('restaurant-abh/tests/controllers/restaurants.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/restaurants.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/restaurants.js should pass jshint.\ncontrollers/restaurants.js: line 2, col 8, \'Restaurant\' is defined but never used.\n\n1 error');
  });
});
define('restaurant-abh/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('restaurant-abh/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('restaurant-abh/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'restaurant-abh/tests/helpers/start-app', 'restaurant-abh/tests/helpers/destroy-app'], function (exports, _qunit, _restaurantAbhTestsHelpersStartApp, _restaurantAbhTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _restaurantAbhTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _restaurantAbhTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('restaurant-abh/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('restaurant-abh/tests/helpers/resolver', ['exports', 'restaurant-abh/resolver', 'restaurant-abh/config/environment'], function (exports, _restaurantAbhResolver, _restaurantAbhConfigEnvironment) {

  var resolver = _restaurantAbhResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _restaurantAbhConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _restaurantAbhConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('restaurant-abh/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('restaurant-abh/tests/helpers/start-app', ['exports', 'ember', 'restaurant-abh/app', 'restaurant-abh/config/environment'], function (exports, _ember, _restaurantAbhApp, _restaurantAbhConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _restaurantAbhConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _restaurantAbhApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('restaurant-abh/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('restaurant-abh/tests/initializers/current-user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - initializers/current-user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'initializers/current-user.js should pass jshint.\ninitializers/current-user.js: line 5, col 7, \'self\' is defined but never used.\ninitializers/current-user.js: line 11, col 10, \'$\' is not defined.\n\n2 errors');
  });
});
define('restaurant-abh/tests/integration/components/navigation-bar-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('navigation-bar', 'Integration | Component | navigation bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 18
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'navigation-bar', ['loc', [null, [1, 0], [1, 18]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.5.1',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'navigation-bar', [], [], 0, null, ['loc', [null, [2, 4], [4, 23]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('restaurant-abh/tests/integration/components/navigation-bar-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/navigation-bar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/navigation-bar-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/integration/components/restaurant-item-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('restaurant-item', 'Integration | Component | restaurant item', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 19
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'restaurant-item', ['loc', [null, [1, 0], [1, 19]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.5.1',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'restaurant-item', [], [], 0, null, ['loc', [null, [2, 4], [4, 24]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('restaurant-abh/tests/integration/components/restaurant-item-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/restaurant-item-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/restaurant-item-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/integration/components/restaurant-price-range-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('restaurant-price-range', 'Integration | Component | restaurant price range', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 26
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'restaurant-price-range', ['loc', [null, [1, 0], [1, 26]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.5.1',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'restaurant-price-range', [], [], 0, null, ['loc', [null, [2, 4], [4, 31]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('restaurant-abh/tests/integration/components/restaurant-price-range-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/restaurant-price-range-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/restaurant-price-range-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/integration/components/restaurant-star-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('restaurant-star', 'Integration | Component | restaurant star', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 19
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'restaurant-star', ['loc', [null, [1, 0], [1, 19]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.5.1',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.5.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'restaurant-star', [], [], 0, null, ['loc', [null, [2, 4], [4, 24]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('restaurant-abh/tests/integration/components/restaurant-star-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/restaurant-star-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/restaurant-star-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/models/restaurant.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/restaurant.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/restaurant.js should pass jshint.');
  });
});
define('restaurant-abh/tests/models/restaurantmenu.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/restaurantmenu.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/restaurantmenu.js should pass jshint.');
  });
});
define('restaurant-abh/tests/models/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass jshint.');
  });
});
define('restaurant-abh/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('restaurant-abh/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('restaurant-abh/tests/routes/completereservation.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/completereservation.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/completereservation.js should pass jshint.');
  });
});
define('restaurant-abh/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 10, col 5, \'$\' is not defined.\nroutes/index.js: line 22, col 7, \'$\' is not defined.\n\n2 errors');
  });
});
define('restaurant-abh/tests/routes/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass jshint.');
  });
});
define('restaurant-abh/tests/routes/register.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/register.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/register.js should pass jshint.');
  });
});
define('restaurant-abh/tests/routes/restaurant.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/restaurant.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/restaurant.js should pass jshint.\nroutes/restaurant.js: line 16, col 47, Expected \'===\' and instead saw \'==\'.\nroutes/restaurant.js: line 17, col 55, Missing semicolon.\nroutes/restaurant.js: line 19, col 49, Missing semicolon.\nroutes/restaurant.js: line 23, col 49, Missing semicolon.\nroutes/restaurant.js: line 64, col 4, Expected \'}\' to match \'{\' from line 5 and instead saw \'s\'.\nroutes/restaurant.js: line 65, col 1, Expected \')\' and instead saw \'}\'.\nroutes/restaurant.js: line 65, col 2, Missing semicolon.\nroutes/restaurant.js: line 65, col 2, Expected an identifier and instead saw \')\'.\nroutes/restaurant.js: line 65, col 2, Expected an assignment or function call and instead saw an expression.\nroutes/restaurant.js: line 30, col 5, \'$\' is not defined.\nroutes/restaurant.js: line 43, col 7, \'$\' is not defined.\n\n11 errors');
  });
});
define('restaurant-abh/tests/routes/restaurants.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/restaurants.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/restaurants.js should pass jshint.\nroutes/restaurants.js: line 17, col 5, \'$\' is not defined.\nroutes/restaurants.js: line 29, col 7, \'$\' is not defined.\n\n2 errors');
  });
});
define('restaurant-abh/tests/services/current-user-service.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/current-user-service.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/current-user-service.js should pass jshint.\nservices/current-user-service.js: line 2, col 8, \'User\' is defined but never used.\n\n1 error');
  });
});
define('restaurant-abh/tests/services/loginservice.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/loginservice.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/loginservice.js should pass jshint.\nservices/loginservice.js: line 8, col 12, \'$\' is not defined.\nservices/loginservice.js: line 16, col 7, \'$\' is not defined.\nservices/loginservice.js: line 18, col 7, \'$\' is not defined.\nservices/loginservice.js: line 20, col 7, \'$\' is not defined.\n\n4 errors');
  });
});
define('restaurant-abh/tests/test-helper', ['exports', 'restaurant-abh/tests/helpers/resolver', 'ember-qunit'], function (exports, _restaurantAbhTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_restaurantAbhTestsHelpersResolver['default']);
});
define('restaurant-abh/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/controllers/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:application', 'Unit | Controller | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('restaurant-abh/tests/unit/controllers/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/controllers/completereservation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:completereservation', 'Unit | Controller | completereservation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('restaurant-abh/tests/unit/controllers/completereservation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/completereservation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/completereservation-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/controllers/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:index', 'Unit | Controller | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('restaurant-abh/tests/unit/controllers/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/controllers/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:login', 'Unit | Controller | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('restaurant-abh/tests/unit/controllers/login-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/controllers/register-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:register', 'Unit | Controller | register', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('restaurant-abh/tests/unit/controllers/register-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/register-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/register-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/controllers/restaurant-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:restaurant', 'Unit | Controller | restaurant', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('restaurant-abh/tests/unit/controllers/restaurant-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/restaurant-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/restaurant-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/controllers/restaurants-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:restaurants', 'Unit | Controller | restaurants', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('restaurant-abh/tests/unit/controllers/restaurants-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/restaurants-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/restaurants-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/initializers/cucurrent-user-test', ['exports', 'ember', 'restaurant-abh/initializers/cucurrent-user', 'qunit'], function (exports, _ember, _restaurantAbhInitializersCucurrentUser, _qunit) {

  var application = undefined;

  (0, _qunit.module)('Unit | Initializer | cucurrent user', {
    beforeEach: function beforeEach() {
      _ember['default'].run(function () {
        application = _ember['default'].Application.create();
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _restaurantAbhInitializersCucurrentUser['default'].initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('restaurant-abh/tests/unit/initializers/cucurrent-user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/initializers/cucurrent-user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/cucurrent-user-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/models/restaurant-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('restaurant', 'Unit | Model | restaurant', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('restaurant-abh/tests/unit/models/restaurant-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/restaurant-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/restaurant-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/models/restaurantmenuitem-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('restaurantmenuitem', 'Unit | Model | restaurantmenuitem', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('restaurant-abh/tests/unit/models/restaurantmenuitem-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/restaurantmenuitem-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/restaurantmenuitem-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/models/user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('restaurant-abh/tests/unit/models/user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/user-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/routes/completereservation-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:completereservation', 'Unit | Route | completereservation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('restaurant-abh/tests/unit/routes/completereservation-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/completereservation-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/completereservation-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('restaurant-abh/tests/unit/routes/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/routes/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('restaurant-abh/tests/unit/routes/login-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/routes/register-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:register', 'Unit | Route | register', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('restaurant-abh/tests/unit/routes/register-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/register-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/register-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/routes/restaurant-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:restaurant', 'Unit | Route | restaurant', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('restaurant-abh/tests/unit/routes/restaurant-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/restaurant-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/restaurant-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/routes/restaurants-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:restaurants', 'Unit | Route | restaurants', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('restaurant-abh/tests/unit/routes/restaurants-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/restaurants-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/restaurants-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/services/curent-user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:curent-user', 'Unit | Service | curent user', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('restaurant-abh/tests/unit/services/curent-user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services/curent-user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/curent-user-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/services/current-user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:current-user', 'Unit | Service | current user', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('restaurant-abh/tests/unit/services/current-user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services/current-user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/current-user-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/services/currentuserservice-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:currentuserservice', 'Unit | Service | currentuserservice', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('restaurant-abh/tests/unit/services/currentuserservice-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services/currentuserservice-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/currentuserservice-test.js should pass jshint.');
  });
});
define('restaurant-abh/tests/unit/services/loginservice-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:loginservice', 'Unit | Service | loginservice', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('restaurant-abh/tests/unit/services/loginservice-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services/loginservice-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/loginservice-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('restaurant-abh/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map