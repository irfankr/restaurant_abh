import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    changeCity: function(){
      var cities;

      if(this.get('model.user.country') == "Bosnia and Herzegovina"){
        cities = ['Sarajevo', 'Zenica', 'Banja Luka'];
      } else if(this.get('model.user.country') == "Serbia"){
        cities = ['Belgrade', 'Novi Sad', 'Kragujevac'];
      } else if(this.get('model.user.country') == "Croatia"){
        cities = ['Zagreb', 'Split', 'Zadar'];
      }



      this.send('changeCityInRoute', cities);
    }
  }
});
