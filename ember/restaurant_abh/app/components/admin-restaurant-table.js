import Ember from 'ember';

export default Ember.Component.extend({
  editable: false,

  actions: {
    edit: function(){
      this.set('editable', true);
    },
    editItem: function(id){
      function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

      if(isNumeric(this.get('tableitem.sittingPlaces')) && this.get('tableitem.sittingPlaces') <= 30){
        this.set('editable', false);
        this.sendAction('editItem', id);
      }
    },
    deleteItem: function(id){
      this.sendAction('deleteItem', id);
    }
  }
});
