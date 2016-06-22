import Ember from 'ember';
import Reservation from '../models/reservation';

export default Ember.Component.extend({
  currentReservation: Ember.inject.service(),
  reservation: Reservation.create(),

  actions: {
    proceedToReservationComplete: function(time, restaurantId, restaurantName, restaurantImageFilename){
      //Set chosen time
      this.set('reservation', this.get('currentReservation'))
      this.set('reservation.hour', time);

      //Test echo reservation
      console.log(JSON.stringify(this.get('reservation')));

      //Add data about reservation to service
      this.get('currentReservation').setReservation(this.get('reservation'), restaurantId, restaurantName, restaurantImageFilename);

      this.sendAction('proceedToReservationComplete');
    }
  }
});
