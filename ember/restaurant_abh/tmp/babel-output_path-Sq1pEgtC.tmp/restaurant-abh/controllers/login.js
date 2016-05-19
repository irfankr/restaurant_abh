define('restaurant-abh/controllers/login', ['exports', 'ember', 'ember-data/model'], function (exports, _ember, _emberDataModel) {
  exports['default'] = _ember['default'].Controller.extend({
    loginservice: _ember['default'].inject.service(),
    currentuserservice: _ember['default'].inject.service(),
    actions: {
      login: function login() {
        var self = this;

        //Get values from form
        var email = this.get('email');
        var password = this.get('password');

        //Call login service
        this.get("loginservice").checkUser(email, password).done(function (user) {
          console.log(user);
          //console.log("Email usera: " + user.get("email"));
        });

        //console.log("Email form input:" + email);
        //console.log("Password form input:" + password);
      }
    }
  });
});