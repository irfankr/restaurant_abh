var _slice = Array.prototype.slice;
import Ember from 'ember';
import layout from '../templates/components/g-map-address-route';
/* global google */

var computed = Ember.computed;
var observer = Ember.observer;
var run = Ember.run;
var isPresent = Ember.isPresent;
var isEmpty = Ember.isEmpty;
var typeOf = Ember.typeOf;

var GMapAddressRouteComponent = Ember.Component.extend({
  layout: layout,
  classNames: ['g-map-address-route'],

  map: computed.alias('mapContext.map'),

  didInsertElement: function didInsertElement() {
    this._super();
    this.initPlacesService();
  },

  mapWasSet: observer('map', function () {
    run.once(this, 'initPlacesService');
  }),

  initPlacesService: function initPlacesService() {
    var map = this.get('map');
    var service = this.get('placesService');

    if (isPresent(map) && isEmpty(service) && typeof FastBoot === 'undefined') {
      service = new google.maps.places.PlacesService(map);
      this.set('placesService', service);
      this.searchLocations();
    }
  },

  onAddressChanged: observer('originAddress', 'destinationAddress', function () {
    run.once(this, 'searchLocations');
  }),

  searchLocations: function searchLocations() {
    var _this = this;

    var service = this.get('placesService');
    var originAddress = this.get('originAddress');
    var destinationAddress = this.get('destinationAddress');

    if (isPresent(service) && isPresent(originAddress) && typeof FastBoot === 'undefined') {
      var originRequest = { query: originAddress };

      service.textSearch(originRequest, function (results, status) {
        if (google && status === google.maps.places.PlacesServiceStatus.OK) {
          _this.updateOriginLocation(results);
        }
      });
    }

    if (isPresent(service) && isPresent(destinationAddress) && typeof FastBoot === 'undefined') {
      var destinationRequest = { query: destinationAddress };

      service.textSearch(destinationRequest, function (results, status) {
        if (google && status === google.maps.places.PlacesServiceStatus.OK) {
          _this.updateDestinationLocation(results);
        }
      });
    }
  },

  updateOriginLocation: function updateOriginLocation(results) {
    var lat = results[0].geometry.location.lat();
    var lng = results[0].geometry.location.lng();

    this.set('originLat', lat);
    this.set('originLng', lng);
    this.sendOnLocationsChange(lat, lng, results);
  },

  updateDestinationLocation: function updateDestinationLocation(results) {
    var lat = results[0].geometry.location.lat();
    var lng = results[0].geometry.location.lng();

    this.set('destinationLat', lat);
    this.set('destinationLng', lng);
    this.sendOnLocationsChange(lat, lng, results);
  },

  sendOnLocationsChange: function sendOnLocationsChange() {
    var onLocationsChange = this.attrs.onLocationsChange;

    if (typeOf(onLocationsChange) === 'function') {
      onLocationsChange.apply(undefined, arguments);
    } else {
      this.sendAction.apply(this, ['onLocationsChange'].concat(_slice.call(arguments)));
    }
  }
});

GMapAddressRouteComponent.reopenClass({
  positionalParams: ['mapContext']
});

export default GMapAddressRouteComponent;