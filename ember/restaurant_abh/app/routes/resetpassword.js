import Ember from 'ember';

export default Ember.Route.extend({
  userCode: null,
  model: function(param){
    alert(param.userCode);
  }
});
