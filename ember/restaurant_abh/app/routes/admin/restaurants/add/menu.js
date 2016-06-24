import Ember from 'ember';
import Menuitem from '../../../../models/menuitem';
import Filter from '../../../../models/filter';

export default Ember.Route.extend({
  menuitems: Menuitem.create(),
  newMenuItem: Menuitem.create(),
  filter: Filter.create(),
  idRestaurant: null,

  getItems: function(){
    var self = this;

    //Set filter parameter
    this.set('filter.idRestaurant', this.get('idRestaurant'));

    //Get number of pages for display restaurants
    $.ajax({ //No return here
      url: "/api/v1/getRestaurantMenu",
      type: "POST",
      data: JSON.stringify(self.get('filter')),
      processData: false,
      async:false, //Need to wait
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      //Set items
      self.set('menuitems', data);
    });
  },

  init: function(){
    //Set default food type
    this.set('filter.type', 'Breakfast');
  },

  model: function(param){
    var self = this;

    if(param.id == null){
      //Prevent display this page
    } else {
      self.set('idRestaurant', param.id);
    }

    //Get all restaurants
    this.getItems();

    //Scroll to top
    $("html, body").animate({ scrollTop: 0 }, 500);

    //Return model to template
    return Ember.RSVP.hash({
      menuitems: self.get('menuitems'),
      newMenuItem: self.get('newMenuItem'),
      idRestaurant: self.get('idRestaurant')
    });
  },
  actions: {
    changeType: function(type){
      this.set('filter.type', type);

      //Get all restaurants
      this.getItems();

      console.log(this.get('menuitems'));

      //Change style
      $(".admin_menu_buttons_type .btn-default").removeClass("active");
      $(".menu_title_" + type).addClass("active");

      console.log(this.get('filter'));
      this.refresh();
    },
    addItem: function(){
      var self = this;

      //Set additional data
      this.set('newMenuItem.type', this.get('filter.type'));
      this.set('newMenuItem.idRestaurant', this.get('idRestaurant'));

      $.ajax({ //No return here
        url: "/api/v1/admin/addMenuItem",
        type: "POST",
        data: JSON.stringify(self.get('newMenuItem')),
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        //Reset add fields
        self.set('newMenuItem.name', null);
        self.set('newMenuItem.description', null);
        self.set('newMenuItem.price', null);

        //Set items
        self.refresh();
      });

    },
    deleteItem: function(id){
      var self = this;

      $.ajax({ //No return here
        url: "/api/v1/admin/deleteMenuItem",
        type: "POST",
        data: '{"id":'+id+'}',
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        //Set items
        self.refresh();
      });
    }
  }
});
