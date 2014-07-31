window.onload = function() {
  propeller = new App("Propeller")

  propeller.head = document.getElementsByTagName("header")[0]
  propeller.menu = document.getElementsByTagName("nav")[0]
  propeller.body = document.getElementsByTagName("section")[0]
  propeller.foot = document.getElementsByTagName("footer")[0]

  propeller.registerView(basicView,false)
  propeller.registerView(addTask,true)
  propeller.registerView(addTag,true)
  propeller.registerView(taskList,true)
  propeller.registerView(tagList,true)
  propeller.registerView(taskStats,true)

  propeller.setActiveView(basicView)
}
