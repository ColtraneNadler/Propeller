basicView = new View()
basicView.name = "BasicView"
basicView.head = "<h1>Propeller</h1>"
basicView.body = "<input type=\"text\" id=\"input\" value=\"walk the dog\" autofocus=\"autofocus\"/>" +
                 "<ul id=\"task_list\"></ul>"

basicView.registerReceiver(
  function(state) {
    this.domify("body")
    var task_list = this.body.querySelector("#task_list")
    while(task_list.firstChild) {
      task_list.removeChild(task_list.firstChild)
    }
    while(this.events.length > 3) {
      this.events.pop()
    }
    if(state.task && state.task.length > 0) {
      buildList(this,"#task_list",state.task)
    }

    function buildList(view,target, item) {
      for(var i = 0; i < item.length; i++) {
        if(item[i].active) {
          var li = createListItem(item[i])
          createItemEvents(view,item[i])
          addListItem(view,target,li)
        }
      }
    }

    function createListItem(item) {
      var li = document.createElement("li")
      var task = document.createElement("span")
      var ctrl = document.createElement("span")
      var cb = document.createElement("input")
      var rm = document.createElement("a")

      li.id = "task_" + item.id
      task.className = "label"
      ctrl.className = "ctrl"
      cb.id = "co_" + item.id
      rm.id = "rm_" + item.id

      cb.setAttribute("type","checkbox")
      if(item.complete) {
        cb.setAttribute("checked","checked")
      }

      task.appendChild(document.createTextNode(item.label))
      rm.appendChild(document.createTextNode("[ x ]"))

      ctrl.appendChild(cb)
      ctrl.appendChild(rm)

      li.appendChild(task)
      li.appendChild(ctrl)

      return li
    }

    function createItemEvents(view,item) {
      var complete = new Event()
      complete.element = "co_" + item.id
      complete.trigger = "change"
      complete.action = function(event) {
        item.complete = event.target.checked
        item.completeTime = (item.complete ? new Date().getTime() : null)
        return new Message("task","update",item)
      }

      var remove = new Event()
      remove.element = "rm_" + item.id
      remove.trigger = "click"
      remove.action = function(event) {
        item.active = false
        return new Message("task","delete",item)
      }

      view.events.push(complete)
      view.events.push(remove)
    }

//perhaps target should be a reference to the query selection
    function addListItem(view,target,li) {
      view.body.querySelector(target).appendChild(li)
    }
  }
)

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
