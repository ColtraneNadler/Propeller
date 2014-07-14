window.onload = function() {
//register a new app to the window
  propeller = new App()

//registering app elements might require a function later
  propeller.head = document.getElementsByTagName("header")[0]
  propeller.menu = document.getElementsByTagName("nav")[0]
  propeller.body = document.getElementsByTagName("section")[0]
  propeller.foot = document.getElementsByTagName("footer")[0]

//create the views and set their content
  basicView = new View()
  basicView.head = "<h1>Propeller</h1>"
  basicView.body = "<input type=\"text\" value=\"walk the dog\" />" +
                   "<section id=\"to_do_list\"></sction"

  propeller.views.push(basicView);
  propeller.show(basicView);
}

function App() {
  this.head = ""
  this.menu = ""
  this.body = ""
  this.foot = ""

  this.views = [];
}

App.prototype.show = function(view) {
  this.head.innerHTML = view.head
  this.menu.innerHTML = view.menu
  this.body.innerHTML = view.body
  this.foot.innerHTML = view.foot
}

function View() {
  this.head = ""
  this.menu = ""
  this.body = ""
  this.foot = ""
}
