function App() {
  this.views = []
  this.events = []
}

App.prototype.registerView = function(view) {
  this.views.push(view)
}

App.setActiveView = function(view) {
  view.active = true
  this.events = view.events
}

App.prototype.add = function(view) {
  var section = document.createElement("section")
  section.id = "view_" + view.id
  this.body.insertBefore(section,this.footer)
}

App.prototype.remove = function(view) {
  var section = this.body.querySelector("#view_" + view.id)
  this.body.removeChild(section)
}

App.prototype.signal = function() {
}

App.prototype.receive = function(message) {
}

App.prototype.update = function() {
  for(var i = 0; i < this.views.length; i++) {
  }
}
