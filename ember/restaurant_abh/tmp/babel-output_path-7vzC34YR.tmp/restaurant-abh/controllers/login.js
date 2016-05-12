define('restaurant-abh/controllers/login', ['exports', 'ember', 'ember-data/model'], function (exports, _ember, _emberDataModel) {
  exports['default'] = _ember['default'].Controller.extend({
    //loginService: Ember.inject.service(),

    /*
    currentUser: Ember.inject.service(),
      actions: {
        add(){
          this.get("currentTeam").add(this.get("model"))
        },
        remove(){
          this.get("currentTeam").remove(this.get("model"))
        }
      }
      */

    actions: {
      login: function login() {
        //Get values from form
        var email = this.get('email');
        var password = this.get('password');

        //Create user object
        var temp_objekat = this.store.createRecord('user');
        temp_objekat.set('Email', email);
        temp_objekat.set('Password', password);

        //Create JSON from this object
        var hash = temp_objekat.getProperties('Email', 'Password'),
            stringHash = JSON.stringify(hash);

        /*
        var temp_objekat = this.store.createRecord('user');
        temp_objekat.set('Email', email);
         //console.log(temp_objekat);
         var output = '';
        for (var property in temp_objekat) {
          output += property + ': ' + object[property]+'; ';
        }
        alert(output);
         // {{#if isLoggedIn}}
        //  {{currentUser.fullName}}
        // {{else}}
        //   Login
         // current-user property currentUser
         // promise
        //
        //this.get('loginService').login(email, password)
          //.done(function(userProperties) {
            //var user = this.store.createRecord('user', userProperties);
             //this.get('currentUser').setCurrentUser(user):
          //});
        */

        alert(email);
        alert(password);
      }
    }
  });
});