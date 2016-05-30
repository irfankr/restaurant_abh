define('restaurant-abh/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    currentUser: _ember['default'].inject.service()
  });
});