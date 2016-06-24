import Ember from 'ember';

export default Ember.Component.extend({
  editable: false,
  actions: {
    edit: function(){
      this.set('editable', true);
    },
    saveEdit: function(){
      console.log('Cuvanje izmjene');
      this.set('editable', false);
    },
    deleteItem: function(id){
      this.sendAction('deleteItem', id);
    }
  }
});
