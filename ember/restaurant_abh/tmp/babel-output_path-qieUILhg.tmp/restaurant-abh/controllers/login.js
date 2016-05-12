define('restaurant-abh/controllers/login', ['exports', 'ember', 'ember-data/model'], function (exports, _ember, _emberDataModel) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      login: function login() {
        //Get values from form
        var email = this.get('email');
        var password = this.get('password');

        var temp_objekat = this.store.createRecord('user');
      }
    }
  });
});