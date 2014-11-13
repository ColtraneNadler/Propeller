activeTask = new View("Active Task")

activeTask.set("head","<h1>Propeller</h1>")
activeTask.set("menu","")
activeTask.set("body","<h2 id=\"activeTask\"></h2><div id=\"clockFace\"></div>")
activeTask.set("foot","")

activeTask.registerReceiver(
  function(state) {
    if(state.activeTask) {
      var task = this.body.querySelector("#activeTask")
      var clock = this.body.querySelector("#clockFace")
      var match = false

      while(task.firstChild) {
        task.removeChild(task.firstChild)
      }

      while(clock.firstChild) {
        clock.removeChild(clock.firstChild)
      }

      for(var i = 0; i < state.task.length && !match; i++) {
        match = state.task[i].id == state.activeTask
        if(match) {
          task.appendChild(document.createTextNode(state.task[i].label))
          clock.appendChild(document.createTextNode(state.task[i].requiredTime - state.task[i].workSessions.reduce(function(a,b) {return a + b },0)))
        }
      }
    }
  }
)
