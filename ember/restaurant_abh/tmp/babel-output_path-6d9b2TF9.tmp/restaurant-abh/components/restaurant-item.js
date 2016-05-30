define('restaurant-abh/components/restaurant-item', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNameBindings: ['restaurantbox'],
    restaurantbox: true,
    actions: {
      reservenow: function reservenow() {
        alert("irfan");
      }
    }
  });
});