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
    assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 1, col 26, Missing semicolon.\ncontrollers/login.js: line 32, col 7, \'stringHash\' is defined but never used.\ncontrollers/login.js: line 2, col 8, \'user\' is defined but never used.\n\n3 errors');
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
define('restaurant-abh/tests/routes/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass jshint.');
  });
});
define('restaurant-abh/tests/services/login-se-service.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/login-se-service.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/login-se-service.js should pass jshint.\nservices/login-se-service.js: line 6, col 15, \'user\' is defined but never used.\n\n1 error');
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
define('restaurant-abh/tests/unit/services/login-se-service-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:login-se-service', 'Unit | Service | login se service', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('restaurant-abh/tests/unit/services/login-se-service-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services/login-se-service-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/login-se-service-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('restaurant-abh/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map