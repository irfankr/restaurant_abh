define('restaurant-abh/controllers/register', ['exports', 'ember', 'restaurant-abh/models/user'], function (exports, _ember, _restaurantAbhModelsUser) {
  exports['default'] = _ember['default'].Controller.extend({

    actions: {
      register: function register() {
        //Get values from form
        var firstName = this.get('firstName');
        var lastName = this.get('lastName');
        var email = this.get('email');
        var phone = this.get('phone');
        var password = this.get('password');

        var country = "Testnadrzava";
        var city = "Testnigrad";

        var data = '{"firstName":"' + firstName + '","lastName":"' + lastName + '","email":"' + email + '","phone":"' + phone + '","password":"' + password + '","country":"' + country + '","city":"' + city + '"}';
        //console.log(data);

        //Sent POST to Play route
        return $.ajax({
          url: "/register",
          type: "POST",
          data: data,
          processData: false,
          contentType: "application/json; charset=UTF-8"
        }).fail(function (data) {
          console.log(data);
        }).then(function (data) {
          console.log(data);
          return _restaurantAbhModelsUser['default'].create(data);
        });
      }
    }
  });
});