import Ember from 'ember';
import layout from '../templates/components/g-map-polyline-coordinate';
import GMapPolylineComponent from './g-map-polyline';

var isEmpty = Ember.isEmpty;
var isPresent = Ember.isPresent;
var observer = Ember.observer;
var computed = Ember.computed;
var run = Ember.run;
var assert = Ember.assert;

var GMapPolylineCoordinateComponent = Ember.Component.extend({
  layout: layout,
  classNames: ['g-map-polyline-coordinate'],

  polyline: computed.alias('polylineContext.polyline'),

  init: function init() {
    this._super(arguments);

    var polylineContext = this.get('polylineContext');
    assert('Must be inside {{#g-map-polyline}} component with context set', polylineContext instanceof GMapPolylineComponent);

    polylineContext.registerCoordinate(this);
  },

  didInsertElement: function didInsertElement() {
    this._super();
    if (isEmpty(this.get('coordinate'))) {
      var coordinate = new google.maps.LatLng();
      this.set('coordinate', coordinate);
    }
    this.setPosition();
  },

  willDestroyElement: function willDestroyElement() {
    this.get('polylineContext').unregisterCoordinate(this);
  },

  coordsChanged: observer('lat', 'lng', function () {
    run.once(this, 'setPosition');
  }),

  setPosition: function setPosition() {
    var polylineContext = this.get('polylineContext');
    var lat = this.get('lat');
    var lng = this.get('lng');

    if (isPresent(polylineContext) && isPresent(lat) && isPresent(lng)) {
      var coordinate = new google.maps.LatLng(lat, lng);
      this.set('coordinate', coordinate);
      polylineContext.setPath();
    }
  }
});

GMapPolylineCoordinateComponent.reopenClass({
  positionalParams: ['polylineContext']
});

export default GMapPolylineCoordinateComponent;