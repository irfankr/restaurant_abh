import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    edit: function(id){
      alert(id);
    },
    delete: function(id){
      alert(id);
    }
  }
});
