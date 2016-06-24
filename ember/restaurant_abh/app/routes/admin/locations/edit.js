import Ember from 'ember';
import Location from '../../../models/location';
import Notification from '../../../models/notification';

export default Ember.Route.extend({
  location: Location.create(),
  notification: Notification.create(),
  finished: false,

  exit: function(){
    this.set('notification.visible', false);
    this.set('finished', false);
  },
  actions: {
    editItem: function(){
      var self = this;
      var data = JSON.stringify(self.get('location'));

       if(self.get('location.name') == null || self.get('location.name') == ""){
          //Display notification
          self.set('notification.visible', true);
          self.set('notification.classStyle', 'alert-danger');
          self.set('notification.text', 'All fields are required!');
          self.refresh();
       } else {
          $.ajax({ //No return here
            url: "/api/v1/admin/editLocation",
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
            self.set('notification.text', 'Successful update!');

            //Set finished flag
            self.set('finished', true);

            self.refresh();
          });
       }
    },
    cancel: function(){
      this.transitionTo('admin.locations');
    },
  },
  model: function(param){
    var self = this;

    if(param.id != null){
      //Set restaurant id
      self.set('location.id', param.id);

      $.ajax({ //No return here
        url: "/api/v1/admin/getLocationDetails",
        type: "POST",
        data: '{"id":'+param.id+'}',
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
       //Set fetched items
        self.set('location', data);
      });
    }

    //Scroll to top
    $("html, body").animate({ scrollTop: 0 }, 500);

    //Return model to template
    return Ember.RSVP.hash({
      location: self.get('location'),
      notification: self.get('notification'),
      finished: self.get('finished')
    });

  }
});
