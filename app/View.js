function Event(element,trigger,action) {
  this.element = element || ""
  this.trigger = trigger || ""
  this.action = action || ""
}

function View() {
  this.id = Math.random().toString(36).substr(2, 5)
  this.label = ""

  this.head = ""
  this.menu = ""
  this.body = ""
  this.foot = ""

  this.active = false
  this.events = []
}

View.prototype.setBody = function(body) {
  var temp = document.createElement("div")
  temp.innerHTML = body
  this.body = temp.innerHTML
}

View.prototype.clear = function(target) {
  var temp = document.createElement("div")
  temp.innerHTML = this[target]
  var container = temp.querySelector(element)
  while(container.firstChild) {
    container.removeChild(container.firstChild)
  }
  this[target] = temp.innerHTML
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

