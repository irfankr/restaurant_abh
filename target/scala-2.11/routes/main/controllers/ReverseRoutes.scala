
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/irfank/Play_applications/restaurant_abh/conf/routes
// @DATE:Mon May 30 10:20:14 CEST 2016

import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset
import _root_.play.libs.F

// @LINE:6
package controllers {

  // @LINE:25
  class ReverseRestaurantController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:31
    def restaurantVote(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/v1/restaurantVote")
    }
  
    // @LINE:30
    def getAllRestaurantsSortReservationsToday(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/allRestaurantsSortReservationsToday")
    }
  
    // @LINE:27
    def getRestaurantMenu(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/v1/getRestaurantMenu")
    }
  
    // @LINE:29
    def makeReservation(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/v1/makeReservation")
    }
  
    // @LINE:25
    def getAllRestaurants(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/getAllRestaurants")
    }
  
    // @LINE:26
    def getRestaurantDetails(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/v1/getRestaurantDetails")
    }
  
    // @LINE:28
    def getRestaurantsLocations(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/getRestaurantsLocations")
    }
  
  }

  // @LINE:6
  class ReverseAssets(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:6
    def versioned(file:Asset): Call = {
      implicit val _rrc = new ReverseRouteContext(Map(("path", "/public/ember/assets")))
      Call("GET", _prefix + { _defaultPrefix } + "assets/" + implicitly[PathBindable[Asset]].unbind("file", file))
    }
  
  }

  // @LINE:13
  class ReverseCountController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:13
    def count(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/count")
    }
  
  }

  // @LINE:33
  class ReverseReservationController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:34
    def getListOfReservationsForUser(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/getListOfReservationsForUser")
    }
  
    // @LINE:33
    def checkReservationAvailability(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/v1/checkReservationAvailability")
    }
  
  }

  // @LINE:20
  class ReverseUserController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:21
    def currentUser(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/currentUser")
    }
  
    // @LINE:22
    def logout(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/logout")
    }
  
    // @LINE:23
    def register(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/v1/register")
    }
  
    // @LINE:20
    def login(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/v1/login")
    }
  
  }

  // @LINE:36
  class ReverseHomeController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:36
    def index(slug:String): Call = {
    
      (slug: @unchecked) match {
      
        // @LINE:36
        case (slug) if slug == "" =>
          implicit val _rrc = new ReverseRouteContext(Map(("slug", "")))
          Call("GET", _prefix)
      
        // @LINE:37
        case (slug)  =>
          import ReverseRouteContext.empty
          Call("GET", _prefix + { _defaultPrefix } + implicitly[PathBindable[String]].unbind("slug", slug))
      
      }
    
    }
  
  }

  // @LINE:15
  class ReverseAsyncController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:15
    def message(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/message")
    }
  
  }


}
