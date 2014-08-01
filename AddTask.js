addTask = new View()
addTask.label = "Add Task"
addTask.head = "<h1>Propeller</h1>"
addTask.body = "<ul id=\"tag_list\"></ul><input type=\"text\" id=\"input\" value=\"walk the dog\" autofocus=\"autofocus\"/>"

addTask.registerReceiver(
  function(message) {
    if(message.target == "tasklist" && message.content) {
      this.clear("#tag_list")
//maybe this could be determined by the length of tasklist or something
      while(this.events.length > 3) {
        this.events.pop()
      }
      message.content = message.content.tag
      message.target = "tag"
    }

    if(message.target == "tag" && message.action == "create") {
      if(Array.isArray(message.content)) {
        for(var i = 0; i < message.content.length; i++) {
          processItem(this,message.content[i])
        }
      } else if(message.content) {
        processItem(this,message.content)
      }
    } else if(message.target == "tag" && message.action == "delete") {
      var temp = document.createElement("div")
      temp.innerHTML = this.body
      console.log(temp.querySelector("#tag_" + message.content.id))
      temp.querySelector("#tag_" + message.content.id).style.display = "none"
      this.body = temp.innerHTML
    }

    function createListItem(item) {
      var li = document.createElement("li")
      var tag = document.createElement("span")
      var ctrl = document.createElement("span")
      var cb = document.createElement("input")

      li.id = "tag_" + item.id
      tag.className = "task"
      ctrl.className = "ctrl"
      cb.id = "co_" + item.id

      tag.appendChild(document.createTextNode(item.label))

      cb.setAttribute("type","checkbox")

      ctrl.appendChild(cb)

      li.appendChild(tag)
      li.appendChild(ctrl)

      return li
    }

    function createListEvents(view,item) {
      var cancel = new Event()
      cancel.element = "cx_" + item.id
      cancel.trigger = "click"
      cancel.action = function(event) {
        item.active = false
        view.message = new Message("tag","delete",item)
      }

      view.events.push(cancel)
    }

//It would be great to be able to get rid of this block
    function addListItem(view,li) {
      var temp = document.createElement("div")
      temp.innerHTML = view.body
      temp.querySelector("#tag_list").appendChild(li)
      view.body = temp.innerHTML
    }

    function processItem(view,item) {
      if(item.active) {
        var li = createListItem(item)
        createListEvents(view,item)
        addListItem(view,li)
      }
    }
  }
)

addTask.registerTransmitter(function() { return this.message })

addTask.events.push(new Event("input","keydown",
  function(event) {
    if(event.keyCode == 13 && event.target.value != "") {
      var task = new Task()
      task.label = event.target.value
      task.complete = false
      task.active = true

//tag.tasks might be better than tasks.tags
//make tasks an attribute of tags?
      var tags = event.target.parentNode.querySelector("#tag_list")
      for(var i = 0; i < tags.children.length; i++) {
        var id = tags.children[i].id.substr("tag_".length)
        if(tags.children[i].querySelector("#co_" + id).checked) {
          task.tags[id] = true
        }
      }

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
