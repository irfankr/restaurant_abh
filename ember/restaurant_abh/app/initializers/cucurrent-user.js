import User from '../models/user';

export function initialize(application) {
  var self = this;

  // application.inject('route', 'foo', 'service:foo');

  //Start waiting for response from Play
  application.deferReadiness();

  // fetch current user
  // - inject if user exists;
  // - nista

  return $.ajax({
    url: "/api/v1/currentUser",
    type: "GET",
    contentType: "application/json; charset=UTF-8",
  }).fail(function(data) {
    console.log(data);

    //Continue with app
    application.advanceReadiness();

    //self.transitionTo('login');
  }).then(function(data) {
    console.log(data);

    //Inject service
    application.inject('route', 'currentuserservice', 'service:currentuserservice');

    //Continue with app
    application.advanceReadiness();

    //return User.create(data);
  });


}

export default {
  user: 'current-user',
  initialize,
};
