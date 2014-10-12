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
