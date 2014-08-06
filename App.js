function Message(target,action,content) {
  this.target = target
  this.action = action
  this.content = content
}

function App() {
  this.default = ""
  this.activeView = ""

  this.head = ""
  this.menu = ""
  this.body = ""
  this.foot = ""

  this.views = []
  this.events = []
}

App.prototype.registerView = function(view) {
//push means a view can be added twice
  this.views.push(view)
}

//does not account for the possibility of name sharing
App.prototype.getView = function(name) {
  var view = null
  for(var i = 0; i < this.views.length && !view; i++) {
    if(this.views[i].name == name) {
      view = this.views[i]
    }
  }
  return view
}

App.prototype.setActiveView = function(view) {
  this.activeView = view
  view.active = true
  this.events = view.events

  for(var i = 0; i < view.events.length; i++) {
    if(document.getElementById(view.events[i].element)) {
      var el = document.getElementById(view.events[i].element)
      el.addEventListener(view.events[i].trigger,this.signal.bind(this))
    }
  }
}

App.prototype.add = function(view) {
//should view be made active even if it isn't set to active
//is setActiveView the only time a view is made active?
  var section = document.createElement("section")
  section.id = "view_" + view.id
  section.appendChild(view.render())
  this.body.insertBefore(section,this.foot)
}

App.prototype.remove = function(view) {
//if a view is removed, should it active = false
//how are views de-activated
  var section = this.body.querySelector("#view_" + view.id)
  this.body.removeChild(section)
  view.active = false
  view.destroy()
}
/**
App.prototype.signal = function() {
//any code here should be app specific
}

App.prototype.receive = function(message) {
//any code here should be app specific
}

App.prototype.update = function() {
//any code here should be app specific
  for(var i = 0; i < this.views.length; i++) {
  }
}
**/
