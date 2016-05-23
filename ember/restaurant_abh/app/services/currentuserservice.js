import Ember from 'ember';
import User from '../models/user';

export default Ember.Service.extend({
  userLoggedIn:false,
  userId:null,
  userFirstName:null,
  setUser(user){
    this.set("userLoggedIn", true);
    this.set("userFirstName", user.get("firstName"));
  },
  init: function() {
    console.log('Hello From Session Service');
  }
});
