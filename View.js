function View() {
  this.id = Math.random().toString(36).substr(2,5)

  this.name = ""
  this.head = ""
  this.menu = ""
  this.body = ""
  this.foot = ""
  this.page = ""

  this.events = []
  this.active = false
}

View.prototype.render = function() {
}

View.prototype.destroy = function() {
}
