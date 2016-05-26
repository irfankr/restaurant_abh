import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['inlineStars'],
  inlineStars: true,
  currentUser: Ember.inject.service(),
  stars: function() {
    var numberOfFilledStars = this.get('value');
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
    voteRestaurant: function(restaurantId, starNumber){
      if(this.get('voteAllowed') == true && this.get('currentUser.userLoggedIn') == true){
        console.log("Broj restorana: " + restaurantId);
        console.log("Rb. zvijezde: " + starNumber);
      }
    }
  }
});
