import Ember from 'ember';
import Location from '../../../models/location';
import Notification from '../../../models/notification';

export default Ember.Route.extend({
  location: Location.create(),
  notification: Notification.create(),

  exit: function(){
    this.set('notification.visible', false);
    this.set('location.name', null);
  },
  actions: {
    addItem: function(){
      var self = this;

      if(self.get('location.name') == null || self.get('location.name') == ""){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'All fields are required!');
        self.refresh();
      } else {
        var data = JSON.stringify(self.get('location'));

        $.ajax({ //No return here
          url: "/api/v1/admin/addLocation",
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
          self.set('notification.text', 'Successful insert!');
          self.refresh();
        });
      }
    },
    cancel: function(){
      this.transitionTo('admin.locations');
    }
  },
  model: function(){
    var self = this;

    //Return model to template
    return Ember.RSVP.hash({
      location: self.get('location'),
      notification: self.get('notification')
    });
  }
});
