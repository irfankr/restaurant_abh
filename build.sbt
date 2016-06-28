name := """restaurant_abh"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  javaCore,
  javaJdbc,
  cache,
  javaWs,
  "org.postgresql" % "postgresql" % "9.4-1206-jdbc42",
  javaJpa,
  "org.hibernate" % "hibernate-entitymanager" % "5.1.0.Final",
  evolutions,
  "com.typesafe.play" %% "play-mailer" % "5.0.0-M1",
  "com.amazonaws" % "aws-java-sdk" % "1.3.11"

)


fork in run := false