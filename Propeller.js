window.onload = function() {
  propeller = new App("tasks")

  propeller.head = document.getElementsByTagName("header")[0]
  propeller.menu = document.getElementsByTagName("nav")[0]
  propeller.body = document.getElementsByTagName("section")[0]
  propeller.foot = document.getElementsByTagName("footer")[0]

  propeller.views.push(basicView)
  propeller.views.push(statsView)
  propeller.setActiveView(basicView)
}
