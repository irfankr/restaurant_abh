import Ember from 'ember';

export default Ember.Controller.extend({
  remainingTime: '00:10',
  init: function(){
    var self = this;
    function countdownRemainingTime() {
        var myTime = self.get('remainingTime');
        var ss = myTime.split(":");
        var dt = new Date();
        dt.setHours(0);
        dt.setMinutes(ss[0]);
        dt.setSeconds(ss[1]);

        var dt2 = new Date(dt.valueOf() - 1000);
        var temp = dt2.toTimeString().split(" ");
        var ts = temp[0].split(":");

        self.set('remainingTime', ts[1]+":"+ts[2]);

        if(self.get('remainingTime') == "00:00"){
          clearTimeout(t);
          history.go(-1);
        } else {
          var t = setTimeout(countdownRemainingTime, 1000);
        }

    }

    countdownRemainingTime()
  }
});
