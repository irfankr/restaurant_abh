import Ember from 'ember'
import user from 'ember-data/model';

export default Ember.Controller.extend({

    loginservice: Ember.inject.service(),
    currentuserservice: Ember.inject.service(),
    actions: {
      login: function(){
        //Get values from form
        var email = this.get('email');
        var password = this.get('password');

        //Call login service (NE ZNAM MOZE LI RESPONSE OVAKO)
        this.get("loginservice").checkUser(email, password, function(response){
          console.log("Odgovor" + response);
        });


        console.log("Email form input:" + email);
        console.log("Password form input:" + password);
      }
    }
});
