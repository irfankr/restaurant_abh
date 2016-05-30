import Ember from 'ember';
import layout from '../templates/components/g-map-marker';
import GMapComponent from './g-map';

var isEmpty = Ember.isEmpty;
var isPresent = Ember.isPresent;
var observer = Ember.observer;
var computed = Ember.computed;
var run = Ember.run;
var assert = Ember.assert;
var typeOf = Ember.typeOf;

var GMapMarkerComponent = Ember.Component.extend({
  layout: layout,
  classNames: ['g-map-marker'],

  map: computed.alias('mapContext.map'),

  init: function init() {
    this._super(arguments);
    this.infowindow = null;
    if (isEmpty(this.get('group'))) {
      this.set('group', null);
    }

    var mapContext = this.get('mapContext');
    assert('Must be inside {{#g-map}} component with context set', mapContext instanceof GMapComponent);

    mapContext.registerMarker(this);
  },

  didInsertElement: function didInsertElement() {
    this._super();
    if (isEmpty(this.get('marker')) && typeof FastBoot === 'undefined') {
      var marker = new google.maps.Marker();
      this.set('marker', marker);
    }
    this.setPosition();
    this.setIcon();
    this.setLabel();
    this.setTitle();
    this.setMap();
    this.setOnClick();
  },

  willDestroyElement: function willDestroyElement() {
    this.unsetMarkerFromMap();
    this.get('mapContext').unregisterMarker(this);
  },

  registerInfowindow: function registerInfowindow(infowindow, openEvent, closeEvent) {
    this.set('infowindow', infowindow);
    this.attachOpenCloseEvents(infowindow, openEvent, closeEvent);
  },

  unregisterInfowindow: function unregisterInfowindow() {
    this.set('infowindow', null);
  },

  attachOpenCloseEvents: function attachOpenCloseEvents(infowindow, openEvent, closeEvent) {
    var marker = this.get('marker');
    if (openEvent === closeEvent) {
      this.attachTogglingInfowindowEvent(marker, infowindow, openEvent);
    } else {
      this.attachOpenInfowindowEvent(marker, infowindow, openEvent);
      this.attachCloseInfowindowEvent(marker, infowindow, closeEvent);
    }
  },

  attachOpenInfowindowEvent: function attachOpenInfowindowEvent(marker, infowindow, event) {
    if (isPresent(event)) {
      marker.addListener(event, function () {
        return infowindow.open();
      });
    }
  },

  attachCloseInfowindowEvent: function attachCloseInfowindowEvent(marker, infowindow, event) {
    if (isPresent(event)) {
      marker.addListener(event, function () {
        return infowindow.close();
      });
    }
  },

  attachTogglingInfowindowEvent: function attachTogglingInfowindowEvent(marker, infowindow, event) {
    if (isPresent(event)) {
      marker.addListener(event, function () {
        if (infowindow.get('isOpen')) {
          infowindow.close();
        } else {
          infowindow.open();
        }
      });
    }
  },

  unsetMarkerFromMap: function unsetMarkerFromMap() {
    var marker = this.get('marker');
    if (isPresent(marker)) {
      marker.setMap(null);
    }
  },

  mapWasSet: observer('map', function () {
    run.once(this, 'setMap');
  }),

  setMap: function setMap() {
    var map = this.get('map');
    var marker = this.get('marker');

    if (isPresent(marker) && isPresent(map)) {
      marker.setMap(map);
    }
  },

  coordsChanged: observer('lat', 'lng', function () {
    run.once(this, 'setPosition');
  }),

  setPosition: function setPosition() {
    var marker = this.get('marker');
    var lat = this.get('lat');
    var lng = this.get('lng');

    if (isPresent(marker) && isPresent(lat) && isPresent(lng) && typeof FastBoot === 'undefined') {
      var position = new google.maps.LatLng(lat, lng);
      marker.setPosition(position);
    }
  },

  iconChanged: observer('icon', function () {
    run.once(this, 'setIcon');
  }),

  setIcon: function setIcon() {
    var marker = this.get('marker');
    var icon = this.get('icon');

    if (isPresent(marker) && isPresent(icon)) {
      marker.setIcon(icon);
    }
  },

  setOnClick: function setOnClick() {
    var _this = this;

    var marker = this.get('marker');
    if (isPresent(marker)) {
      marker.addListener('click', function () {
        return _this.sendOnClick();
      });
    }
  },

  labelChanged: observer('label', function () {
    run.once(this, 'setLabel');
  }),

  setLabel: function setLabel() {
    var marker = this.get('marker');
    var label = this.get('label');

    if (isPresent(marker) && isPresent(label)) {
      marker.setLabel(label);
    }
  },

  titleChanged: observer('title', function () {
    run.once(this, 'setTitle');
  }),

  setTitle: function setTitle() {
    var marker = this.get('marker');
    var title = this.get('title');

    if (isPresent(marker) && isPresent(title)) {
      marker.setTitle(title);
    }
  },

  sendOnClick: function sendOnClick() {
    var onClick = this.attrs.onClick;

    var mapContext = this.get('mapContext');
    var group = this.get('group');

    if (typeOf(onClick) === 'function') {
      onClick();
    } else {
      this.sendAction('onClick');
    }

    if (isPresent(group)) {
      mapContext.groupMarkerClicked(this, group);
    }
  },

  closeInfowindow: function closeInfowindow() {
    var infowindow = this.get('infowindow');
    if (isPresent(infowindow)) {
      infowindow.close();
    }
  }
});

GMapMarkerComponent.reopenClass({
  positionalParams: ['mapContext']
});

export default GMapMarkerComponent;