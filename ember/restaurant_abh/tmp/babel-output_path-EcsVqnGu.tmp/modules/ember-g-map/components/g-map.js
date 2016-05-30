import Ember from 'ember';
import layout from '../templates/components/g-map';

var isEmpty = Ember.isEmpty;
var isPresent = Ember.isPresent;
var computed = Ember.computed;
var observer = Ember.observer;
var run = Ember.run;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['g-map'],
  bannedOptions: Ember.A(['center', 'zoom']),

  init: function init() {
    this._super();
    this.set('markers', Ember.A());
    this.set('polylines', Ember.A());
    if (isEmpty(this.get('options'))) {
      this.set('options', {});
    }
  },

  permittedOptions: computed('options', function () {
    var _getProperties = this.getProperties(['options', 'bannedOptions']);

    var options = _getProperties.options;
    var bannedOptions = _getProperties.bannedOptions;

    var permittedOptions = {};
    for (var option in options) {
      if (options.hasOwnProperty(option) && !bannedOptions.contains(option)) {
        permittedOptions[option] = options[option];
      }
    }
    return permittedOptions;
  }),

  didInsertElement: function didInsertElement() {
    this._super();
    if (isEmpty(this.get('map')) && typeof FastBoot === 'undefined') {
      var canvas = this.$().find('.g-map-canvas').get(0);
      var options = this.get('permittedOptions');
      this.set('map', new google.maps.Map(canvas, options));
    }
    this.setZoom();
    this.setCenter();
    if (this.get('shouldFit')) {
      this.fitToMarkers();
    }
  },

  permittedOptionsChanged: observer('permittedOptions', function () {
    run.once(this, 'setOptions');
  }),

  setOptions: function setOptions() {
    var map = this.get('map');
    var options = this.get('permittedOptions');
    if (isPresent(map)) {
      map.setOptions(options);
    }
  },

  zoomChanged: observer('zoom', function () {
    run.once(this, 'setZoom');
  }),

  setZoom: function setZoom() {
    var map = this.get('map');
    var zoom = this.get('zoom');
    if (isPresent(map)) {
      map.setZoom(zoom);
    }
  },

  coordsChanged: observer('lat', 'lng', function () {
    run.once(this, 'setCenter');
  }),

  setCenter: function setCenter() {
    var map = this.get('map');
    var lat = this.get('lat');
    var lng = this.get('lng');

    if (isPresent(map) && isPresent(lat) && isPresent(lng) && typeof FastBoot === 'undefined') {
      var center = new google.maps.LatLng(lat, lng);
      map.setCenter(center);
    }
  },

  registerMarker: function registerMarker(marker) {
    this.get('markers').addObject(marker);
  },

  unregisterMarker: function unregisterMarker(marker) {
    this.get('markers').removeObject(marker);
  },

  registerPolyline: function registerPolyline(polyline) {
    this.get('polylines').addObject(polyline);
  },

  unregisterPolyline: function unregisterPolyline(polyline) {
    this.get('polylines').removeObject(polyline);
  },

  shouldFit: computed('markersFitMode', function () {
    return Ember.A(['init', 'live']).contains(this.get('markersFitMode'));
  }),

  markersChanged: observer('markers.@each.lat', 'markers.@each.lng', function () {
    if (this.get('markersFitMode') === 'live') {
      run.once(this, 'fitToMarkers');
    }
  }),

  fitToMarkers: function fitToMarkers() {
    var _this = this;

    var markers = this.get('markers').filter(function (marker) {
      return isPresent(marker.get('lat')) && isPresent(marker.get('lng'));
    });

    if (markers.length > 0 && typeof FastBoot === 'undefined') {
      (function () {
        var map = _this.get('map');
        var bounds = new google.maps.LatLngBounds();
        var points = markers.map(function (marker) {
          return new google.maps.LatLng(marker.get('lat'), marker.get('lng'));
        });

        points.forEach(function (point) {
          return bounds.extend(point);
        });
        map.fitBounds(bounds);
      })();
    }
  },

  groupMarkerClicked: function groupMarkerClicked(marker, group) {
    var markers = this.get('markers').without(marker).filterBy('group', group);
    markers.forEach(function (marker) {
      return marker.closeInfowindow();
    });
  }
});