activeTask = new View("Active Task")

activeTask.set("head","<h1>Propeller</h1>")
activeTask.set("menu","")
activeTask.set("body","<h2 id=\"activeTask\"></h2><div id=\"clockFace\"></div>")
activeTask.set("foot","")

activeTask.registerReceiver(
  function(state) {
    if(state.activeTask) {
      var task = this.body.querySelector("#activeTask")
      var match = false

      while(task.firstChild) {
        task.removeChild(task.firstChild)
      }

      for(var i = 0; i < state.task.length && !match; i++) {
        match = state.task[i].id == state.activeTask
        if(match) {
          task.appendChild(document.createTextNode(state.task[i].label))
        }
      }
    }
  }
)
