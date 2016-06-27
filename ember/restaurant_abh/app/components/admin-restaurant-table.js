import Ember from 'ember';

export default Ember.Component.extend({
  editable: false,

  actions: {
    edit: function(){
      this.set('editable', true);
    },
    editItem: function(id){
      if(this.get('tableitem.sittingPlaces') != ''){
        this.set('editable', false);
        this.sendAction('editItem', id);
      }
    },
    deleteItem: function(id){
      this.sendAction('deleteItem', id);
    }
  }
});
