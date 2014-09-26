addTask = new View("Add Task")
addTask.type = "modal"

addTask.set("head","<h1>Propeller</h1>")
addTask.set("body","<input type=\"text\" id=\"at_input\" value=\"walk the dog\" autofocus=\"autofocus\"/>")
addTask.set("foot","<input type=\"button\" id=\"at_close\" value=\"finished\"/>")

addTask.events.push(new Event("at_input","keydown",
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
      return new Message("task","create",task)
    }
  }
))

addTask.events.push(new Event("at_input","focusin",
  function(event) {
    if(event.target.value == "walk the dog") {
      event.target.value = ""
    }
  }
))

addTask.events.push(new Event("at_input","focusout",
  function(event) {
    if(event.target.value == "") {
      event.target.value = null
    }
  }
))

addTask.events.push(new Event("at_close","click",
  function(event) { 
    return new Message("activeView","delete","")
  }
))
