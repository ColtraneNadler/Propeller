addTask = new View()

addTask.label = "Add Task"
addTask.head = "<h1>Propeller</h1>"
addTask.body = "<input type=\"text\" id=\"input\" value=\"walk the dog\" autofocus=\"autofocus\"/>"

addTask.events.push(new Event("input","keydown",
  function(event) {
    if(event.keyCode == 13 && event.target.value != "") {
      var task = new Task()
      task.label = event.target.value
      task.complete = false
      task.active = true

//tag.tasks might be better than tasks.tags
//make tasks an attribute of tags?
//      var tags = event.target.parentNode.querySelector("#tag_list")
//      for(var i = 0; i < tags.children.length; i++) {
//        var id = tags.children[i].id.substr("tag_".length)
//        if(tags.children[i].querySelector("#co_" + id).checked) {
//          task.tags[id] = true
//        }
//      }
      event.target.value = ""
      this.message = new Message("task","create",task)
    }
  }
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
