import Ember from 'ember';

export default Ember.Controller.extend({
  selectPeople: ['2 people', '3 people', '4 people', '5 people', '6 people', '7 people', '8 people', '9 people', '10 people', '11 people', '12 people'],
  selectHour: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '13:00 PM', '13:30 PM', '14:00 PM', '14:30 PM', '15:00 PM', '15:30 PM', '16:00 PM', '16:30 PM', '17:00 PM', '17:30 PM', '18:00 PM', '18:30 PM', '19:00 PM', '19:30 PM', '20:00 PM', '20:30 PM', '21:00 PM', '21:30 PM', '22:00 PM'],
  selectDate: [],
  init(){
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
  }
});
