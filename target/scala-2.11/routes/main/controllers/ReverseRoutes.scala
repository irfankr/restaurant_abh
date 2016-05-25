
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/irfank/Play_applications/restaurant_abh/conf/routes
// @DATE:Wed May 25 13:25:27 CEST 2016

import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset
import _root_.play.libs.F

// @LINE:6
package controllers {

  // @LINE:24
  class ReverseRestaurantController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:25
    def getRestaurantDetails(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/v1/getRestaurantDetails")
    }
  
    // @LINE:24
    def getAllRestaurants(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/getAllRestaurants")
    }
  
    // @LINE:26
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

  // @LINE:12
  class ReverseCountController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:12
    def count(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/count")
    }
  
  }

  // @LINE:19
  class ReverseUserController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:20
    def currentUser(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/currentUser")
    }
  
    // @LINE:21
    def logout(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/logout")
    }
  
    // @LINE:22
    def register(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/v1/register")
    }
  
    // @LINE:19
    def login(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "api/v1/login")
    }
  
  }

  // @LINE:28
  class ReverseHomeController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:28
    def index(slug:String): Call = {
    
      (slug: @unchecked) match {
      
        // @LINE:28
        case (slug) if slug == "" =>
          implicit val _rrc = new ReverseRouteContext(Map(("slug", "")))
          Call("GET", _prefix)
      
        // @LINE:29
        case (slug)  =>
          import ReverseRouteContext.empty
          Call("GET", _prefix + { _defaultPrefix } + implicitly[PathBindable[String]].unbind("slug", slug))
      
      }
    
    }
  
  }

  // @LINE:14
  class ReverseAsyncController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:14
    def message(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "api/v1/message")
    }
  
  }


}
