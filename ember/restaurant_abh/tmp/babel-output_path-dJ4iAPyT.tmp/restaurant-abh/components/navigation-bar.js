define("restaurant-abh/components/navigation-bar", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    currentUser: _ember["default"].inject.service(),
    actions: {
      logOut: function logOut() {
        var self = this;

        //Send POST to Play vote route
        $.ajax({
          url: "/api/v1/logout",
          type: "GET",
          processData: false,
          contentType: "application/json; charset=UTF-8"
        }).fail(function (data) {
          console.log(data);
        }).done(function (data) {
          window.location.reload();
        });
      }
    }
  });
});