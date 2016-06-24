import Ember from 'ember';

export default Ember.Route.extend({
  idUser: null,

  model: function(param){
    var self = this;

    //Set user id
    this.set('idUser', param.id);

    //Scroll to top
    $("html, body").animate({ scrollTop: 0 }, 500);

    //Return model to template
    return Ember.RSVP.hash({
      idUser: self.get('idUser')
    });
  },
  resetController: function(controller, isExiting, transition) {
    var self = this;
    this._super.apply(this, arguments);

    if (isExiting) {
      controller.send('resetDataOnExit');
    }
  }
});
