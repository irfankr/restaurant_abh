define('restaurant-abh/controllers/completereservation', ['exports', 'ember', 'restaurant-abh/models/user'], function (exports, _ember, _restaurantAbhModelsUser) {
    exports['default'] = _ember['default'].Controller.extend({
        currentReservation: _ember['default'].inject.service(),
        currentUser: _ember['default'].inject.service(),
        user: _restaurantAbhModelsUser['default'].create(),

        countries: ['Bosnia and Herzegovina', 'Serbia', 'Croatia'],
        cities: [],
        user: _restaurantAbhModelsUser['default'].create(),
        remainingTime: '03:00',

        init: function init() {
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

                self.set('remainingTime', ts[1] + ":" + ts[2]);

                if (self.get('remainingTime') == "00:00") {
                    clearTimeout(t);
                    //history.go(-1);
                } else {
                        var t = setTimeout(countdownRemainingTime, 1000);
                    }
            }

            countdownRemainingTime();
        },
        actions: {
            completeReservation: function completeReservation() {
                var self = this;

                //Send reservation for this user
                var user = this.get('user');

                function makeReservation() {
                    //Set user details
                    $.ajax({ //No return here
                        url: "/api/v1/makeReservation",
                        type: "POST",
                        data: '{"idRestaurant":"' + self.get('currentReservation.restaurandId') + '", "persons":"' + self.get('currentReservation.people') + '", "reservationDate":"' + self.get('currentReservation.date') + '", "reservationHour":"' + self.get('currentReservation.hour') + '"}',
                        processData: false,
                        async: false, //Need to wait
                        contentType: "application/json; charset=UTF-8"
                    }).fail(function (data) {
                        console.log(data);
                    }).then(function (data) {
                        //Display notification that reservation is created
                    });
                }

                //Check is user logged in
                if (this.get('currentUser.userLoggedIn') == true) {

                    //Make reservation
                    makeReservation();
                } else {
                    //if not, registration is required

                    var isValidEmailAddress = function isValidEmailAddress(emailAddress) {
                        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                        return pattern.test(emailAddress);
                    }

                    //Check all fields required
                    ;

                    if (user.get('firstName') == null || user.get('lastName') == null || user.get('email') == null || user.get('phone') == null || user.get('password') == null || user.get('city') == null || user.get('country') == null) {

                        //Display alert
                        $(".registerNotifications").show();
                        //Change alert class
                        $(".alert").addClass('alert-danger').removeClass('alert-success');
                        //Set alert text
                        $(".alertText").html('<strong>Warning!</strong> All fields are required.');
                    } else if (!isValidEmailAddress(user.get('email'))) {

                        //Display alert
                        $(".registerNotifications").show();
                        //Change alert class
                        $(".alert").addClass('alert-danger').removeClass('alert-success');
                        //Set alert text
                        $(".alertText").html('<strong>Warning!</strong> Email is not valid.');
                    } else if (user.get('password') != user.get('confirmpassword')) {

                        //Display alert
                        $(".registerNotifications").show();
                        //Change alert class
                        $(".alert").addClass('alert-danger').removeClass('alert-success');
                        //Set alert text
                        $(".alertText").html('<strong>Warning!</strong> Password and Confirm password don\'t match.');
                    } else {
                        //var data = '{"firstName":"'+firstName+'","lastName":"'+lastName+'","email":"'+email+'","phone":"'+phone+'","password":"'+password+'","country":"'+country+'","city":"'+city+'"}';

                        var data = JSON.stringify(this.get('user'));

                        //Display successfull notification
                        $(".registerNotifications").show();
                        //Change alert class
                        $(".alert").addClass('alert-success').removeClass('alert-danger');
                        //Set alert text
                        $(".alertText").html('<strong>Success!</strong> Reservation is created successfully!');

                        //Sent POST to Play route
                        $.ajax({
                            url: "/api/v1/register",
                            type: "POST",
                            data: data,
                            processData: false,
                            async: false, //Need to wait
                            contentType: "application/json; charset=UTF-8"
                        }).fail(function (data) {
                            console.log(data);
                        }).then(function (data) {
                            //Make reservation
                            makeReservation();
                        });
                    }
                }
            },
            //When change value in select list call this function
            changeCity: function changeCity() {
                if (this.get('user.country') == "Bosnia and Herzegovina") {
                    this.set('cities', ['Sarajevo', 'Zenica', 'Banja Luka']);
                } else if (this.get('user.country') == "Serbia") {
                    this.set('cities', ['Belgrade', 'Novi Sad', 'Kragujevac']);
                } else if (this.get('user.country') == "Croatia") {
                    this.set('cities', ['Zagreb', 'Split', 'Zadar']);
                }
            }
        }
    });
});