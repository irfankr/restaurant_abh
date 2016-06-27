import Ember from 'ember';
import Restauranttable from '../../../../models/resturanttable';
import Filter from '../../../../models/filter';
import Adminrestauranteditqueue from '../../../../models/adminrestauranteditqueue';
import Notification from '../../../../models/notification';

export default Ember.Route.extend({
  restaurantTables: Restauranttable.create(),
  newTableItem: Restauranttable.create(),
  filter: Filter.create(),
  idRestaurant: null,
  adminRestaurantEditQueue: Adminrestauranteditqueue.create(),
  notification: Notification.create(),
  edited: false,

  itemsToAdd: [],
  itemsToEdit: [],
  itemsToDelete: [],

  getItems: function(){
    var self = this;

    //Set filter parameter
    this.set('filter.idRestaurant', this.get('idRestaurant'));

    //Get number of pages for display restaurants
    $.ajax({ //No return here
      url: "/api/v1/admin/getAllRestaurantTables",
      type: "POST",
      data: JSON.stringify(self.get('filter')),
      processData: false,
      async:false, //Need to wait
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      //Set items
      self.set('restaurantTables', data);
    });
  }.observes('idRestaurant'),

  exit: function(){

    //Reset notification
    this.set('notification', Notification.create());

    //Reset all queues
    this.set('edited', false);
    this.set('itemsToAdd', []);
    this.set('itemsToEdit', []);
    this.set('itemsToDelete', []);
    this.set('adminRestaurantEditQueue', Adminrestauranteditqueue.create());

    //Refresh data on exit
    this.getItems();
  },

  model: function(param){
    var self = this;

    if(param.id == null){
      //Prevent display this page
    } else {
      self.set('idRestaurant', param.id);
    }

    //Scroll to top
    $("html, body").animate({ scrollTop: 0 }, 500);

    //Return model to template
    return Ember.RSVP.hash({
      restaurantTables: self.get('restaurantTables'),
      newTableItem: self.get('newTableItem'),
      idRestaurant: self.get('idRestaurant'),
      notification:  self.get('notification'),
      edited: self.get('edited')
    });
  },
  actions: {
    cancel: function(){
      this.transitionTo('admin.restaurants.add.info', this.get('idRestaurant'));
    },
    addItem: function(){
      var self = this;

      if(self.get('newTableItem.sittingPlaces') == "" || self.get('newTableItem.sittingPlaces') == null){
        return false;
      }

      //Set additional data
      var randomnumber = Math.floor(Math.random() * (9999999 - 1111111 + 1)) + 1111111;
      this.set('newTableItem.idRestaurant', this.get('idRestaurant'));
      this.set('newTableItem.id', randomnumber);

      //Add new menu idem to lists for send to play route
      var temp = JSON.stringify(self.get('newTableItem'));
      this.get('itemsToAdd').push(JSON.parse(temp));
      this.get('restaurantTables').push(JSON.parse(temp));
      self.set('edited', true);

      this.set('newTableItem', Restauranttable.create());

      this.refresh();

    },
    editItem: function(id){
      var self = this;

      //Find modified item
      var modifiedItem;
      for(var i=0; i < self.get('restaurantTables').length; i++){
        if(self.get('restaurantTables')[i].id == id){
          modifiedItem = self.get('restaurantTables')[i];
          break;
        }
      }

      //First check is in add queue, if it is edit it in add queue
      var modifiedInAddQueue = false;
      for(var i=0; i < self.get('itemsToAdd').length; i++){
        if(self.get('itemsToAdd')[i].id == id){
          //Edit it in add queue
          self.get('itemsToAdd')[i] = modifiedItem;
          modifiedInAddQueue = true;
          break;
        }
      }

      //If it is not edited in add queue, check is it in edit queue
      var modifiedInEditQueue = false;
      if(!modifiedInAddQueue){
        for(var i=0; i < self.get('itemsToEdit').length; i++){
          if(self.get('itemsToEdit')[i].id == id){
            //Edit it in edit queue
            self.get('itemsToEdit')[i] = modifiedItem;
            modifiedInEditQueue = true;
            break;
          }
        }
      }

      //If it is not edited in edit and in add queue, than add id in edit queue
      if(!modifiedInEditQueue && !modifiedInAddQueue){
        //Add new menu idem to lists for send to play route
        var temp = JSON.stringify(modifiedItem);
        this.get('itemsToEdit').push(JSON.parse(temp));
      }

      self.set('edited', true);
      this.refresh();
    },
    deleteItem: function(id){
      var self = this;
      //Check is it in queue for adding
      var removedFromQueue = false;
      for(var i=0; i < self.get('itemsToAdd').length; i++){
        if(self.get('itemsToAdd')[i].id == id){
          //Remove also in queue for deleting
          self.get('itemsToAdd').removeObject(self.get('itemsToAdd')[i]);
          removedFromQueue = true;
          break;
        }
      }

      //Temp remove
      for(var i=0; i < self.get('restaurantTables').length; i++){
        if(self.get('restaurantTables')[i].id == id){

          //Add new menu idem to lists for send to play route
          if(!removedFromQueue){ //If it is removed from queue for adding, than it is not in database
            var temp = JSON.stringify(self.get('restaurantTables')[i]);
            self.get('itemsToDelete').push(JSON.parse(temp));
          }

          self.get('restaurantTables').removeObject(self.get('restaurantTables')[i]);
          break;
        }
      }

      self.set('edited', true);
      this.refresh();
    },
    saveChanges: function(){
      var self = this;

      console.log('ITEMS TO ADD------------------');
      console.log(this.get('itemsToAdd'));
      console.log('ITEMS TO EDIT------------------');
      console.log(this.get('itemsToEdit'));
      console.log('ITEMS TO DELETE------------------');
      console.log(this.get('itemsToDelete'));

      this.set('adminRestaurantEditQueue.addQueue', this.get('itemsToAdd'));
      this.set('adminRestaurantEditQueue.editQueue', this.get('itemsToEdit'));
      this.set('adminRestaurantEditQueue.deleteQueue', this.get('itemsToDelete'));

      var data = JSON.stringify(self.get('adminRestaurantEditQueue'));
      console.log(data);

      $.ajax({ //No return here
        url: "/api/v1/admin/adminTableItems",
        type: "POST",
        data: data,
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-success');
        self.set('notification.text', 'Successful edit!');
        self.set('edited', false);
      });

      //Reset all queues
      this.set('itemsToAdd', []);
      this.set('itemsToEdit', []);
      this.set('itemsToDelete', []);
      this.set('adminRestaurantEditQueue', Adminrestauranteditqueue.create());

      //Get items from database
      this.getItems();
      this.refresh();
    }
  }
});
