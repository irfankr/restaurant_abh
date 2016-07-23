import Ember from 'ember';
import Restaurant from '../models/restaurant';
import Filter from '../models/filter';

export default Ember.Controller.extend({
  filterSuggestion: Filter.create(),
  searchTextRestaurants: null, //List of suggested restaurants
  lastStringValue:null,


  getRestaurantsByFilter: function(){
    var self = this;

    if(self.get('model.filter.searchText') != "" && self.get('model.filter.searchText') != null && self.get('model.filter.searchText') != "undefined" && self.get('model.filter.searchText').length > 1 && self.get('lastStringValue') != self.get('model.filter.searchText')){

      //Set additional data
      this.set('filterSuggestion.itemsPerPage', 5);
      this.set('filterSuggestion.pageNumber', 1);
      this.set('filterSuggestion.searchText', self.get('model.filter.searchText'));
      var data = JSON.stringify(self.get('filterSuggestion'));

      //Search for restaurants with this filter
      $.ajax({ //No return here
        url: "/api/v1/admin/getFilteredRestaurants",
        type: "POST",
        data: data,
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        console.log(data.restaurants);
        self.set('searchTextRestaurants', data.restaurants);

        $(".suggestion_box_container").show();
        $(document).mouseup(function (e){
            var container = $(".suggestion_box_container");

            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                container.hide();

                //Set last string value
                self.set('lastStringValue', self.get('model.filter.searchText'));

                //Empty suggested list
                self.set('searchTextRestaurants', null);
            }
        });
      });

     } else {
      self.set('searchTextRestaurants', null);
     }

  }.observes('model.filter.searchText'),

  actions: {
    pickSuggestedRestaurant: function(string){
      //Put suggested value in search box (send value to route)
      this.send('setSuggestedValue', string);

      //Set last string value
      this.set('lastStringValue', string);

      //Empty suggested list
      this.set('searchTextRestaurants', null);
    }
  }
});
