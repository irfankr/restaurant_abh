define('ember-g-map/components/g-map-address-marker', ['exports', 'ember', 'ember-g-map/templates/components/g-map-address-marker'], function (exports, _ember, _emberGMapTemplatesComponentsGMapAddressMarker) {
  'use strict';

  var _slice = Array.prototype.slice;

  /* global google */

  var computed = _ember['default'].computed;
  var observer = _ember['default'].observer;
  var run = _ember['default'].run;
  var isPresent = _ember['default'].isPresent;
  var isEmpty = _ember['default'].isEmpty;
  var typeOf = _ember['default'].typeOf;

  var GMapAddressMarkerComponent = _ember['default'].Component.extend({
    layout: _emberGMapTemplatesComponentsGMapAddressMarker['default'],
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

  exports['default'] = GMapAddressMarkerComponent;
});