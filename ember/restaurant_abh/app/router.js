import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('restaurants');
  this.route('register');
  this.route('restaurant', {path: '/restaurant/:restaurantId'});
  this.route('completereservation');
});

export default Router;
