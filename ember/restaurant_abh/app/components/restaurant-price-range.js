import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['inlineDollars'],
  inlineDollars: true,
  priceRange: function() {
    var numberOfFilledDollars = this.get('value');
    var result = [];
    for (var i = 0; i < this.get('max'); i++) {
      var dolar = {
        isFilled: i < numberOfFilledDollars
      };

      result.push(dolar);
    }
    return result;
  }.property('max', 'value')
});
