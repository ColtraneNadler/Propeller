tagList = new View("Tags")

tagList.set("head","<h1>Propeller</h1>")
tagList.set("menu","")
tagList.set("body","<ul id=\"tag_list\"></ul>")
tagList.set("foot","")

tagList.registerReceiver(
  function(state) {
    var tag_list = this.body.querySelector("#tag_list")
    while(tag_list.firstChild) {
      tag_list.removeChild(tag_list.firstChild)
    }
    while(this.events.length > 0) {
      this.events.pop()
    }
    if(state.tag && state.tag.length > 0) {
      buildList(this,"#tag_list",state.tag)
    }

    function buildList(view, target, item) {
      for(var i = 0; i < item.length; i++) {
        if(item[i].active && !item[i].complete) {
          var li = createListItem(item[i])
          createItemEvents(view,item[i])
          addListItem(view,target,li)
        }
      }
    }

    function createListItem(item) {
      var li = document.createElement("li")
      var tag = document.createElement("span")
      var ctrl = document.createElement("span")
      var rm = document.createElement("a")

      li.id = "tag_" + item.id
      tag.className = "label"
      ctrl.className = "ctrl"
      rm.id = "rm_" + item.id

      tag.appendChild(document.createTextNode(item.label))
      rm.appendChild(document.createTextNode("[ x ]"))

      ctrl.appendChild(rm)

      li.appendChild(tag)
      li.appendChild(ctrl)

      return li
    }

    function createItemEvents(view,item) {
      var remove = new Event()
      remove.element = "rm_" + item.id
      remove.trigger = "click"
      remove.action = function(event) {
        item.active = false
        return new Message("tag","delete",item)
      }

      view.events.push(remove)
    }

//perhaps target should be a reference to the query selection
    function addListItem(view,target,li) {
      view.body.querySelector(target).appendChild(li)
    }
  }
)
