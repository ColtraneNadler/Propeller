function App() {
  this.views = []
}

App.prototype.registerView = function(view) {
  this.views.push(view)
}

App.setActiveView = function(view) {
  view.active = true
}

App.prototype.add = function(view) {
  view.active = true
  this.body.insertBefore(view.render(),this.footer)
}

App.prototype.remove = function(view) {
  view.active = false
  this.body.removeChild(view.render())
  view.destroy()
}

App.prototype.signal = function() {
}

App.prototype.receive = function(message) {
}

App.prototype.show = function() {
  for(var i = 0; i < this.views.length; i++) {
    if(this.views[i].active)
      this.add(this.views[i])
  }
}
