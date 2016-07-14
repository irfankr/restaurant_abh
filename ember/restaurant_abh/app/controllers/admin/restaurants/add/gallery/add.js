import Ember from 'ember';
import Notification from '../../../../../models/notification';
import GalleryImage from '../../../../../models/galleryimages';

export default Ember.Controller.extend({
  notification: Notification.create(),
  uploadedImages: [],
  added: false,
  galleryImage: GalleryImage.create(),
  idRestaurant: null,

  whenIdRestaurantIsLoaded: function(){
      //Remove all images
      this.set('uploadedImages', []);

      this.set('idRestaurant', this.get('model.idRestaurant'));
  }.observes("model.idRestaurant"),

  actions: {
      addedImage: function(file, res){
        this.get('uploadedImages').pushObject(res);
        console.log(this.get('uploadedImages'));
        console.log(res);

        //Set option to save changes visible
        this.set('added', true);

        //Remove background from uploader
        $(".administration_gallery .dropzone").css("background-image", "none");
      },
      resetDataOnExit: function(){
        //this.set('notification.visible', false);
        //Empty restaurants var
        //this.set('restaurant', Restaurant.create());

        //Remove all images
        this.set('uploadedImages', []);
        //Reset added flag variable
        this.set('added', false);
      },

      saveChanges: function(){
        var self = this;

        //Set data to send
        this.set('galleryImage.fileNames', this.get('uploadedImages'));
        this.set('galleryImage.idRestaurant', this.get('idRestaurant'));

        console.log(JSON.stringify(this.get('galleryImage')));

        $.ajax({ //No return here
          url: "/api/v1/admin/saveGalleryImages",
          type: "POST",
          data: JSON.stringify(self.get('galleryImage')),
          processData: false,
          async:false, //Need to wait
          contentType: "application/json; charset=UTF-8",
        }).fail(function(data) {
          console.log(data);
        }).then(function(data) {
          self.transitionToRoute('admin.restaurants.add.gallery.list', self.get('idRestaurant'));
        });
      }
  }
});
