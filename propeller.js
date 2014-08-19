window.onload = function() {
  propeller = new App()
  propeller.registerStore(new Store("propeller"))
  propeller.default = basicView

  propeller.head = document.getElementsByTagName("header")[0]
  propeller.menu = document.getElementsByTagName("nav")[0]
//I don't like the way that body is set now
  propeller.body = document.body
//  propeller.body = document.getElementsByTagName("section")[0]
  propeller.foot = document.getElementsByTagName("footer")[0]

  propeller.signal = function() {
    for(var i = 0; i < this.events.length; i++) {
      var eve = this.events[i]
      if(ev.trigger == event.type && ev.element == event.target.id) {
        var message = ev.action(event)
        console.log(message ? message : "no message")
        if(message) {
          for(var j = 0; j < this.views.length; j++) {
            this.views[k].get(message)
          }
        }
      }
    }
  }

  propeller.update = function() {
  }

  propeller.registerView(basicView,false)

  prop.add(BasicView)

  propeller.setActiveView(basicView)
}
