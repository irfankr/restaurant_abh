import Ember from 'ember';


export default Ember.Route.extend({
  titleToken: 'Reset password',
  tokenString: null,

  model: function(param){
    var self = this;

    self.set('tokenString', param.userCode);

    //Return model to template
    return Ember.RSVP.hash({
      tokenString: self.get('tokenString')
    });
  }
});
