function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

import Ember from 'ember';
import layout from '../templates/components/g-map-route';
import GMapComponent from './g-map';
import compact from '../utils/compact';

var isEmpty = Ember.isEmpty;
var isPresent = Ember.isPresent;
var observer = Ember.observer;
var computed = Ember.computed;
var run = Ember.run;
var assert = Ember.assert;

var allowedPolylineOptions = Ember.A(['strokeColor', 'strokeWeight', 'strokeOpacity', 'zIndex']);

var TRAVEL_MODES = {
  walking: Ember.get(window, 'google.maps.TravelMode.WALKING'),
  bicycling: Ember.get(window, 'google.maps.TravelMode.BICYCLING'),
  transit: Ember.get(window, 'google.maps.TravelMode.TRANSIT'),
  driving: Ember.get(window, 'google.maps.TravelMode.DRIVING')
};

var GMapRouteComponent = Ember.Component.extend({
  layout: layout,
  classNames: ['g-map-marker'],
  positionalParams: ['mapContext'],

  map: computed.alias('mapContext.map'),

  init: function init() {
    this._super(arguments);
    this.set('waypoints', Ember.A());
    var mapContext = this.get('mapContext');
    assert('Must be inside {{#g-map}} component with context set', mapContext instanceof GMapComponent);
  },

  didInsertElement: function didInsertElement() {
    this._super();
    this.initDirectionsService();
  },

  willDestroyElement: function willDestroyElement() {
    var renderer = this.get('directionsRenderer');
    if (isPresent(renderer)) {
      renderer.setMap(null);
    }
  },

  mapWasSet: observer('map', function () {
    run.once(this, 'initDirectionsService');
  }),

  initDirectionsService: function initDirectionsService() {
    var map = this.get('map');
    var service = this.get('directionsService');
    var renderer = this.get('directionsRenderer');

    if (isPresent(map) && isEmpty(service) && isEmpty(renderer) && typeof FastBoot === 'undefined') {
      var rendererOptions = {
        map: map,
        suppressMarkers: true,
        preserveViewport: true
      };
      renderer = new google.maps.DirectionsRenderer(rendererOptions);
      service = new google.maps.DirectionsService();

      this.set('directionsRenderer', renderer);
      this.set('directionsService', service);

      this.updateRoute();
      this.updatePolylineOptions();
    }
  },

  onLocationsChanged: observer('originLat', 'originLng', 'destinationLat', 'destinationLng', 'travelMode', function () {
    run.once(this, 'updateRoute');
  }),

  updateRoute: function updateRoute() {
    var service = this.get('directionsService');
    var renderer = this.get('directionsRenderer');
    var originLat = this.get('originLat');
    var originLng = this.get('originLng');
    var destinationLat = this.get('destinationLat');
    var destinationLng = this.get('destinationLng');
    var waypoints = this.get('waypoints').mapBy('waypoint');

    if (isPresent(service) && isPresent(renderer) && isPresent(originLat) && isPresent(originLng) && isPresent(destinationLat) && isPresent(destinationLng) && typeof FastBoot === 'undefined') {
      var origin = new google.maps.LatLng(this.get('originLat'), this.get('originLng'));
      var destination = new google.maps.LatLng(this.get('destinationLat'), this.get('destinationLng'));
      var travelMode = this.retrieveTravelMode(this.get('travelMode'));
      var request = {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints
      };

      service.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          renderer.setDirections(response);
        }
      });
    }
  },

  polylineOptionsChanged: observer.apply(undefined, _toConsumableArray(allowedPolylineOptions).concat([function () {
    run.once(this, 'updatePolylineOptions');
  }])),

  updatePolylineOptions: function updatePolylineOptions() {
    var renderer = this.get('directionsRenderer');
    var polylineOptions = compact(this.getProperties(allowedPolylineOptions));

    if (isPresent(renderer) && isPresent(Object.keys(polylineOptions))) {
      renderer.setOptions({ polylineOptions: polylineOptions });

      var directions = renderer.getDirections();
      if (isPresent(directions)) {
        renderer.setDirections(directions);
      }
    }
  },

  retrieveTravelMode: function retrieveTravelMode(mode) {
    return TRAVEL_MODES.hasOwnProperty(mode) ? TRAVEL_MODES[mode] : TRAVEL_MODES.driving;
  },

  registerWaypoint: function registerWaypoint(waypoint) {
    this.get('waypoints').addObject(waypoint);
  },

  unregisterWaypoint: function unregisterWaypoint(waypoint) {
    this.get('waypoints').removeObject(waypoint);
  },

  waypointsChanged: observer('waypoints.@each.location', function () {
    run.once(this, 'updateRoute');
  })
});

GMapRouteComponent.reopenClass({
  positionalParams: ['mapContext']
});

export default GMapRouteComponent;