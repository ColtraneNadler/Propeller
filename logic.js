window.onload = function()
{
//things go here
  var taskList = new DataStore("propeller_DataStore");
  var masterTaskList = new ObjectStore("masterTaskList");
  masterTaskList.setDefaultEntry([{"label" : "create to do list app"},{"label" : "add things to list"},{"label" : "?????????"},{"label" : "profit"}]);
  taskList.addObjectStore(masterTaskList);
  taskList.open();
  
  console.log(taskList.results);
}
