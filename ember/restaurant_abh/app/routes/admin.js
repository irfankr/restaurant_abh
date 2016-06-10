import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),
  beforeModel(transition) {
    if(this.get('currentUser.isAdmin') == false){
      alert("You are not allowed to access this feature!");
      transition.abort();
    }
  }
});
