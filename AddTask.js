addTask = new View()
addTask.target = "make_task"
addTask.label = "Add"
addTask.head = "<h1>Propeller</h1>"
addTask.body = "<input type=\"text\" id=\"input\" value=\"walk the dog\" autofocus=\"autofocus\"/>"

addTask.registerTransmitter(function() { return this.message })

addTask.events.push(new Event("input","keydown",
  function(event) {
    if(event.keyCode == 13 && event.target.value != "") {
      var task = new Task()
      task.label = event.target.value
      task.complete = false
      task.active = true

      this.message = new Message("task","create",task)
      event.target.value = ""
    }
  }.bind(addTask)
))

addTask.events.push(new Event("input","focus",
  function(event) {
    if(event.target.value == "walk the dog") {
      event.target.value = ""
    }
  }
))

addTask.events.push(new Event("input","blur",
  function(event) {
    if(event.target.value == "") {
      event.target.value = null
    }
  }
))
