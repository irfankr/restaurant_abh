define('restaurant-abh/services/loginservice', ['exports', 'ember', 'restaurant-abh/models/user'], function (exports, _ember, _restaurantAbhModelsUser) {
  exports['default'] = _ember['default'].Service.extend({
    checkUser: function checkUser(email, password) {

      //Sent POST to Play route
      return $.ajax({
        url: "/login",
        type: "POST",
        data: '{"email":"' + email + '","password":"' + password + '"}',
        processData: false,
        contentType: "application/json; charset=UTF-8"
      }).fail(function (data) {
        console.log(data);
      }).then(function (data) {
        return _restaurantAbhModelsUser['default'].create(data);
      });
    }
  });
});