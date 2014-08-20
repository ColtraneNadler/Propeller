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
//    while(this.events.length > 3) {
//      this.events.pop()
//    }
    if(state.task && state.task.length > 0) {
      buildList(this,"#task_list",state.task)
    }

    function buildList(view,target, item) {
      for(var i = 0; i < item.length; i++) {
        var li = createListItem(item[i])
        addListItem(view,target,li)
      }
    }

    function createListItem(item) {
      var li = document.createElement("li")
      var task = document.createElement("span")
//      var ctrl = document.createElement("span")
//      var cb = document.createElement("input")
//      var cx = document.createElement("a")

      li.id = "task_" + item.id
      task.className = "task"
//      ctrl.className = "ctrl"
//      cb.id = "co_" + item.id
//      cx.id = "cx_" + item.id

//      cb.setAttribute("type","checkbox")
//      if(item.complete) {
//        cb.setAttribute("checked","checked")
//      }

      task.appendChild(document.createTextNode(item.label))
//      cx.appendChild(document.createTextNode("[ x ]"))

//      ctrl.appendChild(cb)
//      ctrl.appendChild(cx)

      li.appendChild(task)
//      li.appendChild(ctrl)

      return li
    }

//perhaps target should be a reference to the query selection
    function addListItem(view,target,li) {
      console.log(view)
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
