function Store(point) {
  this.store = window.localStorage || ""
  this.point = point || "appData"

  this.data = (this.store[point] ? JSON.parse(this.store[point]) : [])
}

function Event(element,trigger,action) {
  this.element = element || ""
  this.trigger = trigger || ""
  this.action = action || ""
}

function View() {
  this.label = ""

  this.head = ""
  this.menu = ""
  this.body = ""
  this.foot = ""

  this.events = []
}

View.prototype.registerTransmitter = function(transmitter) {
  this.transmit = transmitter
}

View.prototype.send = function() {
  if(this.transmit) {
    return this.transmit()
  }
}

View.prototype.registerReceiver = function(receiver) {
  this.receive = receiver
}

View.prototype.get = function(message) {
  if(this.receive) {
    this.receive(message)
  }
}

function App(dataPoint) {
  this.store = new Store(dataPoint) || {}

  this.head = ""
  this.menu = ""
  this.body = ""
  this.foot = ""

  this.views = []
}

App.prototype.getViewFromLabel = function(label) {
  for(var i = 0; i < this.views.length; i++ ) {
    if(this.views[i].label == label) {
      return this.views[i]
    }
  }
  return null
}

//more to come here
App.prototype.setActiveView = function(view) {
  view.get(this.store.data)

  this.show(view)
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

//this function needs some work
App.prototype.receive = function(message) {
  this.store.data.push(message)
  this.store.store[this.store.point] = JSON.stringify(this.store.data)
  this.show(this.getViewFromLabel("basicView"))
}





window.onload = function() {
//register a new app to the window
  propeller = new App("tasks")

//registering app elements might require a function later
  propeller.head = document.getElementsByTagName("header")[0]
  propeller.menu = document.getElementsByTagName("nav")[0]
  propeller.body = document.getElementsByTagName("section")[0]
  propeller.foot = document.getElementsByTagName("footer")[0]

//create the views and set their content
  basicView = new View()
  basicView.label = "basicView"
  basicView.head = "<h1>Propeller</h1>"
  basicView.body = "<input type=\"text\" id=\"input\" value=\"walk the dog\" />" +
                   "<ul id=\"to_do_list\"></ul>"

  basicView.registerReceiver(function(message) {
                               if(Array.isArray(message)) {
                                 for(var i = 0; i < message.length; i++) {
                                   addListItem(this,message[i])
                                 }
                               } else {
                                 addListItem(this,message)
                               }
                               function addListItem(view,item) {
                                 var li = document.createElement("li")
                                 var cb = document.createElement("input")
                                 cb.setAttribute("type","checkbox")
                                 li.appendChild(cb)
                                 li.appendChild(document.createTextNode(item))

                                 var temp = document.createElement("div")
                                 temp.innerHTML = view.body
                                 temp.childNodes[1].appendChild(li)
                                 view.body = temp.innerHTML
                               }
                             })

//register any events
  basicView.events.push(new Event("input","keydown",function(event) {
                                            if(event.keyCode == 13 && event.target.value != "") {
                                              //this part needs to change
                                              basicView.get(event.target.value)
                                              propeller.receive(event.target.value)
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
  propeller.setActiveView(basicView)
}
