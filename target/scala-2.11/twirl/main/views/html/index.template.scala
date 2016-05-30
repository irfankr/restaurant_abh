
package views.html

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object index_Scope0 {
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import java.lang._
import java.util._
import scala.collection.JavaConversions._
import scala.collection.JavaConverters._
import play.core.j.PlayMagicForJava._
import play.mvc._
import play.data._
import play.api.data.Field
import play.mvc.Http.Context.Implicit._

class index extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template0[play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply():play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*1.1*/("""<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>RestaurantAbh</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,200,300,300italic,200italic,400italic,600,700,600italic,900,700italic,900italic&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">

    <base href="/" />
<meta name="restaurant-abh/config/environment" content="%7B%22modulePrefix%22%3A%22restaurant-abh%22%2C%22environment%22%3A%22production%22%2C%22baseURL%22%3A%22/%22%2C%22locationType%22%3A%22auto%22%2C%22EmberENV%22%3A%7B%22FEATURES%22%3A%7B%7D%7D%2C%22APP%22%3A%7B%22name%22%3A%22restaurant-abh%22%2C%22version%22%3A%220.0.0+1329df67%22%7D%2C%22exportApplicationGlobal%22%3Afalse%2C%22g-map%22%3A%7B%22libraries%22%3A%5B%22places%22%5D%7D%7D" />
<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?libraries=places"></script>

    <link rel="stylesheet" href="assets/vendor-98f2fc4d5359ba494421e878eccc38a7.css">
    <link rel="stylesheet" href="assets/restaurant-abh-78959c748703f12b1babdaa0286851a1.css">

    
  </head>
  <body>
    

    <script src="assets/vendor-3aa08db74247bdd4e4809e3e0eea5115.js"></script>
    <script src="assets/restaurant-abh-d1c477afb2cb2e3e82535f8ca1144105.js"></script>

    
  </body>
</html>
"""))
      }
    }
  }

  def render(): play.twirl.api.HtmlFormat.Appendable = apply()

  def f:(() => play.twirl.api.HtmlFormat.Appendable) = () => apply()

  def ref: this.type = this

}


}

/**/
object index extends index_Scope0.index
              /*
                  -- GENERATED --
                  DATE: Tue May 31 11:11:39 CEST 2016
                  SOURCE: /home/irfank/Play_applications/restaurant_abh/app/views/index.scala.html
                  HASH: 55cc3385f44ab95c7a0b4348301e21bc032ad054
                  MATRIX: 827->0
                  LINES: 32->1
                  -- GENERATED --
              */
          