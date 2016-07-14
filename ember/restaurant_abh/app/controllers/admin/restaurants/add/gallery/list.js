import Ember from 'ember';
import Notification from '../../../../../models/notification';
import GalleryImage from '../../../../../models/galleryimages';

export default Ember.Controller.extend({
  notification: Notification.create(),
  idRestaurant: null,
  imagesList: null,

  galleryImage: GalleryImage.create(),
  imagesToDelete: [],

  edited:false,

  whenIdRestaurantIsLoaded: function(){
      var self = this;

      //Set id restaurant
      this.set('idRestaurant', this.get('model.idRestaurant'));

      //Get list of gallery images for this restaurant
      $.ajax({ //No return here
        url: "/api/v1/getRestaurantGalleryImages",
        type: "POST",
        data: '{"idRestaurant":'+self.get('idRestaurant')+', "limitImages": 200}',
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        console.log(data);
        self.set('imagesList', data.galleryImages);
      });
  }.observes("model.idRestaurant"),

  actions: {
      resetDataOnExit: function(){
        //this.set('notification.visible', false);
        //Empty restaurants var
        //this.set('restaurant', Restaurant.create());
        this.set('edited', false);

        //Reset images to delete
        this.set('imagesToDelete', []);

        //Remove notification
        this.set('notification.visible', false);
      },
      cancel: function(){
        var self = this;

        //Get list of gallery images for this restaurant
        $.ajax({ //No return here
          url: "/api/v1/getRestaurantGalleryImages",
          type: "POST",
          data: '{"idRestaurant":'+self.get('idRestaurant')+', "limitImages": 200}',
          processData: false,
          async:false, //Need to wait
          contentType: "application/json; charset=UTF-8",
        }).fail(function(data) {
          console.log(data);
        }).then(function(data) {
          self.set('edited', false);
          self.set('imagesList', data.galleryImages);

          //Reset images to delete
          self.set('imagesToDelete', []);

          //Remove notification
          self.set('notification.visible', false);
        });


      },
      removeImage: function(imageId){
        var self = this;

        //Remove image from list of images
        for(var i=0; i < self.get('imagesList').length; i++){
          if(self.get('imagesList')[i].id == imageId){
            //Remove also in queue for deleting
            self.get('imagesList').removeObject(self.get('imagesList')[i]);
            break;
          }
        }

        //Add image to queue for delete
        this.get('imagesToDelete').pushObject(imageId);

        //Set edited on true
        this.set('edited', true);
      },
      saveChanges: function(){
        var self = this;

        //Create object for ajax request
        this.set('galleryImage.idList', this.get('imagesToDelete'));

        //Get list of gallery images for this restaurant
        $.ajax({ //No return here
          url: "/api/v1/admin/deleteGalleryImages",
          type: "POST",
          data: JSON.stringify(self.get('galleryImage')),
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
          self.set('edited', false);

          //Reset images to delete
          self.set('imagesToDelete', []);
        });

      }
  }
});
