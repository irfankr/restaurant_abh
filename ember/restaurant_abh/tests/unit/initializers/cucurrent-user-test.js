import Ember from 'ember';
import CucurrentUserInitializer from 'restaurant-abh/initializers/cucurrent-user';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | cucurrent user', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  CucurrentUserInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
