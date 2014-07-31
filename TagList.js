tagList = new View()
tagList.label = "Tags"
tagList.head = "<h1>Propeller</h1>"
tagList.body = "<ul id=\"tag_list\"></ul>"

tagList.registerReceiver(
  function(message) {

    if(message.target == "tasklist" && message.content) {
      this.clear("#tag_list")
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
      var cx = document.createElement("a")

      li.id = "tag_" + item.id
      tag.className = "task"
      ctrl.className = "ctrl"
      cx.id = "cx_" + item.id

      tag.appendChild(document.createTextNode(item.label))

      cx.appendChild(document.createTextNode("[ x ]"))

      ctrl.appendChild(cx)

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

tagList.registerTransmitter(function() { return this.message })
