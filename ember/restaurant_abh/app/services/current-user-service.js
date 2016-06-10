import Ember from 'ember';
import User from '../models/user';

export default Ember.Service.extend({
  userLoggedIn:false,
  userId:null,
  userFirstName:null,
  isAdmin:false,
  setUser(user){
    console.log(user);
    this.set("userLoggedIn", true);
    //console.log(this.get('userLoggedIn'));
    this.set("userFirstName", user.get('firstName'));

    //HARDCODED is user admin
    if(user.get('id') == "3000"){
       this.set("isAdmin", true);
    }
  },
  init: function() {
    console.log('Hello From Session Service');
  }
});
