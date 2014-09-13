window.onload = function() {
  propeller = new App()
  propeller.registerStore(new Store("propeller"))

  propeller.signal = function(event) {
    for(var i = 0; i < this.events.length; i++) {
      var ev = this.events[i]
      var message
      if(ev.trigger == event.type && ev.element == event.target.id) {
        message = ev.action(event)
        if(message && message.target == "activeView") {
          this.setActiveView(this.views[message.content])
        } else if(message) {
//should update happen on setActiveView as well
          this.update(message)
        }
      }
    }
  }

  propeller.update = function(message) {
    if(message.action == "create") {
      if(!this.state[message.target]) {
        this.state[message.target] = []
      }
      this.state[message.target].push(message.content)
    }
    this.store.door[this.store.key] = JSON.stringify(this.state)

    var keys = Object.keys(this.views)
    for(var i = 0; i < keys.length; i++) {
      if(this.state.activeView == this.views[keys[i]].id) {
        this.setActiveView(this.views[keys[i]])
      } else if(this.views[keys[i]].active) {
        var section = this.body.querySelector("#view_" + this.views[keys[i]].id)
        while(section && section.firstChild) {
          section.removeChild(section.firstChild)
        }
        this.views[keys[i]].get(this.state)
        section.appendChild(this.views[keys[i]].render())
      }
    }
  }

  propeller.registerStore(new Store("propeller"))
  propeller.state = propeller.store.door[propeller.store.key] ? JSON.parse(propeller.store.door[propeller.store.key]) : {}

  propeller.head = document.getElementsByTagName("header")[0]
  propeller.menu = document.getElementsByTagName("nav")[0]
  propeller.body = document.body
  propeller.foot = document.getElementsByTagName("footer")[0]

  propeller.menu.onclick = propeller.signal.bind(propeller)

  propeller.registerView(basicView)

  propeller.registerView(addTask)
  propeller.registerView(taskList)

  propeller.addToMenu(addTask)
  propeller.addToMenu(taskList)

  propeller.setActiveView(basicView)
}
