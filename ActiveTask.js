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
          var time = state.task[i].requiredTime
          time -= state.task[i].workSessions.reduce(function(a,b) { return a + b },0)
//make this less ugly at some point
          time = prependZero(getHours(time)) + ":" + prependZero(getMinutes(time)) + ":" + prependZero(getSeconds(time)) + "." + prependZero(getMilliseconds(time))
          clock.appendChild(document.createTextNode(time))
        }
      }
    }

    var counter = function() {
      var duration = state.task[i].requiredTime
      var timeLeft = duration * 60 * 1000
      var timerEnd = 0

      var running = false
      var timerID = 0

      function tick(element) {
        timeLeft = timerEnd - (new Date().getTime())
        if(this.timeLeft > 0) {
          
        } else {

        }
      }

      return {
        countDown: function() {
          if(!running) {
            running = true
            timerEnd = new Date().getTime() + timeLeft
          }
        },
        decrement: function() {
        },
        value: function() {
        }
      }
    }

    function getHours(time) {
      return Math.floor((time / 1000 / 3600))
    }

    function getMinutes(time) {
      return Math.floor((time / 1000) / 60) % 60
    }

    function getSeconds(time) {
      return Math.floor(time / 1000) % 60
    }

    function getMilliseconds(time) {
      return Math.floor((time % 1000) / 100)
    }

//ahhhhh multiple returns!
    function prependZero(value) {
      if(Math.floor(value / 10) == 0) {
        return "0" + value
      } else {
        return value
      }
    }
  }
)
