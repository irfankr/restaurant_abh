import Ember from 'ember';

export default Ember.Component.extend({
  observeSearchInput: function() {
    this.sendAction('searchTextChanged');
  }.observes("filter.searchText"),
  actions: {
    goToAddRoute: function(page){
      //Go to page to add restaurant
      this.get('router').transitionTo('admin.'+page+'.add');
    }
  }
});
