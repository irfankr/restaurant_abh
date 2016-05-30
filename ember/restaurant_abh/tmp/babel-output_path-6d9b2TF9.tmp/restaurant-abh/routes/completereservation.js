define('restaurant-abh/routes/completereservation', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    currentReservation: _ember['default'].inject.service(),
    init: function init() {
      var self = this;

      //if(this.get('currentReservation.restaurantId') == null){
      //history.go(-1);
      //}
    }
  });
});