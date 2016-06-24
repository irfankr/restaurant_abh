import Ember from 'ember';

export default Ember.Component.extend({
  observeSearchInput: function() {
    this.sendAction('searchTextChanged');
  }.observes("filter.searchText"),
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
