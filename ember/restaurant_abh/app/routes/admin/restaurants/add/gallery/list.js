import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Gallery / Restaurants / Administration',

  idRestaurant: null,

  exit: function(){
    this.set('idRestaurant', null);
  },

  resetController: function(controller, isExiting, transition) {
    var self = this;
    this._super.apply(this, arguments);

    if (isExiting) {
      controller.send('resetDataOnExit');
    }
  },

  model: function(param){
    var self = this;
    this.set('idRestaurant', param.id);

    //Return model to template
    return Ember.RSVP.hash({
      idRestaurant: self.get('idRestaurant')
    });
  }
});
