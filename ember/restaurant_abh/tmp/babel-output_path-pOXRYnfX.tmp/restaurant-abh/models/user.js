define('restaurant-abh/models/user', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  exports['default'] = _emberDataModel['default'].extend({
    id: (0, _emberDataAttr['default'])(),
    email: (0, _emberDataAttr['default'])(),
    password: (0, _emberDataAttr['default'])(),
    firstName: (0, _emberDataAttr['default'])(),
    lastName: (0, _emberDataAttr['default'])(),
    role: (0, _emberDataAttr['default'])()
  });
});