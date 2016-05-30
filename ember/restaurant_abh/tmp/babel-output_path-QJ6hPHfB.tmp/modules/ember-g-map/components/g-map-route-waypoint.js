import Ember from 'ember';
import layout from '../templates/components/g-map-route-waypoint';
import GMapRouteComponent from './g-map-route';

var isEmpty = Ember.isEmpty;
var isPresent = Ember.isPresent;
var observer = Ember.observer;
var computed = Ember.computed;
var run = Ember.run;
var assert = Ember.assert;

var GMapRouteWaypointComponent = Ember.Component.extend({
  layout: layout,
  classNames: ['g-map-route-waypoint'],

  map: computed.alias('routeContext.map'),

  init: function init() {
    this._super(arguments);
    if (isEmpty(this.stopover)) {
      this.stopover = true;
    }

    var routeContext = this.get('routeContext');
    assert('Must be inside {{#g-map-route}} component with routeContext set', routeContext instanceof GMapRouteComponent);
  },

  didInsertElement: function didInsertElement() {
    this._super();
    this.updateWaypoint();
  },

  willDestroyElement: function willDestroyElement() {
    this.get('routeContext').unregisterWaypoint(this);
  },

  coordsChanged: observer('lat', 'lng', function () {
    run.once(this, 'updateWaypoint');
  }),

  updateWaypoint: function updateWaypoint() {
    var _getProperties = this.getProperties(['lat', 'lng']);

    var lat = _getProperties.lat;
    var lng = _getProperties.lng;

    if (isPresent(lat) && isPresent(lng) && typeof FastBoot === 'undefined') {
      var _location = new google.maps.LatLng(lat, lng);
      this.set('waypoint', {
        location: _location,
        stopover: this.get('stopover')
      });
    }
  },

  waypointWasSet: observer('waypoint', function () {
    run.once(this, 'updateRoute');
  }),

  updateRoute: function updateRoute() {
    var routeContext = this.get('routeContext');
    var waypoint = this.get('waypoint');

    if (isPresent(waypoint) && isPresent(routeContext)) {
      routeContext.registerWaypoint(this);
    }
  }
});

GMapRouteWaypointComponent.reopenClass({
  positionalParams: ['routeContext']
});

export default GMapRouteWaypointComponent;