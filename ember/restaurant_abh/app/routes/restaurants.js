import Ember from 'ember';

export default Ember.Route.extend({
  loginservice: Ember.inject.service(),
  currentuserservice: Ember.inject.service(),
  userLoggedIn: Ember.computed.alias('currentuserservice.userLoggedIn'),
  beforeModel: function() {
    var self = this;
    if(this.get('userLoggedIn') == false){
      self.transitionTo('login');
    }
  }
});
