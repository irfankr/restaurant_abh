
// @GENERATOR:play-routes-compiler
// @SOURCE:/home/irfank/Play_applications/restaurant_abh/conf/routes
// @DATE:Fri May 20 00:19:23 CEST 2016

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
  Assets_4: controllers.Assets,
  // @LINE:7
  HomeController_1: controllers.HomeController,
  // @LINE:14
  CountController_0: controllers.CountController,
  // @LINE:16
  AsyncController_2: controllers.AsyncController,
  // @LINE:21
  UserController_3: controllers.UserController,
  val prefix: String
) extends GeneratedRouter {

   @javax.inject.Inject()
   def this(errorHandler: play.api.http.HttpErrorHandler,
    // @LINE:6
    Assets_4: controllers.Assets,
    // @LINE:7
    HomeController_1: controllers.HomeController,
    // @LINE:14
    CountController_0: controllers.CountController,
    // @LINE:16
    AsyncController_2: controllers.AsyncController,
    // @LINE:21
    UserController_3: controllers.UserController
  ) = this(errorHandler, Assets_4, HomeController_1, CountController_0, AsyncController_2, UserController_3, "/")

  import ReverseRouteContext.empty

  def withPrefix(prefix: String): Routes = {
    router.RoutesPrefix.setPrefix(prefix)
    new Routes(errorHandler, Assets_4, HomeController_1, CountController_0, AsyncController_2, UserController_3, prefix)
  }

  private[this] val defaultPrefix: String = {
    if (this.prefix.endsWith("/")) "" else "/"
  }

  def documentation = List(
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """assets/""" + "$" + """file<.+>""", """controllers.Assets.versioned(path:String = "/public/ember/assets", file:Asset)"""),
    ("""GET""", this.prefix, """controllers.HomeController.index(slug:String = "")"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """""" + "$" + """slug<.+>""", """controllers.HomeController.index(slug:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/count""", """controllers.CountController.count"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/message""", """controllers.AsyncController.message"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/login""", """controllers.UserController.login"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/currentUser""", """controllers.UserController.currentUser"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/logout""", """controllers.UserController.logout"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """api/v1/register""", """controllers.UserController.register"""),
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
    Assets_4.versioned(fakeValue[String], fakeValue[Asset]),
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

  // @LINE:7
  private[this] lazy val controllers_HomeController_index1_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix)))
  )
  private[this] lazy val controllers_HomeController_index1_invoker = createInvoker(
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

  // @LINE:8
  private[this] lazy val controllers_HomeController_index2_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), DynamicPart("slug", """.+""",false)))
  )
  private[this] lazy val controllers_HomeController_index2_invoker = createInvoker(
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

  // @LINE:14
  private[this] lazy val controllers_CountController_count3_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/count")))
  )
  private[this] lazy val controllers_CountController_count3_invoker = createInvoker(
    CountController_0.count,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.CountController",
      "count",
      Nil,
      "GET",
      """ An example controller showing a sample home page
 GET     /api/v1/                    controllers.HomeController.index
 An example controller showing how to use dependency injection""",
      this.prefix + """api/v1/count"""
    )
  )

  // @LINE:16
  private[this] lazy val controllers_AsyncController_message4_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/message")))
  )
  private[this] lazy val controllers_AsyncController_message4_invoker = createInvoker(
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

  // @LINE:21
  private[this] lazy val controllers_UserController_login5_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/login")))
  )
  private[this] lazy val controllers_UserController_login5_invoker = createInvoker(
    UserController_3.login,
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

  // @LINE:22
  private[this] lazy val controllers_UserController_currentUser6_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/currentUser")))
  )
  private[this] lazy val controllers_UserController_currentUser6_invoker = createInvoker(
    UserController_3.currentUser,
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

  // @LINE:23
  private[this] lazy val controllers_UserController_logout7_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/logout")))
  )
  private[this] lazy val controllers_UserController_logout7_invoker = createInvoker(
    UserController_3.logout,
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

  // @LINE:25
  private[this] lazy val controllers_UserController_register8_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("api/v1/register")))
  )
  private[this] lazy val controllers_UserController_register8_invoker = createInvoker(
    UserController_3.register,
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


  def routes: PartialFunction[RequestHeader, Handler] = {
  
    // @LINE:6
    case controllers_Assets_versioned0_route(params) =>
      call(Param[String]("path", Right("/public/ember/assets")), params.fromPath[Asset]("file", None)) { (path, file) =>
        controllers_Assets_versioned0_invoker.call(Assets_4.versioned(path, file))
      }
  
    // @LINE:7
    case controllers_HomeController_index1_route(params) =>
      call(Param[String]("slug", Right(""))) { (slug) =>
        controllers_HomeController_index1_invoker.call(HomeController_1.index(slug))
      }
  
    // @LINE:8
    case controllers_HomeController_index2_route(params) =>
      call(params.fromPath[String]("slug", None)) { (slug) =>
        controllers_HomeController_index2_invoker.call(HomeController_1.index(slug))
      }
  
    // @LINE:14
    case controllers_CountController_count3_route(params) =>
      call { 
        controllers_CountController_count3_invoker.call(CountController_0.count)
      }
  
    // @LINE:16
    case controllers_AsyncController_message4_route(params) =>
      call { 
        controllers_AsyncController_message4_invoker.call(AsyncController_2.message)
      }
  
    // @LINE:21
    case controllers_UserController_login5_route(params) =>
      call { 
        controllers_UserController_login5_invoker.call(UserController_3.login)
      }
  
    // @LINE:22
    case controllers_UserController_currentUser6_route(params) =>
      call { 
        controllers_UserController_currentUser6_invoker.call(UserController_3.currentUser)
      }
  
    // @LINE:23
    case controllers_UserController_logout7_route(params) =>
      call { 
        controllers_UserController_logout7_invoker.call(UserController_3.logout)
      }
  
    // @LINE:25
    case controllers_UserController_register8_route(params) =>
      call { 
        controllers_UserController_register8_invoker.call(UserController_3.register)
      }
  }
}
