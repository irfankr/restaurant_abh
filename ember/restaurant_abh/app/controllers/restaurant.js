import Ember from 'ember';
import Reservation from '../models/reservation';

export default Ember.Controller.extend({
  currentReservation: Ember.inject.service(),
  selectPeople: ['2 people', '3 people', '4 people', '5 people', '6 people', '7 people', '8 people', '9 people', '10 people', '11 people', '12 people'],
  selectHour: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'],
  selectDate: [],
  reservation: Reservation.create(),
  tablesAvailable: null,
  bestTime: [],

  tempReservationDate:null,
  tempTodayDate:null,

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
  },
   actions: {
     showMenu: function(post, restaurantId){
       var self = this;

       //Change style of clicked element
       $(".restaurant_menu_item_title a:link").removeClass("active");
       $(".menu_title_" + post).addClass("active");

       //Load new menu list
       $.ajax({ //No return here
           url: "/api/v1/getRestaurantMenu",
           type: "POST",
           data: '{"idRestaurant":"'+restaurantId+'", "type":"'+post+'"}',
           processData: false,
           async:false, //Need to wait
           contentType: "application/json; charset=UTF-8",
         }).fail(function(data) {
           console.log(data);
         }).then(function(data) {
           self.set('model.restaurantMenu', data);
         });
     },
     findATable: function(idRestaurant){
         var self = this;

        //Add restaurant ID to object
        this.set('reservation.idRestaurant', idRestaurant);

        //Extract date in MMM d, yyyy hh:mm a format and set to reservation date
        var dateExtracted = self.get('tempReservationDate').toString().split(" ");
        //Set insert date in valid format in session
        this.set('reservation.date', dateExtracted[1] + " " + dateExtracted[2] + ", " + dateExtracted[3]);

        //Check for available tables
        if(this.get('reservation.people') == null || this.get('tempReservationDate') == null || this.get('reservation.hour') == null){
          //Display error
          $(".registerNotifications").show();
          $(".registerNotifications .alertText").html('All fields are required!');
        } else {
          //Send POST request
          $.ajax({ //No return here
              url: "/api/v1/checkReservationAvailability",
              type: "POST",
              data: JSON.stringify(this.get('reservation')),
              processData: false,
              async:false, //Need to wait
              contentType: "application/json; charset=UTF-8",
          }).fail(function(data) {
              console.log(data);

              //Display error
              $(".registerNotifications").show();

              self.set('tablesAvailable', null);
              self.set('bestTime', []);
          }).then(function(data) {
              //Display error
              $(".registerNotifications").hide();

              self.set('tablesAvailable', data.tablesLeft);
              self.set('bestTime', data.bestTime);
          });

          console.log(JSON.stringify(this.get('reservation')));
        }

     },
     proceedToReservationComplete: function(time, restaurantId, restaurantName, restaurantImageFilename){
      //Set chosen time
      this.set('reservation.hour', time);

      //Test echo reservation
      console.log(JSON.stringify(this.get('reservation')));

      //Add data about reservation to service
      this.get('currentReservation').setReservation(this.get('reservation'), restaurantId, restaurantName, restaurantImageFilename);

      //Transition to route
      this.transitionToRoute('completereservation');
     },
     //Scrool to segment
     moveToSegment(idDiv){
        $('html, body').animate({
            scrollTop: $("#" + idDiv).offset().top
        }, 2000);
     },
     //When date is changed set check is today do remove previous hours
     changeDate: function(){
        this.setAvailableHours();
     }

   }
});
