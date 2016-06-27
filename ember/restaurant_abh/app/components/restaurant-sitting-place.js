import Ember from 'ember';

export default Ember.Component.extend({
  sittingPlaces: function() {
      //Count how much is filled stars
      var result = [];
      for (var i = 0; i < this.get('value'); i++) {
        result.push(i);
      }
      return result;
    }.property('value')
});
