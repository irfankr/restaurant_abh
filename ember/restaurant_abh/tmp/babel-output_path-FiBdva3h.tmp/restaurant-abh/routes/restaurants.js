define('restaurant-abh/routes/restaurants', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    loginservice: _ember['default'].inject.service(),
    currentuserservice: _ember['default'].inject.service(),
    userLoggedIn: _ember['default'].computed.alias('currentuserservice.userLoggedIn'),
    beforeModel: function beforeModel() {
      var self = this;
      if (this.get('userLoggedIn') == false) {
        self.transitionTo('login');
      }

      //console.log("Ispis iz route:" + this.get('currentuserservice.userFirstName'));
    }
  });
});