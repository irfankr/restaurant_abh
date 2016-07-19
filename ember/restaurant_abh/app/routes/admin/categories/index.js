import Ember from 'ember';
import Filter from '../../../models/filter';
import Notification from '../../../models/notification';

export default Ember.Route.extend({
  titleToken: 'Categories / Administration',

  listItems: null,
  itemPages: [],
  currentPageNumber: 1,
  itemsPerPage:20,
  filter: Filter.create(),
  notification: Notification.create(),

  exit: function(){
    this.set('notification.visible', false);
  },

  getItems: function(){
    var self = this;

    //Set additional data
    this.set('filter.itemsPerPage', this.get('itemsPerPage'));
    this.set('filter.pageNumber', this.get('currentPageNumber'));
    var data = JSON.stringify(self.get('filter'));

    $.ajax({ //No return here
      url: "/api/v1/admin/getFilteredCategories",
      type: "POST",
      data: data,
      processData: false,
      async:false, //Need to wait
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      //Set info about number of pages
      var numberOfPages = JSON.parse(data.numberOfPages);
      self.set('itemPages', []);
      for(var i = 1; i <= numberOfPages; i++){
        self.get('itemPages').push(i);
      }

      //Set fetched items
      self.set('listItems', data.categories);

    });
  },

  model: function(){
    var self = this;

    //Get all items
    this.getItems();

    //Scroll to top
    $("html, body").animate({ scrollTop: 0 }, 500);

    //Return model to template
    return Ember.RSVP.hash({
      listItems: self.get('listItems'),
      itemPages: self.get('itemPages'),
      filter: self.get('filter'),
      notification: self.get('notification')
    });
  },

  actions: {
    changePage: function(pageNumber){
      this.set('currentPageNumber', pageNumber);
      this.refresh();
    },
    editItem: function(id){
      this.transitionTo('admin.categories.edit', id);
    },
    deleteItem: function(id){
      var self = this;

      $.ajax({ //No return here
        url: "/api/v1/admin/deleteCategory",
        type: "POST",
        data: '{"id": '+id+'}',
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-success');
        self.set('notification.text', 'Successful remove!');
        self.refresh();
      });
    },
    searchTextChanged: function(){
      this.refresh();
    }
  }
});
