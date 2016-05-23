define('restaurant-abh/controllers/restaurants', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    currentuserservice: _ember['default'].inject.service()
  });
});