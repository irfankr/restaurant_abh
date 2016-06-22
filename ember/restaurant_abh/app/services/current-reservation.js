import Ember from 'ember';
import Reservation from '../models/reservation';

export default Ember.Service.extend({
  people: null,
  hour: null,
  date: null,
  restaurandId: null,
  restaurantName: null,
  restaurantImageFilename: null,
  searchText: null,

  setReservation(reservation, restaurandId, restaurantName, restaurantImageFilename){
    this.set('people', reservation.get('people'));
    this.set('hour', reservation.get('hour'));
    this.set('date', reservation.get('date'));
    this.set('restaurandId', restaurandId);
    this.set('restaurantName', restaurantName);
    this.set('restaurantImageFilename', restaurantImageFilename);
    this.set('searchText', reservation.get('searchText'));
  },
  removeReservation(){
    this.set('people', null);
    this.set('hour', null);
    this.set('date', null);
    this.set('restaurandId', null);
    this.set('restaurantName', null);
    this.set('restaurantImageFilename', null);
    this.set('searchText', null);
  }
});
