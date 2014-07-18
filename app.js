function Task() {
  this.id = Math.random().toString(36).substr(2, 5);
  this.task = ""
  this.active = ""
  this.complete = ""
}

function Message(target,action,content) {
  this.target = target
  this.action = action
  this.content = content
}

function Store(point) {
  this.store = window.localStorage || ""
  this.point = point || "appData"

  this.data = (this.store[point] ? JSON.parse(this.store[point]) : {})
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
  if(this.transmit && this.message) {
    return this.transmit()
  }
}

View.prototype.endTransmission = function() {
  if(this.message) {
    delete this.message
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
  this.events = []
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
  this.activeView = view
  view.get(new Message("tasklist","create",this.store.data))
  this.show(view)
}

App.prototype.show = function(view) {
  this.head.innerHTML = view.head
  this.menu.innerHTML = view.menu
  this.body.innerHTML = view.body
  this.foot.innerHTML = view.foot

  this.events = view.events
  for(var i = 0; i < view.events.length; i++) {
    document.getElementById(view.events[i].element).addEventListener(view.events[i].trigger,this.signal.bind(this))
  }
  for(var i = 0; i < this.body.children.length; i++) {
    if(this.body.children[i].autofocus) {
      this.body.children[i].focus()
    }
  }
}

App.prototype.signal = function(event) {
  for(var i = 0; i < this.events.length; i++) {
    if(this.events[i].trigger == event.type && this.events[i].element == event.target.id) {
      this.events[i].action(event)

//shouldn't require a view to be active to send a message
      var message = this.activeView.send()
      if(message) {
        var action = message.action
        this.receive(message)
        for(var j = 0; j < this.views.length; j++) {
          this.views[j].get(message)
        }
        this.confirmReceipt(this.activeView)
        if(action == "create" || action == "delete") {
          this.show(this.activeView)
        }
      }
    }
  }
}

App.prototype.confirmReceipt = function(view) {
  view.endTransmission()
}

//this function needs some work
App.prototype.receive = function(message) {
  console.log(message)
  if(message.action == "create") {
    if(!this.store.data[message.target]) {
      this.store.data[message.target] = []
    }
    this.store.data[message.target].push(message.content)
    this.store.store[this.store.point] = JSON.stringify(this.store.data)
  } else if(message.action == "update" || message.action == "delete") {
    this.store.store[this.store.point] = JSON.stringify(this.store.data)
  }
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
  basicView.body = "<input type=\"text\" id=\"input\" value=\"walk the dog\" autofocus=\"autofocus\"/>" +
                   "<ul id=\"task_list\"></ul>"

  basicView.registerReceiver(function(message) {
                               if(message.action == "create") {
                                 if(message.target == "tasklist" && message.content) {
                                   message.content = message.content.task
                                 }
                                 if(Array.isArray(message.content)) {
                                   for(var i = 0; i < message.content.length; i++) {
                                     addListItem(this,message.content[i])
                                   }
                                 } else if(message.content) {
                                   addListItem(this,message.content)
                                 }
                                 function addListItem(view,item) {
                                   if(item.active) {
                                     var li = document.createElement("li")
                                     li.id = item.id
                                     var cb = document.createElement("input")
                                     cb.setAttribute("type","checkbox")
                                     if(item.complete) {
                                      cb.setAttribute("checked","checked")
                                     }
                                     cb.id = "co_" + item.id
                                     view.events.push(new Event("co_" + item.id,"change",function(event) {
                                                                                          item.complete = event.target.checked
                                                                                           view.message = new Message("task","update",item)
                                                                                         }))
                                     li.appendChild(cb)
                                     li.appendChild(document.createTextNode(item.task))
                                     var cx = document.createElement("a")
                                     cx.id="cx_" + item.id
                                     cx.appendChild(document.createTextNode("[ x ]"))
                                     view.events.push(new Event("cx_" + item.id,"click",function(event) {
                                                                                         item.active = false
                                                                                         view.message = new Message("task","delete",item)
                                                                                       }))
                                     li.appendChild(cx)
                                     var temp = document.createElement("div")
                                     temp.innerHTML = view.body
                                     temp.childNodes[1].appendChild(li)
                                     view.body = temp.innerHTML
                                   }
                                 }
                               }
                               if(message.action == "delete") {
                                 var temp = document.createElement("div")
                                 temp.innerHTML = this.body
                                 for(var i = 0; i < temp.childNodes[1].children.length; i++) {
                                   if(temp.childNodes[1].childNodes[i].id == message.content.id) {
//                                     temp.childNodes[1].removeChild(temp.childNodes[1].childNodes[i])
                                     temp.childNodes[1].childNodes[i].style.display = "none"
                                   }
                                 }
                                 this.body = temp.innerHTML
                               }
                             })

  basicView.registerTransmitter(function() { return this.message })

//register any events
  basicView.events.push(new Event("input","keydown",function(event) {
                                            if(event.keyCode == 13 && event.target.value != "") {
                                              var task = new Task()
                                              task.task = event.target.value
                                              task.complete = false
                                              task.active = true

                                              this.message = new Message("task","create",task)
                                              event.target.value = ""
                                            }
                                          }.bind(basicView)))
  basicView.events.push(new Event("input","focus",function(event) {
                                                   if(event.target.value == "walk the dog") {
                                                     event.target.value = ""
                                                   }
                                                 }))
  basicView.events.push(new Event("input","blur",function(event) {
                                                   if(event.target.value == "") {
                                                     event.target.value = null
                                                   }
                                                 }))

//register views and set a view to display
  propeller.views.push(basicView)
  propeller.setActiveView(basicView)
}
