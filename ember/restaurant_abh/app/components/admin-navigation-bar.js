import Ember from 'ember';

export default Ember.Component.extend({
  widerSearchTextColumnStyle: '',
  onFilterTextChange: function() {
    //Wait 500ms second before applying the filter
    Ember.run.debounce(this, this.observeSearchInput, 500);
  }.observes('filter.searchText'),

  observeSearchInput: function() {
    if(this.get('filter.searchText') != ""){
      //this.set('widerSearchTextColumnStyle', 'wider_search_text_column_style');
      $('.administration_headline .input_column').stop().animate({ width:'200px'}, 300);
    } else {
      //this.set('widerSearchTextColumnStyle', '');
      $('.administration_headline .input_column').stop().animate({ width:'100px'}, 300);
    }
    this.sendAction('searchTextChanged');
  },
  actions: {
    goToAddRoute: function(page){
      //Go to page to add restaurant
      if(page == "restaurants"){
        this.get('router').transitionTo('admin.restaurants.add.info', 0);
      } else {
        this.get('router').transitionTo('admin.'+page+'.add');
      }
    }
  }
});
