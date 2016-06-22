import Ember from 'ember';

export default Ember.Component.extend({
  isSelected: function(){
    return (this.get('activeLocation') == this.get('restaurantsLocation.location'));
  }.property("location", "activeLocation"),
  actions: {
    clickLocation: function(location, model){
      this.sendAction('clickLocation', location);
    }
  }
});
