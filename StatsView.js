statsView = new View()
statsView.label = "Stats View"
statsView.head = "<h1>Propeller Stats</h1>"
statsView.body = "<table id=\"list_stats\"></table><table id=\"task_stats\"></table>"

statsView.registerReceiver(
  function(message) {
    if(message.action == "create" || message.action == "delete") {
      function makeTableRow(label,data) {
        var tr = document.createElement("tr")

        var td = document.createElement("td")
        td.appendChild(document.createTextNode(label))
        tr.appendChild(td)

        td = document.createElement("td")
        td.appendChild(document.createTextNode(data))
        tr.appendChild(td)

        return tr
      }

      function addTaskStatsItem(view,item) {
        if(item.active) {
          if(item.complete) {
            var idleTime = item.completeTime - item.creationTime
          } else {
            var idleTime = new Date().getTime() - item.creationTime
          }

          var temp = document.createElement("div")
          temp.innerHTML = view.body
          var task_stats = temp.querySelector("#task_stats")
          task_stats.appendChild(makeTableRow(item.label,idleTime))
          view.body = temp.innerHTML
        }
      }

      function getListStats(view,list) {
        var complete = 0
        var active = 0
        var inactive = 0
        var averageTime = 0
        var total = list.length
        for(var i = 0; i < list.length; i++) {
          addTaskStatsItem(view,list[i])
          if(list[i].active && list[i].complete) {
            active += 1
            complete += 1
            averageTime += (list[i].completeTime - list[i].creationTime)
          } else if (list[i].active) {
            active += 1
            averageTime += (new Date().getTime() - list[i].creationTime)
          } else {
            inactive += 1
          }
        }
        averageTime = averageTime / (total - inactive)

        var temp = document.createElement("div")
        temp.innerHTML = view.body
        var list_stats = temp.querySelector("#list_stats")

        list_stats.appendChild(makeTableRow("Total Tasks",total))
        list_stats.appendChild(makeTableRow("Completed Tasks",complete))
        list_stats.appendChild(makeTableRow("Active Tasks",inactive))
        list_stats.appendChild(makeTableRow("Inactive Tasks",inactive))
        list_stats.appendChild(makeTableRow("Average Idle Time",Math.floor(averageTime)))

        view.body = temp.innerHTML        
      }

      if(message.target == "tasklist" && message.content) {
        this.clear("#task_stats")
        this.clear("#list_stats")
        message.content = message.content.task
        getListStats(this,message.content)
      }
    }
  }
)
