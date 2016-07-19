import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Reset password',

  userCode: null,
  model: function(param){
    alert(param.userCode);
  }
});
