addTag = new View("Add Tag")
addTag.type = "modal"

addTag.set("head","<h1>Propeller</h1>")
addTag.set("body","<input type=\"text\" id=\"at_input\" value=\"chores\" autofocus=\"autofocus\"/>")
addTag.set("foot","<input type=\"button\" id=\"at_close\" value=\"finished\"/>")

addTag.events.push(new Event("at_input","keydown",
  function(event) {
    if(event.keyCode == 13 && event.target.value != "") {
      var tag = new Tag()
      tag.label = event.target.value
      tag.active = true

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
      return new Message("tag","create",tag)
    }
  }
))

addTag.events.push(new Event("at_input","focusin",
  function(event) {
    if(event.target.value == "chores") {
      event.target.value = ""
    }
  }
))

addTag.events.push(new Event("at_input","focusout",
  function(event) {
    if(event.target.value == "") {
      event.target.value = null
    }
  }
))

addTag.events.push(new Event("at_close","click",
  function(event) { 
    return new Message("activeView","delete","")
  }
))
