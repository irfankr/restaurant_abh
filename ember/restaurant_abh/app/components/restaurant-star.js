import Ember from 'ember';
import Restaurant from '../models/restaurant';

export default Ember.Component.extend({
  classNameBindings: ['inlineStars'],
  inlineStars: true,
  voted:false,
  currentUser: Ember.inject.service(),
  restaurant: Restaurant.create(),
  stars: function() {
    //Count how much is filled stars
    var numberOfFilledStars = Math.round(this.get('value') / this.get('votes'));
    var result = [];
    for (var i = 0; i < this.get('max'); i++) {
      var star = {
        isFilled: i < numberOfFilledStars,
        starNumber: i+1 //Used to numerate star for voting
      };

      result.push(star);
    }
    return result;
  }.property('max', 'value'),
  actions: {
    clickStar: function(restaurantId, starNumber, model){
      var self = this;

      if(this.get('filter') == true){
        this.sendAction('clickStar', starNumber);
      }
    }
  }
});
