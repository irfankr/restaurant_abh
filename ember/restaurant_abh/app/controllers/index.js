import Ember from 'ember';
import Reservation from '../models/reservation';

export default Ember.Controller.extend({
  currentReservation: Ember.inject.service(),
  reservation: Reservation.create(),

  selectPeople: ['2 people', '3 people', '4 people', '5 people', '6 people', '7 people', '8 people', '9 people', '10 people', '11 people', '12 people'],
  selectHour: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'],
  selectDate: [],

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
  },
  actions: {
    clickLocation: function(location){
      this.transitionToRoute('/restaurants/1?location=' + location);
    },
    findATable: function(idRestaurant){
      console.log(this.get('reservation'));

      //Add data about reservation to service
      this.get('currentReservation').setReservation(this.get('reservation'));

      //Transition to route
      this.transitionToRoute('findtable');

    },
    //When date is changed set check is today do remove previous hours
    changeDate: function(){

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

       if(this.get('reservation.date') == month[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear()){

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

    }
  }
});
