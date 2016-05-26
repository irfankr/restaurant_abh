import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['restaurantbox'],
  restaurantbox: true,
  actions: {
    reservenow: function(){
      alert("irfan");
    }
  }
});
