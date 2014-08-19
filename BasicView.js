basicView = new View()
basicView.name = "BasicView"
basicView.head = "<h1>Propeller</h1>"
basicView.body = "<input type=\"text\" id=\"input\" value=\"walk the dog\" autofocus=\"autofocus\"/>" +
                 "<ul id=\"task_list\"></ul>"

basicView.events.push(new Event("input","keydown",
  function(event) {
    if(event.keyCode == 13 && event.target.value != "") {
      var task = new Task()
      task.label = event.target.value
      task.complete = false
      task.active = true

      event.target.value = ""
      return new Message("task","create",task)
    }
  }
))

basicView.events.push(new Event("input","focus",
  function(event) {
    if(event.target.value == "walk the dog") {
      event.target.value = ""
    }
  }
))

basicView.events.push(new Event("input","blur",
  function(event) {
    if(event.target.value == "") {
      event.target.value = null
    }
  }
))
