function Event(element,trigger,action) {
  this.element = element || ""
  this.trigger = trigger || ""
  this.action = action || ""
}

function View() {
  this.head = ""
  this.menu = ""
  this.body = ""
  this.foot = ""

  this.events = []
}

View.prototype.signal = function(message) {
  return message
}

View.prototype.receive = function(message) {
  if(Array.isArray(message)) {
    for(var i = 0; i < message.length; i++) {
      createListItem(message[i])
    }
  } else {
    createListItem(message)
  }

  function createListItem(message) {
    var li = document.createElement("li")
    var cb = document.createElement("input")
    cb.setAttribute("type","checkbox")
    li.appendChild(cb)
    li.appendChild(document.createTextNode(message))
    document.getElementById("to_do_list").appendChild(li)
  }
}

function App() {
  this.store = window.localStorage || ""
  this.data =  this.store["tasks"] || []
  this.data = JSON.parse(this.data)

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

  view.receive(this.data);

  for(var i = 0; i < view.events.length; i++) {
    document.getElementById(view.events[i].element).addEventListener(view.events[i].trigger,view.events[i].action)
  }
}

App.prototype.receive = function(message) {
  this.data.push(message)
  this.store["tasks"] = JSON.stringify(this.data)
}

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
                                            if(event.keyCode == 13 && event.target.value != "") {
                                              basicView.receive(event.target.value)
                                              propeller.receive(basicView.signal(event.target.value))
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
