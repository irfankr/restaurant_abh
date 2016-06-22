import Ember from 'ember';

export default Ember.Route.extend({
  counters: null,
  model: function(){
    var self = this;

    $.ajax({ //No return here
      url: "/api/v1/admin/getAdministrationCounters",
      type: "GET",
      processData: false,
      async:false, //Need to wait
      contentType: "application/json; charset=UTF-8",
    }).fail(function(data) {
      console.log(data);
    }).then(function(data) {
      self.set('counters', data);

      console.log(self.get('counters'));
    });

    //Return model to template
    return Ember.RSVP.hash({
      counters: self.get('counters')
    });
  }
});
