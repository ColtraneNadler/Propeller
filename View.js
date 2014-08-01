function View() {
  this.id = Math.random().toString(36).substr(2,5)

  this.events = []
  this.active = false
}

View.prototype.render = function() {
}

View.prototype.destroy = function() {
}
