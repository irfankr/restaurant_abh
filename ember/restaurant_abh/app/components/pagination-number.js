import Ember from 'ember';

export default Ember.Component.extend({
  checkIsActive: (function(){
    return this.get('currentActivePage') == this.get('itemNumber');
  }).property(""),
  actions: {
    changePage: function(pageNumber){
      this.sendAction('changePage', pageNumber);
    }
  }
});
