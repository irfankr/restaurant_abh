import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    goToAddRoute: function(page){
      //Go to page to add restaurant
      this.get('router').transitionTo('admin.restaurants.add');
    }
  }
});
