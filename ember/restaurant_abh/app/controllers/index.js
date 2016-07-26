import Ember from 'ember';
import Reservation from '../models/reservation';
import Notification from '../models/notification';
import Filter from '../models/filter';

export default Ember.Controller.extend({
  currentReservation: Ember.inject.service(),
  reservation: Reservation.create(),
  notification: Notification.create(),
  tempReservationDate:null,
  tempTodayDate:null,
  filter: Filter.create(),
  searchTextRestaurants: null,

  listNearestRestaurants: null,
  showNearestRestaurants: false,


  selectPeople: ['2 people', '3 people', '4 people', '5 people', '6 people', '7 people', '8 people', '9 people', '10 people', '11 people', '12 people'],
  selectHour: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'],
  selectDate: [],

  setAvailableHours: function(){
    var self = this;

    var month = new Array(); month[0] = "Jan"; month[1] = "Feb"; month[2] = "Mar"; month[3] = "Apr"; month[4] = "May"; month[5] = "Jun"; month[6] = "Jul"; month[7] = "Aug"; month[8] = "Sep"; month[9] = "Oct"; month[10] = "Nov"; month[11] = "Dec";

   var currentDate = new Date();
   var hoursArray = this.get('selectHour');

   function convertFrom24HtoAMPM(Time){
     var hour = Time.getHours();
     var minute = Time.getMinutes();
     var amPmString = "";

     if(hour >= 12){
       amPmString = "PM";

       if(hour > 12) hour = hour*1 - 12;
     } else {
       amPmString = "AM";
     }

     //Format string for output
     if(hour >= 1 && hour <= 9) hour = "0" + hour;
     if(minute == 0) minute = "0" + minute;

     return hour + ":" + minute + " " + amPmString;
   }

   //Extract date in MMM d, yyyy hh:mm a format
   var dateExtracted = self.get('tempReservationDate').toString().split(" ");
   //Set insert date in valid format in session
   var reservationDate = dateExtracted[1] + " " + dateExtracted[2] + ", " + dateExtracted[3];

   var dateExtractedToday = currentDate.toString().split(" ");
    //Set insert date in valid format in session
    var todayDate = dateExtractedToday[1] + " " + dateExtractedToday[2] + ", " + dateExtractedToday[3];

   if(reservationDate == todayDate){
       //User current selectHour array
       this.set('selectHour', []);

       for(var i=0; i<hoursArray.length; i++){

           var firstSplit = hoursArray[i].split(" ");
           var hourMinutePart = firstSplit[0].split(":");

           if(firstSplit[1] == "PM" && hourMinutePart[0] != "12"){
             hourMinutePart[0] = hourMinutePart[0]*1 + 12;
           }

           //console.log(hourMinutePart[0]+" "+hourMinutePart[1]);
           var checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hourMinutePart[0], hourMinutePart[1]);

           //Create list of hours that are later than current for today
           if(checkDate > currentDate){
             //console.log(convertFrom24HtoAMPM(checkDate));

             //Add new dates
             self.get('selectHour').push(convertFrom24HtoAMPM(checkDate));
           }
       }
   } else {

       self.set('selectHour', ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM']);

   }
  },

  init(){
    //Unset all reservations
    this.get('currentReservation').removeReservation();

    //Generate date select list
    var date = new Date();
    var month = new Array(); month[0] = "Jan"; month[1] = "Feb"; month[2] = "Mar"; month[3] = "Apr"; month[4] = "May"; month[5] = "Jun"; month[6] = "Jul"; month[7] = "Aug"; month[8] = "Sep"; month[9] = "Oct"; month[10] = "Nov"; month[11] = "Dec";
    //tomorrow.setDate(tomorrow.getDate() + 1);

    for(var i=0; i<=5; i++){
      date.setDate(date.getDate() + i);
      //console.log(month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
      this.get('selectDate').push(month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
      var date = new Date();
    }

    //Set today as default
    this.set('tempReservationDate', new Date());
    this.set('tempTodayDate', new Date());
    this.setAvailableHours();
    this.set('searchTextRestaurants', "");
  },

  onFilterTextChange: function() {
    //Wait 500ms second before applying the filter
    Ember.run.debounce(this, this.getRestaurantsByFilter, 500);
  }.observes('reservation.searchText'),

  getRestaurantsByFilter: function(){
    var self = this;

    if(self.get('reservation.searchText') != "" && self.get('reservation.searchText') != null && self.get('reservation.searchText') != "undefined" && self.get('reservation.searchText').length > 1){

      //Set additional data
      this.set('filter.itemsPerPage', 5);
      this.set('filter.pageNumber', 1);
      this.set('filter.searchText', self.get('reservation.searchText'));
      var data = JSON.stringify(self.get('filter'));

      //Search for restaurants with this filter
      $.ajax({ //No return here
        url: "/api/v1/admin/getFilteredRestaurants",
        type: "POST",
        data: data,
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        console.log(data.restaurants);
        self.set('searchTextRestaurants', data.restaurants);

        $(".suggestion_box_container").show();
        $(document).mouseup(function (e){
            var container = $(".suggestion_box_container");

            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                container.hide();

                //Empty suggested list
                self.set('searchTextRestaurants', null);

            }
        });
      });

     } else {
      self.set('searchTextRestaurants', null);
     }

  },

  actions: {
    clickLocation: function(location){
      this.transitionToRoute('/restaurants/1?location=' + location);
    },
    findATable: function(idRestaurant){
      var self = this;

      console.log(this.get('reservation'));

      if(this.get('reservation.people') == null){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'How many people field is empty!');
      } else if(this.get('reservation.hour') == null){
        //Display notification
        self.set('notification.visible', true);
        self.set('notification.classStyle', 'alert-danger');
        self.set('notification.text', 'Reservation hour field is empty!');
      } else {
        //Display notification
        self.set('notification.visible', false);

        //Extract date in MMM d, yyyy hh:mm a format
        var dateExtracted = self.get('tempReservationDate').toString().split(" ");
        //Set insert date in valid format in session
        this.set('reservation.date', dateExtracted[1] + " " + dateExtracted[2] + ", " + dateExtracted[3]);

        //Add data about reservation to service
        console.log(this.get('reservation'));
        this.get('currentReservation').setReservation(this.get('reservation'));

        //Transition to route
        this.transitionToRoute('findtable');
      }

    },
    //When date is changed set check is today do remove previous hours
    changeDate: function(){
       this.setAvailableHours();
    },
    pickSuggestedRestaurant: function(string){
      //Remove observer
      this.removeObserver('reservation.searchText', self, "onFilterTextChange");

      //Put suggested value in search box
      this.set('reservation.searchText', string);

      //Again return observer
      this.addObserver('reservation.searchText', self, "onFilterTextChange");

      //Empty suggested list
      this.set('searchTextRestaurants', null);
    }
  },

  loadNearestRestaurants: function(){
    var self = this;

    if(self.get('model.currentLocationCoordinates').length > 0 && self.get('model.currentLocationCoordinates') != "undefined"){

      //Return nearest restaurants
      $.ajax({ //No return here
        url: "/api/v1/getAllNearestRestaurants",
        type: "POST",
        data: '{"latitude":'+self.get('model.currentLocationCoordinates')[0]+', "longitude":'+self.get('model.currentLocationCoordinates')[1]+'}',
        processData: false,
        async:false, //Need to wait
        contentType: "application/json; charset=UTF-8",
      }).fail(function(data) {
        console.log(data);
      }).then(function(data) {
        self.set('listNearestRestaurants', data);
        self.set('showNearestRestaurants', true);
      });
    } else {
       self.set('showNearestRestaurants', false);
    }

  }.observes('model.currentLocationCoordinates')

});
