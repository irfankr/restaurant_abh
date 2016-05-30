define('restaurant-abh/services/current-reservation', ['exports', 'ember', 'restaurant-abh/models/reservation'], function (exports, _ember, _restaurantAbhModelsReservation) {
  exports['default'] = _ember['default'].Service.extend({
    people: null,
    hour: null,
    date: null,
    restaurandId: null,
    restaurantName: null,
    restaurantImageFilename: null,
    setReservation: function setReservation(reservation, restaurandId, restaurantName, restaurantImageFilename) {
      this.set('people', reservation.get('people'));
      this.set('hour', reservation.get('hour'));
      this.set('date', reservation.get('date'));
      this.set('restaurandId', restaurandId);
      this.set('restaurantName', restaurantName);
      this.set('restaurantImageFilename', restaurantImageFilename);
    },
    removeReservation: function removeReservation() {
      this.set('people', null);
      this.set('hour', null);
      this.set('date', null);
      this.set('restaurandId', null);
      this.set('restaurantName', null);
      this.set('restaurantImageFilename', null);
    }
  });
});