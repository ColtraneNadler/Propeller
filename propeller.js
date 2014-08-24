window.onload = function() {
  propeller = new App()
  propeller.registerStore(new Store("propeller"))
  propeller.default = basicView
  propeller.state = propeller.store.door[propeller.store.key] ? JSON.parse(propeller.store.door[propeller.store.key]) : {}
//  console.log(propeller.state)

  propeller.head = document.getElementsByTagName("header")[0]
  propeller.menu = document.getElementsByTagName("nav")[0]
//I don't like the way that body is set now
  propeller.body = document.body
//  propeller.body = document.getElementsByTagName("section")[0]
  propeller.foot = document.getElementsByTagName("footer")[0]

  propeller.signal = function() {
    for(var i = 0; i < this.events.length; i++) {
      var ev = this.events[i]
      if(ev.trigger == event.type && ev.element == event.target.id) {
        var message = ev.action(event)
//        console.log(message ? message : "no message")
        if(message) {
          this.update(message)
          for(var j = 0; j < this.views.length; j++) {
            if(this.views[j].active) {
              this.views[j].get(this.state)
              var section = this.body.querySelector("#view_" + this.views[j].id)
              while(section.firstChild) {
                section.removeChild(section.firstChild)
              }
              section.appendChild(this.views[j].render())
            }
          }
          this.setActiveView(basicView)
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
  }

  propeller.registerView(basicView)
  propeller.registerView(addTag)
  propeller.registerView(addTask)

  propeller.addToMenu(addTag)
  propeller.addToMenu(addTask)

  propeller.add(basicView)

  propeller.setActiveView(basicView)
}
