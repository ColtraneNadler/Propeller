window.onload = function() {
  propeller = new App("Propeller")

  propeller.head = document.getElementsByTagName("header")[0]
  propeller.menu = document.getElementsByTagName("nav")[0]
  propeller.body = document.getElementsByTagName("section")[0]
  propeller.foot = document.getElementsByTagName("footer")[0]

  propeller.registerView(basicView,true)
  propeller.registerView(statsView,true)
  propeller.setActiveView(basicView)
}
