taskStats = new View()
taskStats.label = "Stats"
taskStats.head = "<h1>Propeller Stats</h1>"
taskStats.body = "<table id=\"list_stats\"></table><table id=\"task_stats\"></table>"

taskStats.registerReceiver(
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
        var total = (list ? list.length : 0)
        for(var i = 0; i < total; i++) {
          addTaskStatsItem(view,list[i])
          if(list[i].active && list[i].complete) {
            complete += 1
            averageTime += (list[i].completeTime - list[i].creationTime)
          } else if (list[i].active) {
            active += 1
            averageTime += (new Date().getTime() - list[i].creationTime)
          } else {
            total -= 1
            inactive += 1
          }
        }
        averageTime = (total > 0  ? averageTime / total : 0)

        var temp = document.createElement("div")
        temp.innerHTML = view.body
        var list_stats = temp.querySelector("#list_stats")

        list_stats.appendChild(makeTableRow("Total Tasks",total))
        list_stats.appendChild(makeTableRow("Completed Tasks",complete))
        list_stats.appendChild(makeTableRow("Active Tasks",active))
        list_stats.appendChild(makeTableRow("Tasks Deleted",inactive))
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
