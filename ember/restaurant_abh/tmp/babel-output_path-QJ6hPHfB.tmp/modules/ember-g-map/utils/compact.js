import Ember from 'ember';

export default function (objectInstance) {
  var compactedObject = {};

  for (var key in objectInstance) {
    var value = objectInstance[key];

    if (Ember.isPresent(value)) {
      compactedObject[key] = value;
    }
  }

  return compactedObject;
}