function Event(element,trigger,action) {
  this.element = element || ""
  this.trigger = trigger || ""
  this.action = action || ""
}

function View() {
  this.id = Math.random().toString(36).substr(2,5)

  this.name = ""
  this.head = ""
  this.menu = ""
  this.body = ""
  this.foot = ""
  this.page = ""

  this.live = false

  this.events = []
  this.active = false
}

View.prototype.render = function() {
//needs to check each element to see if it has anything before adding it
  this.page = document.createDocumentFragment()
//the view should convert all string elements to dom elements internally
//  this.page.innerHTML = this.head + this.menu + this.body + this.foot
  this.page.appendChild(this.head)
//  this.page.appendChild(this.menu)
  this.page.appendChild(this.body)
//  this.page.appendChild(this.foot)
  return this.page
}

View.prototype.destroy = function() {
  this.page = null
}
