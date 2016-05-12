define('restaurant-abh/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      login: function login() {
        //Get values from form
        var email = this.get('email');
        var password = this.get('password');

        //Define user object
        var kreirani_user = user.create({});
        user.set("Email", email);

        console.log(kreirani_user);
      }
    }
  });
});