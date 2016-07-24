import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Complete reservation',

  currentReservation: Ember.inject.service(),

  setupController: function(controller, model) {
    controller.send('loadPage');
  },

  resetController: function(controller, isExiting, transition) {
    var self = this;
    this._super.apply(this, arguments);

    if (isExiting) {
      controller.send('resetDataOnExit');
    }
  },

  model: function(){
    //Animate to top of the page
    $("html, body").animate({ scrollTop: 0 }, 500);
  }
});
