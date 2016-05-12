define('restaurant-abh/models/user', ['exports', 'ember-data/model'], function (exports, _emberDataModel) {
  exports['default'] = _emberDataModel['default'].extend({
    Id: _emberDataModel['default'].attr('integer'),
    Email: _emberDataModel['default'].attr('string'),
    Password: _emberDataModel['default'].attr('string'),
    firstName: _emberDataModel['default'].attr('string'),
    lastName: _emberDataModel['default'].attr('string'),
    Role: _emberDataModel['default'].attr('string')
  });
});