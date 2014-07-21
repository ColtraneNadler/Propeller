statsView = new View()
statsView.label = "Stats View"
statsView.head = "<h1>Propeller Stats</h1>"
statsView.body = "<ul id=\"task_stats\"></ul>"

statsView.registerReceiver(
  function(message) {
    if(message.action == "create" || message.action == "delete") {
      function addTaskStatsItem(view,item) {
        if(item.complete && item.active) {
          var timeToComplete = item.completeTime - item.creationTime
        } else if(item.active) {
          var idleTime = new Date().getTime() - item.creationTime
        }

        var temp = document.createElement("div")
        temp.innerHTML = view.body
        var task_stats = temp.querySelector("#task_stats")
        var li = document.createElement("li")
        li.appendChild(document.createTextNode(item.label + " " + "Active Time:" +  Math.floor(((item.complete ? timeToComplete : idleTime) / 1000) % 60)))
        task_stats.appendChild(li)
        view.body = temp.innerHTML
      }

      if(message.target == "tasklist" && message.content) {
        message.content = message.content.task
      }

      if(message.content && Array.isArray(message.content)) {
        for(var i = 0; i < message.content.length; i++) {
          addTaskStatsItem(this,message.content[i])
        }
      } else if(message.content) {
          addTaskStatsItem(this,message.content)
      }
    }
  }
)
/**
statsView.registerTransmitter(
  function() {
    return this.message
  }
)

statsView.events.push(new Event("","",
  function(event) {
  }
))
**/
