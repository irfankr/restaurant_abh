define('restaurant-abh/controllers/restaurant', ['exports', 'ember', 'restaurant-abh/models/reservation'], function (exports, _ember, _restaurantAbhModelsReservation) {
  exports['default'] = _ember['default'].Controller.extend({
    currentReservation: _ember['default'].inject.service(),
    selectPeople: ['2 people', '3 people', '4 people', '5 people', '6 people', '7 people', '8 people', '9 people', '10 people', '11 people', '12 people'],
    selectHour: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'],
    selectDate: [],
    reservation: _restaurantAbhModelsReservation['default'].create(),
    init: function init() {
      //Generate date select list
      var date = new Date();
      var month = new Array();month[0] = "Jan";month[1] = "Feb";month[2] = "Mar";month[3] = "Apr";month[4] = "May";month[5] = "Jun";month[6] = "Jul";month[7] = "Aug";month[8] = "Sep";month[9] = "Oct";month[10] = "Nov";month[11] = "Dec";
      //tomorrow.setDate(tomorrow.getDate() + 1);

      for (var i = 0; i <= 5; i++) {
        date.setDate(date.getDate() + i);
        //console.log(month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
        this.get('selectDate').push(month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
        var date = new Date();
      }
    },
    actions: {
      showMenu: function showMenu(post, restaurantId) {
        var self = this;

        //Change style of clicked element
        $(".restaurant_menu_item_title a:link").removeClass("active");
        $(".menu_title_" + post).addClass("active");

        //Load new menu list
        $.ajax({ //No return here
          url: "/api/v1/getRestaurantMenu",
          type: "POST",
          data: '{"idRestaurant":"' + restaurantId + '", "type":"' + post + '"}',
          processData: false,
          async: false, //Need to wait
          contentType: "application/json; charset=UTF-8"
        }).fail(function (data) {
          console.log(data);
        }).then(function (data) {
          self.set('model.restaurantMenu', data);
        });
      },
      findATable: function findATable(idRestaurant) {
        //Add restaurant ID to object
        this.set('reservation.idRestaurant', idRestaurant);

        //Send POST request
        $.ajax({ //No return here
          url: "/api/v1/checkReservationAvailability",
          type: "POST",
          data: JSON.stringify(this.get('reservation')),
          processData: false,
          async: false, //Need to wait
          contentType: "application/json; charset=UTF-8"
        }).fail(function (data) {
          console.log(data);
        }).then(function (data) {
          console.log(data);
        });

        console.log(JSON.stringify(this.get('reservation')));
      },
      proceedToReservationComplete: function proceedToReservationComplete(time, restaurantId, restaurantName, restaurantImageFilename) {
        //Set chosen time
        this.set('reservation.hour', time);

        //Test echo reservation
        console.log(JSON.stringify(this.get('reservation')));

        //Add data about reservation to service
        this.get('currentReservation').setReservation(this.get('reservation'), restaurantId, restaurantName, restaurantImageFilename);

        //Transition to route
        this.transitionToRoute('completereservation');
      }
    }
  });
});