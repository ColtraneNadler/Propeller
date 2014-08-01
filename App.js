function App() {
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

App.setActiveView = function(view) {
  view.active = true
  this.events = view.events
}

App.prototype.add = function(view) {
//should view be made active even if it isn't set to active
//is setActiveView the only time a view is made active?
  var section = document.createElement("section")
  section.id = "view_" + view.id
  this.body.insertBefore(section,this.foot)
}

App.prototype.remove = function(view) {
//if a view is removed, should it active = false
  var section = this.body.querySelector("#view_" + view.id)
  this.body.removeChild(section)
}

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
