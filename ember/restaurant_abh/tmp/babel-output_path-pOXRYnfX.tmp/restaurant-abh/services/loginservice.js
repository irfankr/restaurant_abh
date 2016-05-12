define('restaurant-abh/services/loginservice', ['exports', 'ember', 'ember-data/model'], function (exports, _ember, _emberDataModel) {
  exports['default'] = _ember['default'].Service.extend({
    checkUser: function checkUser(email, password) {

      //Sent POST to Play route
      $.ajax({
        url: "/login",
        type: "POST",
        data: '{"email":"' + email + '","password":"' + password + '"}',
        processData: false,
        contentType: "application/json; charset=UTF-8",
        async: false
      }).done(function (data) {
        console.log(data);

        //Return user JSON
        return data;
      }).fail(function (data) {
        console.log(data);
      });
    }
  });
});