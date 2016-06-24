import Ember from 'ember';
import Location from '../../../models/location';

export default Ember.Route.extend({
  resetController: function(controller, isExiting, transition) {
    var self = this;
    this._super.apply(this, arguments);

    if (isExiting) {
      controller.send('resetDataOnExit');
    }
  }
});
