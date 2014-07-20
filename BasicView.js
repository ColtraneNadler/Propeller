basicView = new View()
basicView.label = "basicView"
basicView.head = "<h1>Propeller</h1>"
basicView.body = "<input type=\"text\" id=\"input\" value=\"walk the dog\" autofocus=\"autofocus\"/>" +
                 "<ul id=\"task_list\"></ul>"

basicView.registerReceiver(
  function(message) {
    if(message.action == "create") {
     function addListItem(view,item) {
        if(item.active) {
          var li = document.createElement("li")
          li.id = item.id
          var cb = document.createElement("input")
          cb.setAttribute("type","checkbox")
          if(item.complete) {
            cb.setAttribute("checked","checked")
          }
          cb.id = "co_" + item.id
          view.events.push(new Event("co_" + item.id,"change",
            function(event) {
              item.complete = event.target.checked
              var temp = document.createElement("div")
              temp.innerHTML = view.body
              for(var i = 0; i < temp.childNodes[1].children.length; i++) {
                var li = temp.childNodes[1].childNodes[i]
                if(element.id == item.id) {
                  li.childNodes[0].setAttribute("checked","checked")
                }
              }
              view.body = temp.innerHTML
              view.message = new Message("task","update",item)
            }
          ))
          var cx = document.createElement("a")
          cx.id="cx_" + item.id
          cx.appendChild(document.createTextNode("[ x ]"))
          view.events.push(new Event("cx_" + item.id,"click",
            function(event) {
              item.active = false
              view.message = new Message("task","delete",item)
            }
          ))
          li.appendChild(document.createTextNode(item.task))
          li.appendChild(cx)
          li.appendChild(cb)
          var temp = document.createElement("div")
          temp.innerHTML = view.body
          temp.childNodes[1].appendChild(li)
          view.body = temp.innerHTML
        }
      }

      if(message.target == "tasklist" && message.content) {
        message.content = message.content.task
      }
      if(Array.isArray(message.content)) {
        for(var i = 0; i < message.content.length; i++) {
          addListItem(this,message.content[i])
        }
      } else if(message.content) {
        addListItem(this,message.content)
      }
    } else if(message.action == "delete") {
      var temp = document.createElement("div")
      temp.innerHTML = this.body
      for(var i = 0; i < temp.childNodes[1].children.length; i++) {
        if(temp.childNodes[1].childNodes[i].id == message.content.id) {
//          temp.childNodes[1].removeChild(temp.childNodes[1].childNodes[i])
          temp.childNodes[1].childNodes[i].style.display = "none"
        }
      }
      this.body = temp.innerHTML
    }
  }
)

basicView.registerTransmitter(function() { return this.message })

basicView.events.push(new Event("input","keydown",
  function(event) {
    if(event.keyCode == 13 && event.target.value != "") {
      var task = new Task()
      task.task = event.target.value
      task.complete = false
      task.active = true

      this.message = new Message("task","create",task)
      event.target.value = ""
    }
  }.bind(basicView)
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
