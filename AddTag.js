addTag = new View()
addTag.label = "Add Tag"
addTag.head = "<h1>Propeller</h1>"
addTag.body = "<input type=\"text\" id=\"input\" value=\"chores\" autofocus=\"autofocus\"/>"

addTag.registerTransmitter(function() { return this.message })

addTag.events.push(new Event("input","keydown",
  function(event) {
    if(event.keyCode == 13 && event.target.value != "") {
      var tag = new Tag()
      tag.label = event.target.value
      tag.active = true

      this.message = new Message("tag","create",tag)
      event.target.value = ""
    }
  }.bind(addTag)
))

addTag.events.push(new Event("input","focus",
  function(event) {
    if(event.target.value == "chores") {
      event.target.value = ""
    }
  }
))

addTag.events.push(new Event("input","blur",
  function(event) {
    if(event.target.value == "") {
      event.target.value = null
    }
  }
))
