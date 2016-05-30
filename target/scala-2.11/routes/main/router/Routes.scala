
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/irfank/Play_applications/restaurant_abh/conf/routes
// @DATE:Mon May 30 10:20:14 CEST 2016

package router

import play.core.routing._
import play.core.routing.HandlerInvokerFactory._
import play.core.j._

import play.api.mvc._

import _root_.controllers.Assets.Asset
import _root_.play.libs.F

class Routes(
  override val errorHandler: play.api.http.HttpErrorHandler, 
  // @LINE:6
  Assets_6: controllers.Assets,
  // @LINE:13
  CountController_0: controllers.CountController,
  // @LINE:15
  AsyncController_2: controllers.AsyncController,
  // @LINE:20
  UserController_4: controllers.UserController,
  // @LINE:25
  RestaurantController_3: controllers.RestaurantController,
  // @LINE:33
  ReservationController_5: controllers.ReservationController,
  // @LINE:36
  HomeController_1: controllers.HomeController,
  val prefix: String
) extends GeneratedRouter {

   @javax.inject.Inject()
   def this(errorHandler: play.api.http.HttpErrorHandler,
    // @LINE:6
    Assets_6: controllers.Assets,
    // @LINE:13
    CountController_0: controllers.CountController,
    // @LINE:15
    AsyncController_2: controllers.AsyncController,
    // @LINE:20
    UserController_4: controllers.UserController,
    // @LINE:25
    RestaurantController_3: controllers.RestaurantController,
    // @LINE:33
    ReservationController_5: controllers.ReservationController,
    // @LINE:36
    HomeController_1: controllers.HomeController
  ) = this(errorHandler, Assets_6, CountController_0, AsyncController_2, UserController_4, RestaurantController_3, ReservationController_5, HomeController_1, "/")

  import ReverseRouteContext.empty

  def withPrefix(prefix: String): Routes = {
    router.RoutesPrefix.setPrefix(prefix)
    new Routes(errorHandler, Assets_6, CountController_0, AsyncController_2, UserController_4, RestaurantController_3, ReservationController_5, HomeController_1, prefix)
  }

  private[this] val defaultPrefix: String = {
    if (this.prefix.endsWith("/")) "" else "/"
  }

  def documentation = List(
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """assets/""" + "$" + """file<.+>""", """controllers.Assets.versioned(path:String = "/public/ember/assets", file:Asset)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/count""", """controllers.CountController.count"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/message""", """controllers.AsyncController.message"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/login""", """controllers.UserController.login"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/currentUser""", """controllers.UserController.currentUser"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/logout""", """controllers.UserController.logout"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/register""", """controllers.UserController.register"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/getAllRestaurants""", """controllers.RestaurantController.getAllRestaurants"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/getRestaurantDetails""", """controllers.RestaurantController.getRestaurantDetails"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/getRestaurantMenu""", """controllers.RestaurantController.getRestaurantMenu"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/getRestaurantsLocations""", """controllers.RestaurantController.getRestaurantsLocations"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/makeReservation""", """controllers.RestaurantController.makeReservation"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/allRestaurantsSortReservationsToday""", """controllers.RestaurantController.getAllRestaurantsSortReservationsToday"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/restaurantVote""", """controllers.RestaurantController.restaurantVote"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/checkReservationAvailability""", """controllers.ReservationController.checkReservationAvailability"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/getListOfReservationsForUser""", """controllers.ReservationController.getListOfReservationsForUser"""),
    ("""GET""", this.prefix, """controllers.HomeController.index(slug:String = "")"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """""" + "$" + """slug<.+>""", """controllers.HomeController.index(slug:String)"""),
    Nil
  ).foldLeft(List.empty[(String,String,String)]) { (s,e) => e.asInstanceOf[Any] match {
    case r @ (_,_,_) => s :+ r.asInstanceOf[(String,String,String)]
    case l => s ++ l.asInstanceOf[List[(String,String,String)]]
  }}


  // @LINE:6
  private[this] lazy val controllers_Assets_versioned0_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("assets/"), DynamicPart("file", """.+""",false)))
  )
  private[this] lazy val controllers_Assets_versioned0_invoker = createInvoker(
    Assets_6.versioned(fakeValue[String], fakeValue[Asset]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.Assets",
      "versioned",
      Seq(classOf[String], classOf[Asset]),
      "GET",
      """ Ember.JS files""",
      this.prefix + """assets/""" + "$" + """file<.+>"""
    )
  )

  // @LINE:13
  private[this] lazy val controllers_CountController_count1_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/count")))
  )
  private[this] lazy val controllers_CountController_count1_invoker = createInvoker(
    CountController_0.count,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.CountController",
      "count",
      Nil,
      "GET",
      """ An example controller showing a sample home page
 GET   /api/v1/                            controllers.HomeController.index
 An example controller showing how to use dependency injection""",
      this.prefix + """api/v1/count"""
    )
  )

  // @LINE:15
  private[this] lazy val controllers_AsyncController_message2_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/message")))
  )
  private[this] lazy val controllers_AsyncController_message2_invoker = createInvoker(
    AsyncController_2.message,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.AsyncController",
      "message",
      Nil,
      "GET",
      """ An example controller showing how to write asynchronous code""",
      this.prefix + """api/v1/message"""
    )
  )

  // @LINE:20
  private[this] lazy val controllers_UserController_login3_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/login")))
  )
  private[this] lazy val controllers_UserController_login3_invoker = createInvoker(
    UserController_4.login,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.UserController",
      "login",
      Nil,
      "POST",
      """""",
      this.prefix + """api/v1/login"""
    )
  )

  // @LINE:21
  private[this] lazy val controllers_UserController_currentUser4_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/currentUser")))
  )
  private[this] lazy val controllers_UserController_currentUser4_invoker = createInvoker(
    UserController_4.currentUser,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.UserController",
      "currentUser",
      Nil,
      "GET",
      """""",
      this.prefix + """api/v1/currentUser"""
    )
  )

  // @LINE:22
  private[this] lazy val controllers_UserController_logout5_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/logout")))
  )
  private[this] lazy val controllers_UserController_logout5_invoker = createInvoker(
    UserController_4.logout,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.UserController",
      "logout",
      Nil,
      "GET",
      """""",
      this.prefix + """api/v1/logout"""
    )
  )

  // @LINE:23
  private[this] lazy val controllers_UserController_register6_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/register")))
  )
  private[this] lazy val controllers_UserController_register6_invoker = createInvoker(
    UserController_4.register,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.UserController",
      "register",
      Nil,
      "POST",
      """""",
      this.prefix + """api/v1/register"""
    )
  )

  // @LINE:25
  private[this] lazy val controllers_RestaurantController_getAllRestaurants7_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/getAllRestaurants")))
  )
  private[this] lazy val controllers_RestaurantController_getAllRestaurants7_invoker = createInvoker(
    RestaurantController_3.getAllRestaurants,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.RestaurantController",
      "getAllRestaurants",
      Nil,
      "GET",
      """""",
      this.prefix + """api/v1/getAllRestaurants"""
    )
  )

  // @LINE:26
  private[this] lazy val controllers_RestaurantController_getRestaurantDetails8_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/getRestaurantDetails")))
  )
  private[this] lazy val controllers_RestaurantController_getRestaurantDetails8_invoker = createInvoker(
    RestaurantController_3.getRestaurantDetails,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.RestaurantController",
      "getRestaurantDetails",
      Nil,
      "POST",
      """""",
      this.prefix + """api/v1/getRestaurantDetails"""
    )
  )

  // @LINE:27
  private[this] lazy val controllers_RestaurantController_getRestaurantMenu9_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/getRestaurantMenu")))
  )
  private[this] lazy val controllers_RestaurantController_getRestaurantMenu9_invoker = createInvoker(
    RestaurantController_3.getRestaurantMenu,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.RestaurantController",
      "getRestaurantMenu",
      Nil,
      "POST",
      """""",
      this.prefix + """api/v1/getRestaurantMenu"""
    )
  )

  // @LINE:28
  private[this] lazy val controllers_RestaurantController_getRestaurantsLocations10_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/getRestaurantsLocations")))
  )
  private[this] lazy val controllers_RestaurantController_getRestaurantsLocations10_invoker = createInvoker(
    RestaurantController_3.getRestaurantsLocations,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.RestaurantController",
      "getRestaurantsLocations",
      Nil,
      "GET",
      """""",
      this.prefix + """api/v1/getRestaurantsLocations"""
    )
  )

  // @LINE:29
  private[this] lazy val controllers_RestaurantController_makeReservation11_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/makeReservation")))
  )
  private[this] lazy val controllers_RestaurantController_makeReservation11_invoker = createInvoker(
    RestaurantController_3.makeReservation,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.RestaurantController",
      "makeReservation",
      Nil,
      "POST",
      """""",
      this.prefix + """api/v1/makeReservation"""
    )
  )

  // @LINE:30
  private[this] lazy val controllers_RestaurantController_getAllRestaurantsSortReservationsToday12_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/allRestaurantsSortReservationsToday")))
  )
  private[this] lazy val controllers_RestaurantController_getAllRestaurantsSortReservationsToday12_invoker = createInvoker(
    RestaurantController_3.getAllRestaurantsSortReservationsToday,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.RestaurantController",
      "getAllRestaurantsSortReservationsToday",
      Nil,
      "GET",
      """""",
      this.prefix + """api/v1/allRestaurantsSortReservationsToday"""
    )
  )

  // @LINE:31
  private[this] lazy val controllers_RestaurantController_restaurantVote13_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/restaurantVote")))
  )
  private[this] lazy val controllers_RestaurantController_restaurantVote13_invoker = createInvoker(
    RestaurantController_3.restaurantVote,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.RestaurantController",
      "restaurantVote",
      Nil,
      "POST",
      """""",
      this.prefix + """api/v1/restaurantVote"""
    )
  )

  // @LINE:33
  private[this] lazy val controllers_ReservationController_checkReservationAvailability14_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/checkReservationAvailability")))
  )
  private[this] lazy val controllers_ReservationController_checkReservationAvailability14_invoker = createInvoker(
    ReservationController_5.checkReservationAvailability,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.ReservationController",
      "checkReservationAvailability",
      Nil,
      "POST",
      """""",
      this.prefix + """api/v1/checkReservationAvailability"""
    )
  )

  // @LINE:34
  private[this] lazy val controllers_ReservationController_getListOfReservationsForUser15_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/getListOfReservationsForUser")))
  )
  private[this] lazy val controllers_ReservationController_getListOfReservationsForUser15_invoker = createInvoker(
    ReservationController_5.getListOfReservationsForUser,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.ReservationController",
      "getListOfReservationsForUser",
      Nil,
      "GET",
      """""",
      this.prefix + """api/v1/getListOfReservationsForUser"""
    )
  )

  // @LINE:36
  private[this] lazy val controllers_HomeController_index16_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix)))
  )
  private[this] lazy val controllers_HomeController_index16_invoker = createInvoker(
    HomeController_1.index(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.HomeController",
      "index",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """"""
    )
  )

  // @LINE:37
  private[this] lazy val controllers_HomeController_index17_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), DynamicPart("slug", """.+""",false)))
  )
  private[this] lazy val controllers_HomeController_index17_invoker = createInvoker(
    HomeController_1.index(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.HomeController",
      "index",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """""" + "$" + """slug<.+>"""
    )
  )


  def routes: PartialFunction[RequestHeader, Handler] = {
  
    // @LINE:6
    case controllers_Assets_versioned0_route(params) =>
      call(Param[String]("path", Right("/public/ember/assets")), params.fromPath[Asset]("file", None)) { (path, file) =>
        controllers_Assets_versioned0_invoker.call(Assets_6.versioned(path, file))
      }
  
    // @LINE:13
    case controllers_CountController_count1_route(params) =>
      call { 
        controllers_CountController_count1_invoker.call(CountController_0.count)
      }
  
    // @LINE:15
    case controllers_AsyncController_message2_route(params) =>
      call { 
        controllers_AsyncController_message2_invoker.call(AsyncController_2.message)
      }
  
    // @LINE:20
    case controllers_UserController_login3_route(params) =>
      call { 
        controllers_UserController_login3_invoker.call(UserController_4.login)
      }
  
    // @LINE:21
    case controllers_UserController_currentUser4_route(params) =>
      call { 
        controllers_UserController_currentUser4_invoker.call(UserController_4.currentUser)
      }
  
    // @LINE:22
    case controllers_UserController_logout5_route(params) =>
      call { 
        controllers_UserController_logout5_invoker.call(UserController_4.logout)
      }
  
    // @LINE:23
    case controllers_UserController_register6_route(params) =>
      call { 
        controllers_UserController_register6_invoker.call(UserController_4.register)
      }
  
    // @LINE:25
    case controllers_RestaurantController_getAllRestaurants7_route(params) =>
      call { 
        controllers_RestaurantController_getAllRestaurants7_invoker.call(RestaurantController_3.getAllRestaurants)
      }
  
    // @LINE:26
    case controllers_RestaurantController_getRestaurantDetails8_route(params) =>
      call { 
        controllers_RestaurantController_getRestaurantDetails8_invoker.call(RestaurantController_3.getRestaurantDetails)
      }
  
    // @LINE:27
    case controllers_RestaurantController_getRestaurantMenu9_route(params) =>
      call { 
        controllers_RestaurantController_getRestaurantMenu9_invoker.call(RestaurantController_3.getRestaurantMenu)
      }
  
    // @LINE:28
    case controllers_RestaurantController_getRestaurantsLocations10_route(params) =>
      call { 
        controllers_RestaurantController_getRestaurantsLocations10_invoker.call(RestaurantController_3.getRestaurantsLocations)
      }
  
    // @LINE:29
    case controllers_RestaurantController_makeReservation11_route(params) =>
      call { 
        controllers_RestaurantController_makeReservation11_invoker.call(RestaurantController_3.makeReservation)
      }
  
    // @LINE:30
    case controllers_RestaurantController_getAllRestaurantsSortReservationsToday12_route(params) =>
      call { 
        controllers_RestaurantController_getAllRestaurantsSortReservationsToday12_invoker.call(RestaurantController_3.getAllRestaurantsSortReservationsToday)
      }
  
    // @LINE:31
    case controllers_RestaurantController_restaurantVote13_route(params) =>
      call { 
        controllers_RestaurantController_restaurantVote13_invoker.call(RestaurantController_3.restaurantVote)
      }
  
    // @LINE:33
    case controllers_ReservationController_checkReservationAvailability14_route(params) =>
      call { 
        controllers_ReservationController_checkReservationAvailability14_invoker.call(ReservationController_5.checkReservationAvailability)
      }
  
    // @LINE:34
    case controllers_ReservationController_getListOfReservationsForUser15_route(params) =>
      call { 
        controllers_ReservationController_getListOfReservationsForUser15_invoker.call(ReservationController_5.getListOfReservationsForUser)
      }
  
    // @LINE:36
    case controllers_HomeController_index16_route(params) =>
      call(Param[String]("slug", Right(""))) { (slug) =>
        controllers_HomeController_index16_invoker.call(HomeController_1.index(slug))
      }
  
    // @LINE:37
    case controllers_HomeController_index17_route(params) =>
      call(params.fromPath[String]("slug", None)) { (slug) =>
        controllers_HomeController_index17_invoker.call(HomeController_1.index(slug))
      }
  }
}
