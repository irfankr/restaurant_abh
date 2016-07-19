import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  headData: Ember.inject.service(),

  setTitle(title) {
    this.get('headData').set('title', title);
    return ga('send', 'pageview', {
      'page': this.get('url'),
      'title': title
    });
  }
});

Router.map(function() {
  this.route('login');
  this.route('restaurants', {path: '/restaurants/:pageNumber'});
  this.route('register');
  this.route('restaurant', {path: '/restaurant/:restaurantId'});
  this.route('completereservation');
  this.route('reservations');
  this.route('termsofuse');
  this.route('privacypolicy');
  this.route('resetpassword');
  this.route('resetpassword', {path: '/resetpassword/:userCode'});
  this.route('forgotpassword');
  this.route('admin', function() {
    this.route('restaurants', function() {
      this.route('add', function() {
        this.route('menu', {path: '/menu/:id'});
        this.route('tables', {path: '/tables/:id'});
        this.route('gallery', function() {
          this.route('list', {path: '/list/:id'});
          this.route('add', {path: '/add/:id'});
        });
        this.route('info', {path: '/info/:id'});
        this.route('reviews', {path: '/reviews/:id'});
      });
      this.route('edit', {path: '/edit/:id'});
    });
    this.route('categories', function() {
      this.route('add');
      this.route('edit', {path: '/edit/:id'});
    });
    this.route('locations', function() {
      this.route('add');
      this.route('edit', {path: '/edit/:id'});
    });
    this.route('users', function() {
      this.route('add');
      this.route('edit', {path: '/edit/:id'});
    });
  });
  this.route('findtable');
});

export default Router;
