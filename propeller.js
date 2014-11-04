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
          if(message.action == "update") {
            this.setActiveView(this.views[message.content])
            if(this.views[message.content].type == "modal") {
            } else {
              var keys = Object.keys(this.views)
              for(var i = 0; i < keys.length; i++) {
                this.views[keys[i]].active = keys[i] == message.content
              }
            }
          } else if(message.action == "delete") {
            this.remove(this.views[this.state.activeView[this.state.activeView.length - 1]])
            this.setActiveView(this.views[this.state.activeView[this.state.activeView.length - 1]])
          }
          this.update(message)
        } else if(message && message.target == "tag") {
          if(message.action == "delete") {
            for(var i = 0; i < this.state.task.length; i++) {
              delete this.state.task[i].tags[message.content.id]

              if(Object.keys(this.state.task[i].tags).length == 0) {
                this.state.task[i].active = false
              }
            }
            this.update(message)
          } else {
            this.update(message)
          }
        } else if(message && message.target == "activeTag") {
//          console.log(message)
          this.state.activeTag = message.content
          this.update(message)
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
      if(this.state.activeView[this.state.activeView.length - 1] == this.views[keys[i]].id) {
        this.setActiveView(this.views[keys[i]])
        var section = this.body.querySelector("#view_" + keys[i])
        if(this.views[keys[i]].type == "modal") {
          section.className = section.className + " modal"
          this.body.style.overflow = "hidden"
        } else {
          this.body.style.overflow = "visible"
        }
      } else if(this.views[keys[i]].active) {
        var section = this.body.querySelector("#view_" + this.views[keys[i]].id)
        while(section && section.firstChild) {
          section.removeChild(section.firstChild)
        }
//        if(this.views[keys[i]].type == "modal") {
//          section.className = section.className + " modal"
//        }
        this.views[keys[i]].get(this.state)
        section.appendChild(this.views[keys[i]].render())
      } else {
        this.remove(this.views[keys[i]])
      }
    }
  }

  propeller.registerStore(new Store("propeller"))
  propeller.state = propeller.store.door[propeller.store.key] ? JSON.parse(propeller.store.door[propeller.store.key]) : propeller.state

  propeller.head = document.getElementsByTagName("header")[0]
  propeller.menu = document.getElementsByTagName("nav")[0]
  propeller.body = document.body
  propeller.foot = document.getElementsByTagName("footer")[0]

  propeller.menu.onclick = propeller.signal.bind(propeller)

  propeller.registerView(basicView)

  propeller.registerView(addTag)
  propeller.registerView(addTask)
  propeller.registerView(taskList)
  propeller.registerView(tagList)
  propeller.registerView(activeTask)

  propeller.addToMenu(addTag)
  propeller.addToMenu(addTask)
  propeller.addToMenu(taskList)
  propeller.addToMenu(tagList)

  propeller.setActiveView(basicView)
}
