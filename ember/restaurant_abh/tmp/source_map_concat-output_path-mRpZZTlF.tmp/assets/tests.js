define('restaurant-abh/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('restaurant-abh/tests/controllers/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 24, col 11, \'$\' is not defined.\ncontrollers/login.js: line 26, col 11, \'$\' is not defined.\ncontrollers/login.js: line 29, col 11, \'$\' is not defined.\ncontrollers/login.js: line 31, col 11, \'$\' is not defined.\ncontrollers/login.js: line 40, col 15, \'$\' is not defined.\ncontrollers/login.js: line 42, col 15, \'$\' is not defined.\ncontrollers/login.js: line 44, col 15, \'$\' is not defined.\ncontrollers/login.js: line 2, col 8, \'User\' is defined but never used.\n\n8 errors');
  });
});
define('restaurant-abh/tests/controllers/register.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/register.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/register.js should pass jshint.\ncontrollers/register.js: line 35, col 44, Expected \'!==\' and instead saw \'!=\'.\ncontrollers/register.js: line 23, col 13, \'$\' is not defined.\ncontrollers/register.js: line 25, col 13, \'$\' is not defined.\ncontrollers/register.js: line 27, col 13, \'$\' is not defined.\ncontrollers/register.js: line 30, col 13, \'$\' is not defined.\ncontrollers/register.js: line 32, col 13, \'$\' is not defined.\ncontrollers/register.js: line 34, col 13, \'$\' is not defined.\ncontrollers/register.js: line 37, col 13, \'$\' is not defined.\ncontrollers/register.js: line 39, col 13, \'$\' is not defined.\ncontrollers/register.js: line 41, col 13, \'$\' is not defined.\ncontrollers/register.js: line 49, col 13, \'$\' is not defined.\ncontrollers/register.js: line 51, col 13, \'$\' is not defined.\ncontrollers/register.js: line 53, col 13, \'$\' is not defined.\ncontrollers/register.js: line 58, col 20, \'$\' is not defined.\n\n14 errors');
  });
});
define('restaurant-abh/tests/controllers/restaurants.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/restaurants.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/restaurants.js should pass jshint.');
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
define('restaurant-abh/tests/initializers/cucurrent-user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - initializers/cucurrent-user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'initializers/cucurrent-user.js should pass jshint.\ninitializers/cucurrent-user.js: line 4, col 7, \'self\' is defined but never used.\ninitializers/cucurrent-user.js: line 15, col 10, \'$\' is not defined.\ninitializers/cucurrent-user.js: line 1, col 8, \'User\' is defined but never used.\n\n3 errors');
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
define('restaurant-abh/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
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
define('restaurant-abh/tests/routes/restaurants.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/restaurants.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/restaurants.js should pass jshint.\nroutes/restaurants.js: line 9, col 35, Expected \'===\' and instead saw \'==\'.\n\n1 error');
  });
});
define('restaurant-abh/tests/services/currentuserservice.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/currentuserservice.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/currentuserservice.js should pass jshint.\nservices/currentuserservice.js: line 2, col 8, \'User\' is defined but never used.\n\n1 error');
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