import Ember from 'ember';
var supportsSetterGetter;

try {
  Ember.computed({
    set: function set() {},
    get: function get() {}
  });
  supportsSetterGetter = true;
} catch (e) {
  supportsSetterGetter = false;
}

export default supportsSetterGetter;