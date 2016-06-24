import Ember from 'ember';
import Category from '../../../models/category';
import Notification from '../../../models/notification';

export default Ember.Route.extend({
  category: Category.create(),
  notification: Notification.create(),
  finished: false,

  exit: function(){
    this.set('notification.visible', false);
    this.set('category.name', null);
    this.set('finished', false);
  },
  actions: {
    addItem: function(){
      var self = this;

      if(self.get('category.name') == null || self.get('category.name') == ""){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'All fields are required!');
        self.refresh();
      } else {
        var data = JSON.stringify(self.get('category'));

        $.ajax({ //No return here
          url: "/api/v1/admin/addCategory",
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

          //Set finished flag
          self.set('finished', true);

          self.refresh();
        });
      }
    },
    cancel: function(){
      this.transitionTo('admin.categories');
    }
  },

  model: function(){
    var self = this;

    //Return model to template
    return Ember.RSVP.hash({
      category: self.get('category'),
      notification: self.get('notification'),
      finished: self.get('finished')
    });
  }
});
