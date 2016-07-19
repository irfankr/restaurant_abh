import Ember from 'ember';

export default Ember.Route.extend({
  title: function(tokens) {
   tokens = Ember.makeArray(tokens);
   tokens.unshift('Restaurants AtlantBH Internship');
   return tokens.reverse().join(' / ');
  }
});
