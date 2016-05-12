define('restaurant-abh/models/user', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  exports['default'] = _emberDataModel['default'].extend({
    Id: (0, _emberDataAttr['default'])(),
    Email: (0, _emberDataAttr['default'])(),
    Password: (0, _emberDataAttr['default'])(),
    firstName: (0, _emberDataAttr['default'])(),
    lastName: (0, _emberDataAttr['default'])(),
    Role: (0, _emberDataAttr['default'])()
  });
});