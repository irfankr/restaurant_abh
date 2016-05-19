define('restaurant-abh/controllers/login', ['exports', 'ember', 'restaurant-abh/models/user'], function (exports, _ember, _restaurantAbhModelsUser) {
  exports['default'] = _ember['default'].Controller.extend({
    loginservice: _ember['default'].inject.service(),
    currentuserservice: _ember['default'].inject.service(),
    userLoggedIn: _ember['default'].computed.alias('currentuserservice.userLoggedIn'),
    actions: {
      login: function login() {
        var self = this;

        //Get values from form
        var email = this.get('email');
        var password = this.get('password');

        //Call login service
        this.get("loginservice").checkUser(email, password).done(function (user) {
          //Set that user is logged in
          self.get("currentuserservice").setUser(user);

          self.transitionToRoute('restaurants');
        });

        //console.log("Email form input:" + email);
        //console.log("Password form input:" + password);
      }
    }
  });
});