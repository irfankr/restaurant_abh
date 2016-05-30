var _slice = Array.prototype.slice;
import Ember from 'ember';
import layout from '../templates/components/g-map-address-marker';
/* global google */

var computed = Ember.computed;
var observer = Ember.observer;
var run = Ember.run;
var isPresent = Ember.isPresent;
var isEmpty = Ember.isEmpty;
var typeOf = Ember.typeOf;

var GMapAddressMarkerComponent = Ember.Component.extend({
  layout: layout,
  classNames: ['g-map-address-marker'],

  map: computed.alias('mapContext.map'),

  didInsertElement: function didInsertElement() {
    this._super.apply(this, arguments);
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
      this.searchLocation();
    }
  },

  onAddressChanged: observer('address', function () {
    run.once(this, 'searchLocation');
  }),

  searchLocation: function searchLocation() {
    var _this = this;

    var service = this.get('placesService');
    var address = this.get('address');

    if (isPresent(service) && isPresent(address) && typeof FastBoot === 'undefined') {
      var request = { query: address };

      service.textSearch(request, function (results, status) {
        if (google && status === google.maps.places.PlacesServiceStatus.OK) {
          _this.updateLocation(results);
        }
      });
    }
  },

  updateLocation: function updateLocation(results) {
    var lat = results[0].geometry.location.lat();
    var lng = results[0].geometry.location.lng();

    this.set('lat', lat);
    this.set('lng', lng);
    this.sendOnLocationChange(lat, lng, results);
  },

  sendOnLocationChange: function sendOnLocationChange() {
    var onLocationChange = this.attrs.onLocationChange;

    if (typeOf(onLocationChange) === 'function') {
      onLocationChange.apply(undefined, arguments);
    } else {
      this.sendAction.apply(this, ['onLocationChange'].concat(_slice.call(arguments)));
    }
  }
});

GMapAddressMarkerComponent.reopenClass({
  positionalParams: ['mapContext']
});

export default GMapAddressMarkerComponent;