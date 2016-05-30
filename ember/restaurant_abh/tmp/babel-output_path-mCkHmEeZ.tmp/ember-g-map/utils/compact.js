define('ember-g-map/utils/compact', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = function (objectInstance) {
    var compactedObject = {};

    for (var key in objectInstance) {
      var value = objectInstance[key];

      if (_ember['default'].isPresent(value)) {
        compactedObject[key] = value;
      }
    }

    return compactedObject;
  };
});