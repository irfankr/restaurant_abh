define('restaurant-abh/controllers/register', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      register: function register() {
        //Get values from form
        var email = this.get('email');
        var password = this.get('password');

        //Call login service
        this.get("loginservice").checkUser(email, password);
      }
    }
  });
});