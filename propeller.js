window.onload = function() {
  propeller = new App()
  propeller.registerStore(new Store("propeller"))
  propeller.default = basicView

  propeller.head = document.getElementsByTagName("header")[0]
  propeller.menu = document.getElementsByTagName("nav")[0]
//I don't like the way that body is set now
  propeller.body = document.body
//  propeller.body = document.getElementsByTagName("section")[0]
  propeller.foot = document.getElementsByTagName("footer")[0]

  propeller.signal = function() {
  }

  propeller.update = function() {
  }
/**
//I'm not sure how all this will work from now on
  propeller.registerView(basicView,false)
  propeller.registerView(addTask,true)
  propeller.registerView(addTag,true)
  propeller.registerView(taskList,true)
  propeller.registerView(tagList,true)
  propeller.registerView(taskStats,true)

  prop.add(BasicView)

  propeller.setActiveView(basicView)
**/
}
