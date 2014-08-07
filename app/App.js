function Store(point) {
  this.store = window.localStorage || ""
  this.point = point || "appData"

  this.data = (this.store[point] ? JSON.parse(this.store[point]) : {})
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

App.prototype.registerView = function(view,listed) {
  view.get(new Message("tasklist","create",this.store.data))
  this.views.push(view)
  if(listed) {
    this.populateMenu(view)
  }
}

App.prototype.populateMenu = function(view) {
  var app = this
  var li = document.createElement("li")
  li.id = view.id
//breaks event flow!
  li.addEventListener("click",
    function(event) {
      app.setActiveView(app.getViewFromLabel(event.target.innerText))
    }
  )
  li.appendChild(document.createTextNode(view.label))
  if(!this.menu.querySelector("ul")) {
    ul = document.createElement("ul")
    ul.appendChild(li)
    this.menu.appendChild(ul)
  } else {
    this.menu.querySelector("ul").appendChild(li)
  }
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
  view.active = true
  this.activeView = view
//message is specific, not generic
  view.get(new Message("tasklist","create",this.store.data))
  this.show(view)
}

App.prototype.show = function(view,state) {
  this.head.innerHTML = view.head
/**
  this.menu.innerHTML = view.menu
**/
  this.body.innerHTML = (view.menu ? view.menu + view.body : view.body)
  this.foot.innerHTML = view.foot
}

App.prototype.show = function(view) {
  if(view.target && this.body.querySelector("#" + view.target)) {
    var target = this.body.querySelector("#" + view.target)
    target.innerHTML = view.head + view.body + view.foot
  } else if (view.target) {
  } else {
    this.head.innerHTML = view.head
//    this.menu.innerHTML = view.menu
    this.body.innerHTML = view.body
    this.foot.innerHTML = view.foot
  }
  this.events = view.events

  for(var i = 0; i < view.events.length; i++) {
//A better solution is to have the view drop the event and delete the element
    if(document.getElementById(view.events[i].element)) {
      document.getElementById(view.events[i].element).addEventListener(view.events[i].trigger,this.signal.bind(this))
    }
  }
  if(state == "create") {
    for(var i = 0; i < this.body.children.length; i++) {
      if(this.body.children[i].autofocus) {
        this.body.children[i].focus()
      }
    }
  }
}

App.prototype.signal = function(event) {
  for(var i = 0; i < this.events.length; i++) {
    if(this.events[i].trigger == event.type && this.events[i].element == event.target.id) {
      this.events[i].action(event)

//shouldn't require a view to be active to send a message
      for(var j = 0; j < this.views.length; j++) {
        var message = this.views[j].send()
        if(message) {
          var action = message.action
          this.receive(message)
          for(var k = 0; k < this.views.length; k++) {
            this.views[k].get(message)
          }
          this.confirmReceipt(this.views[j])
          if(action == "create" || action == "delete") {
            this.show(this.activeView)
          }
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

