define('ember-g-map/components/g-map-polyline-coordinate', ['exports', 'ember', 'ember-g-map/templates/components/g-map-polyline-coordinate', 'ember-g-map/components/g-map-polyline'], function (exports, _ember, _emberGMapTemplatesComponentsGMapPolylineCoordinate, _emberGMapComponentsGMapPolyline) {
  'use strict';

  var isEmpty = _ember['default'].isEmpty;
  var isPresent = _ember['default'].isPresent;
  var observer = _ember['default'].observer;
  var computed = _ember['default'].computed;
  var run = _ember['default'].run;
  var assert = _ember['default'].assert;

  var GMapPolylineCoordinateComponent = _ember['default'].Component.extend({
    layout: _emberGMapTemplatesComponentsGMapPolylineCoordinate['default'],
    classNames: ['g-map-polyline-coordinate'],

    polyline: computed.alias('polylineContext.polyline'),

    init: function init() {
      this._super(arguments);

      var polylineContext = this.get('polylineContext');
      assert('Must be inside {{#g-map-polyline}} component with context set', polylineContext instanceof _emberGMapComponentsGMapPolyline['default']);

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

  exports['default'] = GMapPolylineCoordinateComponent;
});