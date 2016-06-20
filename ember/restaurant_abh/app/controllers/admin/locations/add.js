import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    add: function(){
      var self = this;
      alert("Dodaj");
    },
    cancel: function(){
      this.transitionToRoute('admin.locations');
    }
  }
});
