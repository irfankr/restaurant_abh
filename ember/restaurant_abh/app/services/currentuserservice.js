import Ember from 'ember';
import User from '../models/user';

export default Ember.Service.extend({
  userLoggedIn:false,
  userId:null,
  userFirstName:null,
  setUser(user){
    this.set("userLoggedIn", true);
  }
});
