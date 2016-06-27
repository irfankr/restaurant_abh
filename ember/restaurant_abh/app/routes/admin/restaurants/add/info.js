import Ember from 'ember';
import Location from '../../../../models/location';
import Notification from '../../../../models/notification';

export default Ember.Route.extend({
  location: Location.create(),
  notification: Notification.create(),
  idRestaurant: null,
  displayAdditionalOptions: false,

  exit: function(){
    this.set('notification.visible', false);
    this.set('idRestaurant', null);
    this.set('displayAdditionalOptions', null);
  },
  actions: {
    setIdRestaurant: function(idRestaurant){
      var self = this;
      this.set('idRestaurant', idRestaurant);
      this.set('displayAdditionalOptions', true);
      this.transitionTo('admin.restaurants.add.info', idRestaurant);
      this.refresh();
    },
    cancel: function(){
      this.transitionTo('admin.restaurants');
    }
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

    //Check is add or edit
    if(param.id == 0){
      this.set('displayAdditionalOptions', false);
    } else {
      this.set('idRestaurant', param.id);
      this.set('displayAdditionalOptions', true);
    }

    //Return model to template
    return Ember.RSVP.hash({
      location: self.get('location'),
      notification: self.get('notification'),
      displayAdditionalOptions: self.get('displayAdditionalOptions'),
      idRestaurant: self.get('idRestaurant')
    });
  }
});
