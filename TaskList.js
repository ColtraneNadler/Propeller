taskList = new View()
taskList.label = "Tasks"
taskList.head = "<h1>Propeller</h1>"
taskList.body = "<ul id=\"task_list\"></ul>"

taskList.registerReceiver(
  function(message) {
    if(message.target == "tasklist" && message.content) {
      this.clear("#task_list")
      while(this.events.length > 0) {
        this.events.pop()
      }
      message.content = message.content.task
      message.target  = "task"
    }

    if(message.target == "task" && message.action == "create") {
      if(Array.isArray(message.content)) {
        for(var i = 0; i < message.content.length; i++) {
          processItem(this,message.content[i])
        }
      } else if(message.content) {
        processItem(this,message.content)
      }
    } else if(message.target == "task" && message.action == "delete") {
      var temp = document.createElement("div")
      temp.innerHTML = this.body
      temp.querySelector("#task_" + message.content.id).style.display = "none"
      this.body = temp.innerHTML
    }

    function createListItem(item) {
      var li = document.createElement("li")
      var task = document.createElement("span")
      var ctrl = document.createElement("span")
      var cb = document.createElement("input")
      var cx = document.createElement("a")

      li.id = "task_" + item.id
      task.className = "task"
      ctrl.className = "ctrl"
      cb.id = "co_" + item.id
      cx.id = "cx_" + item.id

      cb.setAttribute("type","checkbox")
      if(item.complete) {
        cb.setAttribute("checked","checked")
      }

      task.appendChild(document.createTextNode(item.label))

      cx.appendChild(document.createTextNode("[ x ]"))

      ctrl.appendChild(cb)
      ctrl.appendChild(cx)

      li.appendChild(task)
      li.appendChild(ctrl)

      return li
    }

    function createListEvents(view,item) {
      var complete = new Event()
      complete.element = "co_" + item.id
      complete.trigger = "change"
      complete.action = function(event) {
        item.complete = event.target.checked
        item.completeTime = (item.complete ? new Date().getTime() : null)

        var temp = document.createElement("div")
        temp.innerHTML = view.body
        temp.querySelector("#co_" + item.id).setAttribute("checked","checked")
        view.body = temp.innerHTML

        view.message = new Message("task","update",item)
      }

      var cancel = new Event()
      cancel.element = "cx_" + item.id
      cancel.trigger = "click"
      cancel.action = function(event) {
        item.active = false
        view.message = new Message("task","delete",item)
      }

      view.events.push(complete)
      view.events.push(cancel)
    }

//It would be great to be able to get rid of this block
    function addListItem(view,li) {
      var temp = document.createElement("div")
      temp.innerHTML = view.body
      temp.querySelector("#task_list").appendChild(li)
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

taskList.registerTransmitter(function() { return this.message })
