define('ember-g-map/components/g-map-route-address-waypoint', ['exports', 'ember', 'ember-g-map/templates/components/g-map-route-address-waypoint'], function (exports, _ember, _emberGMapTemplatesComponentsGMapRouteAddressWaypoint) {
  'use strict';

  var isEmpty = _ember['default'].isEmpty;
  var isPresent = _ember['default'].isPresent;
  var observer = _ember['default'].observer;
  var computed = _ember['default'].computed;
  var run = _ember['default'].run;

  var GMapRouteAddressWaypointComponent = _ember['default'].Component.extend({
    layout: _emberGMapTemplatesComponentsGMapRouteAddressWaypoint['default'],
    classNames: ['g-map-route-address-waypoint'],

    map: computed.alias('routeContext.map'),

    didInsertElement: function didInsertElement() {
      this._super();
      this.initPlacesService();
    },

    initPlacesService: _ember['default'].observer('map', function () {
      var map = this.get('map');
      var service = this.get('placesService');

      if (isPresent(map) && isEmpty(service) && typeof FastBoot === 'undefined') {
        service = new google.maps.places.PlacesService(map);
        this.set('placesService', service);

        this.searchLocation();
      }
    }),

    onAddressChanged: observer('address', function () {
      run.once(this, 'searchLocation');
    }),

    searchLocation: function searchLocation() {
      var _this = this;

      var service = this.get('placesService');
      var address = this.get('address');

      if (isPresent(service) && isPresent(address)) {
        var request = { query: address };

        service.textSearch(request, function (results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
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
    }
  });

  GMapRouteAddressWaypointComponent.reopenClass({
    positionalParams: ['routeContext']
  });

  exports['default'] = GMapRouteAddressWaypointComponent;
});