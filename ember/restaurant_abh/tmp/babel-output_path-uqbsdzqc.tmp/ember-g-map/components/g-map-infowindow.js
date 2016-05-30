define('ember-g-map/components/g-map-infowindow', ['exports', 'ember', 'ember-g-map/templates/components/g-map-infowindow', 'ember-g-map/components/g-map', 'ember-g-map/components/g-map-marker', 'ember-g-map/utils/compact'], function (exports, _ember, _emberGMapTemplatesComponentsGMapInfowindow, _emberGMapComponentsGMap, _emberGMapComponentsGMapMarker, _emberGMapUtilsCompact) {
  'use strict';

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var isEmpty = _ember['default'].isEmpty;
  var isPresent = _ember['default'].isPresent;
  var observer = _ember['default'].observer;
  var computed = _ember['default'].computed;
  var run = _ember['default'].run;
  var assert = _ember['default'].assert;
  var typeOf = _ember['default'].typeOf;

  var allowedOptions = _ember['default'].A(['disableAutoPan', 'maxWidth', 'pixelOffset']);

  var OPEN_CLOSE_EVENTS = _ember['default'].A(['click', 'dblclick', 'rightclick', 'mouseover', 'mouseout']);

  var GMapInfowindowComponent = _ember['default'].Component.extend({
    layout: _emberGMapTemplatesComponentsGMapInfowindow['default'],
    classNames: ['g-map-marker'],

    map: computed.alias('mapContext.map'),
    marker: computed.alias('mapContext.marker'),

    init: function init() {
      this._super(arguments);

      var mapContext = this.get('mapContext');
      var hasMap = mapContext instanceof _emberGMapComponentsGMap['default'];
      var hasMarker = mapContext instanceof _emberGMapComponentsGMapMarker['default'];
      assert('Must be inside {{#g-map}} or {{#g-map-marker}} components with context set', hasMarker || hasMap);

      this.set('hasMarker', hasMarker);
    },

    didInsertElement: function didInsertElement() {
      this._super();
      if (isEmpty(this.get('infowindow'))) {
        var infowindow = this.buildInfowindow();
        this.set('infowindow', infowindow);
      }
      this.setPosition();
      this.setMap();
      this.setMarker();
      this.setOptions();
    },

    willDestroyElement: function willDestroyElement() {
      this.close();

      if (this.get('hasMarker')) {
        this.get('mapContext').unregisterInfowindow();
      }
    },

    optionsChanged: observer.apply(undefined, _toConsumableArray(allowedOptions).concat([function () {
      run.once(this, 'setOptions');
    }])),

    setOptions: function setOptions() {
      var infowindow = this.get('infowindow');
      var options = (0, _emberGMapUtilsCompact['default'])(this.getProperties(allowedOptions));

      if (isPresent(infowindow) && isPresent(Object.keys(options))) {
        infowindow.setOptions(options);
      }
    },

    buildInfowindow: function buildInfowindow() {
      var _this = this;

      if (google) {
        var infowindow = new google.maps.InfoWindow({
          content: this.get('element')
        });

        if (isPresent(this.get('attrs.onClose'))) {
          infowindow.addListener('closeclick', function () {
            return _this.handleCloseClickEvent();
          });
        }
        return infowindow;
      }
    },

    handleCloseClickEvent: function handleCloseClickEvent() {
      var onClose = this.attrs.onClose;

      if (typeOf(onClose) === 'function') {
        onClose();
      } else {
        this.sendAction('onClose');
      }
    },

    open: function open() {
      var infowindow = this.get('infowindow');
      var map = this.get('map');
      var marker = this.get('marker');

      this.set('isOpen', true);
      if (isPresent(map) && isPresent(marker)) {
        infowindow.open(map, marker);
      } else if (isPresent(map)) {
        infowindow.open(map);
      }
    },

    close: function close() {
      var infowindow = this.get('infowindow');
      if (isPresent(infowindow)) {
        this.set('isOpen', false);
        infowindow.close();
      }
    },

    mapWasSet: observer('map', function () {
      run.once(this, 'setMap');
    }),

    setMap: function setMap() {
      if (this.get('hasMarker') === false) {
        this.open();
      }
    },

    markerWasSet: observer('marker', function () {
      run.once(this, 'setMarker');
    }),

    setMarker: function setMarker() {
      var map = this.get('map');
      var marker = this.get('marker');
      var context = this.get('mapContext');
      var infowindow = this.get('infowindow');

      if (isPresent(infowindow) && isPresent(map) && isPresent(marker)) {
        var openEvent = this.retrieveOpenEvent();
        var closeEvent = this.retrieveCloseEvent();
        context.registerInfowindow(this, openEvent, closeEvent);
      }
    },

    coordsChanged: observer('lat', 'lng', function () {
      run.once(this, 'setPosition');
    }),

    setPosition: function setPosition() {
      var infowindow = this.get('infowindow');
      var lat = this.get('lat');
      var lng = this.get('lng');

      if (isPresent(infowindow) && isPresent(lat) && isPresent(lng) && typeof FastBoot === 'undefined') {
        var position = new google.maps.LatLng(lat, lng);
        infowindow.setPosition(position);
      }
    },

    retrieveOpenEvent: function retrieveOpenEvent() {
      var openEvent = this.get('openOn');
      return OPEN_CLOSE_EVENTS.contains(openEvent) ? openEvent : 'click';
    },

    retrieveCloseEvent: function retrieveCloseEvent() {
      var closeEvent = this.get('closeOn');
      return OPEN_CLOSE_EVENTS.contains(closeEvent) ? closeEvent : null;
    }
  });

  GMapInfowindowComponent.reopenClass({
    positionalParams: ['mapContext']
  });

  exports['default'] = GMapInfowindowComponent;
});