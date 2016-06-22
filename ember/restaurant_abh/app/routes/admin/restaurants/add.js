import Ember from 'ember';
import Location from '../../../models/location';
import Notification from '../../../models/notification';

export default Ember.Route.extend({
  location: Location.create(),
  notification: Notification.create(),

  exit: function(){
    this.set('notification.visible', false);
  },
  actions: {
    addItem: function(){
      var self = this;
      var data = JSON.stringify(self.get('location'));
      console.log(data);

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
        console.log("USPJESNO DODAVANJE");
      });
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
