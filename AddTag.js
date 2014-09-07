addTag = new View("Add Tag")
addTag.set("head","<h1>Propeller</h1>")
addTag.set("body","<input type=\"text\" id=\"addTag_input\" value=\"chores\" autofocus=\"autofocus\"/>")
addTag.set("foot","")

addTag.events.push(new Event("addTag_input","keydown",
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

addTag.events.push(new Event("addTag_input","focusin",
  function(event) {
    if(event.target.value == "chores") {
      event.target.value = ""
    }
  }
))

addTag.events.push(new Event("addTag_input","focusout",
  function(event) {
    if(event.target.value == "") {
      event.target.value = null
    }
  }
))
