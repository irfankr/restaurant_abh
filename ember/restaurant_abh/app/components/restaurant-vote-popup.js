import Ember from 'ember';

export default Ember.Component.extend({
  filledStars: [[5, false], [4, false], [3, false], [2, false], [1, false]],
  description: null,
  mark: 0,
  actions: {
    vote: function(){
      this.sendAction('vote', this.get('mark'), this.get('description'));

      this.set('mark', 0);
      this.set('filledStars', [[5, false], [4, false], [3, false], [2, false], [1, false]]);
      this.set('description', null);
    },
    clickStar: function(mark){
      this.set('mark', mark);

      for(var i=4; i>=0; i--){
        if(i >= 5-this.get('mark')){
          this.set('filledStars.'+i+'.1', true);
        } else {
          this.set('filledStars.'+i+'.1', false);
        }
      }
    },
    cancelVote: function(){
      this.set('mark', 0);
      this.set('filledStars', [[5, false], [4, false], [3, false], [2, false], [1, false]]);
      this.set('description', null);
    }
  }
});
