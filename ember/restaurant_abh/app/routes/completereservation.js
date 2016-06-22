import Ember from 'ember';

export default Ember.Route.extend({
  currentReservation: Ember.inject.service(),
  setupController: function(controller, model){
    this._super(controller, model);

    controller.set('remainingTime', '03:00');
  },
  model: function(){
    //Animate to top of the page
    $("html, body").animate({ scrollTop: 0 }, 500);
  }
});
