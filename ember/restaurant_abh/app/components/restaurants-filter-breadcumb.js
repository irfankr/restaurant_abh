import Ember from 'ember';

export default Ember.Component.extend({
  categoriesString:null,

  displayBreadcrumb: function(){
    var self = this;

    if(
      (self.get('filterMark') != null && self.get('filterMark') != 'undefined') ||
      (self.get('filterPriceRange') != null && self.get('priceRange') != 'filterPriceRange') ||
      (self.get('filterLocation') != null && self.get('filterLocation') != 'undefined') ||
      (self.get('filterSearchText') != null && self.get('filterSearchText') != 'undefined' && self.get('filterSearchText') != '') ||
      (self.get('filterCategories').length > 0)
    ){
      return true;
    } else {
      return false;
    }
  }.property('filterMark', 'filterPriceRange', 'filterLocation', 'filterSearchText', 'filterCategories'),

  displayRating: function(){ //Rating = Mark
    var self = this;

    if(this.get('filterMark') == 'undefined' || this.get('filterMark') == null){
      return false;
    } else {
      return true;
    }
  }.property('filterMark'),

  displayPriceRange: function(){
    var self = this;

    if(this.get('filterPriceRange') == 'undefined' || this.get('filterPriceRange') == null){
      return false;
    } else {
      return true;
    }
  }.property('filterPriceRange'),

  displayLocation: function(){
    var self = this;

    if(this.get('filterLocation') == 'undefined' || this.get('filterLocation') == null){
      return false;
    } else {
      return true;
    }
  }.property('filterLocation'),

  displaySearchText: function(){
    var self = this;

    if(this.get('filterSearchText') == 'undefined' || this.get('filterSearchText') == null || this.get('filterSearchText') == ""){
      return false;
    } else {
      return true;
    }
  }.property('filterSearchText'),

  displayCategories: function(){
    var self = this;

    //Loop through all selected categories for filter
    var categoriesString = "";
    for(var j=0; j < self.get('filterCategories').length; j++){

      //Loop through all categories
      for(var i=0; i < self.get('allCategories').length; i++){
        if(self.get('filterCategories')[j] == self.get('allCategories')[i].id){
          categoriesString += self.get('allCategories')[i].name;
            if(j < self.get('filterCategories').length-1)  categoriesString += ", ";
          break;
        }
      }
    }

    this.set('categoriesString', categoriesString);

    if(categoriesString == ""){
      return false;
    } else {
      return true;
    }
  }.property('filterCategories', 'allCategories'),
});
