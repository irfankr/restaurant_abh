define('restaurant-abh/services/login-se-service', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Service.extend({
    user_service: this.store.createRecord('user'),

    displayData: function displayData(user) {
      alert(this.get('user_service').get('Email'));
    }
  });
});