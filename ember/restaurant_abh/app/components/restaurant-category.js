import Ember from 'ember';
import Filter from '../models/filter';

export default Ember.Component.extend({
  isSelected: function(){
    function isValueInArray(array, value){
      for (var i = 0; i < array.length; i++) {
          if (array[i] === value) {
            return true;
          }
      }
      return false;
    }
    if(isValueInArray(this.get('categoriesSelected'), this.get('categoryId'))){
      return true;
    } else {
      return false;
    }
  }.property("categoryId", "categoriesSelected"),
  actions: {
    clickCategory: function(categoryId, model){
      this.sendAction('clickCategory', categoryId);
    }
  }
});
