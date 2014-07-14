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
  basicView.body = "<input type=\"text\" id=\"input\" value=\"walk the dog\" />" +
                   "<ul id=\"to_do_list\"></ul>"

//register any events
  basicView.events.push(new Event("input","keydown",function(event) {
                                            if(event.keyCode == 13) {
                                              var li = document.createElement("li")
                                              li.appendChild(document.createTextNode(event.target.value))
                                              document.getElementById("to_do_list").appendChild(li)
                                              event.target.value = ""
                                            }
                                          }))
  basicView.events.push(new Event("input","focus",function(event) {
                                                   if(event.target.value == "walk the dog")
                                                     event.target.value = ""
                                                 }))
  basicView.events.push(new Event("input","blur",function(event) {
                                                   if(event.target.value == "")
                                                     event.target.value = null
                                                 }))

//register views and set a view to display
  propeller.views.push(basicView)
  propeller.show(basicView)
}

function App() {
  this.head = ""
  this.menu = ""
  this.body = ""
  this.foot = ""

  this.views = []
}

App.prototype.show = function(view) {
  this.head.innerHTML = view.head
  this.menu.innerHTML = view.menu
  this.body.innerHTML = view.body
  this.foot.innerHTML = view.foot

  for(var i = 0; i < view.events.length; i++) {
    document.getElementById(view.events[i].element).addEventListener(view.events[i].trigger,view.events[i].action)
  }
}

function View() {
  this.head = ""
  this.menu = ""
  this.body = ""
  this.foot = ""

  this.events = []
}

function Event(element,trigger,action) {
  this.element = element || ""
  this.trigger = trigger || ""
  this.action = action || ""
}
