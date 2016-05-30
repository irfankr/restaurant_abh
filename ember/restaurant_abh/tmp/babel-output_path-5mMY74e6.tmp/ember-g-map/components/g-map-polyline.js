define('ember-g-map/components/g-map-polyline', ['exports', 'ember', 'ember-g-map/templates/components/g-map-polyline', 'ember-g-map/components/g-map', 'ember-g-map/utils/compact'], function (exports, _ember, _emberGMapTemplatesComponentsGMapPolyline, _emberGMapComponentsGMap, _emberGMapUtilsCompact) {
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

  var allowedPolylineOptions = _ember['default'].A(['strokeColor', 'strokeWeight', 'strokeOpacity', 'zIndex']);

  var GMapPolylineComponent = _ember['default'].Component.extend({
    layout: _emberGMapTemplatesComponentsGMapPolyline['default'],
    classNames: ['g-map-polyline'],

    map: computed.alias('mapContext.map'),

    init: function init() {
      this._super(arguments);
      this.infowindow = null;
      this.set('coordinates', _ember['default'].A());
      if (isEmpty(this.get('group'))) {
        this.set('group', null);
      }

      var mapContext = this.get('mapContext');
      assert('Must be inside {{#g-map}} component with context set', mapContext instanceof _emberGMapComponentsGMap['default']);

      mapContext.registerPolyline(this);
    },

    didInsertElement: function didInsertElement() {
      this._super();
      if (isEmpty(this.get('polyline'))) {
        var options = (0, _emberGMapUtilsCompact['default'])(this.getProperties(allowedPolylineOptions));
        var polyline = new google.maps.Polyline(options);
        this.set('polyline', polyline);
      }
      this.setMap();
      this.setPath();
      this.updatePolylineOptions();
      this.setOnClick();
    },

    willDestroyElement: function willDestroyElement() {
      this.unsetPolylineFromMap();
      this.get('mapContext').unregisterPolyline(this);
    },

    registerCoordinate: function registerCoordinate(coordinate) {
      this.get('coordinates').addObject(coordinate);
    },

    unregisterCoordinate: function unregisterCoordinate(coordinate) {
      this.get('coordinates').removeObject(coordinate);
      this.setPath();
    },

    unsetPolylineFromMap: function unsetPolylineFromMap() {
      var polyline = this.get('polyline');
      if (isPresent(polyline)) {
        polyline.setMap(null);
      }
    },

    mapWasSet: observer('map', function () {
      run.once(this, 'setMap');
    }),

    setMap: function setMap() {
      var map = this.get('map');
      var polyline = this.get('polyline');

      if (isPresent(polyline) && isPresent(map)) {
        polyline.setMap(map);
      }
    },

    setPath: function setPath() {
      var polyline = this.get('polyline');
      var coordinates = this.get('coordinates');

      if (isPresent(polyline) && isPresent(coordinates)) {
        var coordArray = _ember['default'].A(this.get('coordinates').mapBy('coordinate')).compact();
        polyline.setPath(coordArray);
      }
    },

    polylineOptionsChanged: observer.apply(undefined, _toConsumableArray(allowedPolylineOptions).concat([function () {
      run.once(this, 'updatePolylineOptions');
    }])),

    updatePolylineOptions: function updatePolylineOptions() {
      var polyline = this.get('polyline');
      var options = (0, _emberGMapUtilsCompact['default'])(this.getProperties(allowedPolylineOptions));

      if (isPresent(polyline) && isPresent(Object.keys(options))) {
        polyline.setOptions(options);
      }
    },

    setOnClick: function setOnClick() {
      var _this = this;

      var polyline = this.get('polyline');
      if (isPresent(polyline)) {
        polyline.addListener('click', function () {
          return _this.sendOnClick();
        });
      }
    },

    sendOnClick: function sendOnClick() {
      var onClick = this.attrs.onClick;

      if (typeOf(onClick) === 'function') {
        onClick();
      } else {
        this.sendAction('onClick');
      }
    }
  });

  GMapPolylineComponent.reopenClass({
    positionalParams: ['mapContext']
  });

  exports['default'] = GMapPolylineComponent;
});