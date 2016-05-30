define('ember-g-map/components/g-map-route-waypoint', ['exports', 'ember', 'ember-g-map/templates/components/g-map-route-waypoint', 'ember-g-map/components/g-map-route'], function (exports, _ember, _emberGMapTemplatesComponentsGMapRouteWaypoint, _emberGMapComponentsGMapRoute) {
  'use strict';

  var isEmpty = _ember['default'].isEmpty;
  var isPresent = _ember['default'].isPresent;
  var observer = _ember['default'].observer;
  var computed = _ember['default'].computed;
  var run = _ember['default'].run;
  var assert = _ember['default'].assert;

  var GMapRouteWaypointComponent = _ember['default'].Component.extend({
    layout: _emberGMapTemplatesComponentsGMapRouteWaypoint['default'],
    classNames: ['g-map-route-waypoint'],

    map: computed.alias('routeContext.map'),

    init: function init() {
      this._super(arguments);
      if (isEmpty(this.stopover)) {
        this.stopover = true;
      }

      var routeContext = this.get('routeContext');
      assert('Must be inside {{#g-map-route}} component with routeContext set', routeContext instanceof _emberGMapComponentsGMapRoute['default']);
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

  exports['default'] = GMapRouteWaypointComponent;
});