import Ember from 'ember'
import user from 'ember-data/model';

export default Ember.Controller.extend({

    loginservice: Ember.inject.service(),
    currentuserservice: Ember.inject.service(),
    actions: {
      login: function(){
        var self = this;

        //Get values from form
        var email = this.get('email');
        var password = this.get('password');

        //Call login service
        this.get("loginservice").checkUser(email, password)
          .done(function(user) {
            console.log(user);
          });


        console.log("Email form input:" + email);
        console.log("Password form input:" + password);
      }
    }
});
