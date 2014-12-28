addTask = new View("Add Task")
addTask.type = "modal"

addTask.set("head","<h1>Propeller</h1>")
addTask.set("menu","")
addTask.set("body","<input type=\"text\" id=\"at_input\" value=\"walk the dog\" autofocus=\"autofocus\"/>" +
            "<input type=\"number\" id=\"at_hours\" value=\"23\" />:" +
            "<input type=\"number\" id=\"at_minutes\" value=\"59\" />:" +
            "<input type=\"number\" id=\"at_seconds\" value=\"59\" />" +
            "<ul id=\"tag_list\"></ul>")
addTask.set("foot","<input type=\"button\" id=\"at_submit\" value=\"create\"/>" +
            "<input type=\"button\" id=\"at_close\" value=\"cancel\" />")

addTask.registerReceiver(
  function(state) {
    var tag_list = this.body.querySelector("#tag_list")
    while(tag_list.firstChild) {
      tag_list.removeChild(tag_list.firstChild)
    }
    while(this.events.length > 4) {
      this.events.pop()
    }
    if(state.tag && state.tag.length > 0) {
      buildList(this,"#tag_list",state.tag)
    }

    function buildList(view, target, item) {
      for(var i = 0; i < item.length; i++) {
        if(item[i].active) {
          var li = createListItem(item[i])
          addListItem(view,target,li)
        }
      }
    }

    function createListItem(item) {
      var li = document.createElement("li")
      var tag = document.createElement("span")
      var ctrl = document.createElement("span")
      var check = document.createElement("input")

      li.id = "tag_" + item.id
      tag.className = "label"
      check.id = "check_" + item.id

      check.setAttribute("type","checkbox")


      ctrl.appendChild(check)
      tag.appendChild(document.createTextNode(item.label))

      li.appendChild(tag)
      li.appendChild(ctrl)

      return li
    }

    function addListItem(view,target,li) {
      view.body.querySelector(target).appendChild(li)
    }

  }
)

addTask.events.push(new Event("at_input","keydown",
  function(event) {
    if(event.keyCode == 13 && event.target.value != "") {
      var task = new Task()
      task.label = event.target.value
      task.complete = false
      task.active = true

      task.requiredTime = ""

//tag.tasks might be better than tasks.tags
//make tasks an attribute of tags?
      var tags = event.target.parentNode.querySelector("#tag_list")
      for(var i = 0; i < tags.children.length; i++) {
        var id = tags.children[i].id.substr("tag_".length)
        if(tags.children[i].querySelector("#check_" + id).checked) {
          task.tags[id] = true
        }
      }
      var time = event.target.parentNode.querySelector("#at_hours").value * 60
      time = (time + parseInt(event.target.parentNode.querySelector("#at_minutes").value)) * 60
      time = (time + parseInt(event.target.parentNode.querySelector("#at_seconds").value)) * 1000

      task.requiredTime = time

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
