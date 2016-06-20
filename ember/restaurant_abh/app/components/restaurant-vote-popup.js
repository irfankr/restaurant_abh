import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    vote: function(){
      this.sendAction('vote');
    }
  }
});
