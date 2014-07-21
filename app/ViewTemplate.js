view = new View()
view.label = "view"
view.head = "<h1>View</h1>"
view.body = ""

view.registerReceiver(
  function(message) {
  }
)

view.registerTransmitter(
  function() {
    return this.message
  }
)

view.events.push(new Event("","",
  function(event) {
  }
))
