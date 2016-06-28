import Ember from 'ember';

export default Ember.Route.extend({
  listItems: [],
  idRestaurant: null,

  model: function(param){
    var self = this;

    if(param.id == null){
      //Prevent display this page
    } else {
      self.set('idRestaurant', param.id);
    }

    $.ajax({ //No return here
      url: "/api/v1/admin/getAllRestaurantComments",
      type: "POST",
      data: '{"idRestaurant": '+param.id+'}',
      processData: false,
      async:false, //Need to wait
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      self.set('listItems', data);
      console.log(self.get('listItems'));
    });

    //Return model to template
    return Ember.RSVP.hash({
      listItems: self.get('listItems'),
      idRestaurant: self.get('idRestaurant')
    });
  },
});
