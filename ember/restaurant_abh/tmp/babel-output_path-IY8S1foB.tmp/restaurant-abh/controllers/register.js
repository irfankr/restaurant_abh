define('restaurant-abh/controllers/register', ['exports', 'ember', 'restaurant-abh/models/user'], function (exports, _ember, _restaurantAbhModelsUser) {
  exports['default'] = _ember['default'].Controller.extend({
    countries: ['Bosnia and Herzegovina', 'Serbia', 'Croatia'],
    cities: ['Sarajevo', 'Belgrade', 'Zagreb'],
    user: _restaurantAbhModelsUser['default'].create(),
    actions: {
      register: function register() {
        var self = this;

        function isValidEmailAddress(emailAddress) {
          var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
          return pattern.test(emailAddress);
        }

        var user = this.get('user');

        //Check all fields required
        if (user.get('firstName') == null || user.get('lastName') == null || user.get('email') == null || user.get('phone') == null || user.get('password') == null || user.get('city') == null || user.get('country') == null) {
          //Display alert
          $(".registerNotifications").show();
          //Change alert class
          $(".alert").addClass('alert-danger').removeClass('alert-success');
          //Set alert text
          $(".alertText").html('<strong>Warning!</strong> All fields are required.');
        } else if (!isValidEmailAddress(user.get('email'))) {
          //Display alert
          $(".registerNotifications").show();
          //Change alert class
          $(".alert").addClass('alert-danger').removeClass('alert-success');
          //Set alert text
          $(".alertText").html('<strong>Warning!</strong> Email is not valid.');
        } else if (user.get('password') != user.get('confirmpassword')) {
          //Display alert
          $(".registerNotifications").show();
          //Change alert class
          $(".alert").addClass('alert-danger').removeClass('alert-success');
          //Set alert text
          $(".alertText").html('<strong>Warning!</strong> Password and Confirm password don\'t match.');
        } else {
          //var data = '{"firstName":"'+firstName+'","lastName":"'+lastName+'","email":"'+email+'","phone":"'+phone+'","password":"'+password+'","country":"'+country+'","city":"'+city+'"}';

          var data = JSON.stringify(this.get('user'));
          console.log(data);

          //Display successfull notification
          $(".registerNotifications").show();
          //Change alert class
          $(".alert").addClass('alert-success').removeClass('alert-danger');
          //Set alert text
          $(".alertText").html('<strong>Success!</strong> User is registered. You will be redirected to login page in 2s');

          setTimeout(function () {
            self.transitionToRoute('login');
          }, 3000);

          //Sent POST to Play route
          return $.ajax({
            url: "/api/v1/register",
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
    }
  });
});