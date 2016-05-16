import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
        register: function(){
          //Get values from form
          var email = this.get('email');
          var password = this.get('password');

          //Call login service
          this.get("loginservice").checkUser(email, password);
        }
      }
});
