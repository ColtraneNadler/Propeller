ndow.onload = function()
{
  var ls = new LocalStore();
  ls.getUser(verifyUser);
  var todoIn = document.getElementById('task-in');
  todoIn.onkeydown = addTask;
  
  function verifyUser(exists)
  {
    if(!exists)
    {
      return ls.setDefaults(printList); 
    }
    else
    {
      ls.getData('TASKLIST',printList);
    }
  }
  
  function addTask(event)
  {
    if(event.keyCode == 13)
    {
      var task = new Task(event.target.value);
      ls.addItem("TASKLIST",task,printList);
      event.target.value = null;
    }
  }
}

function loadItems(items)
{
  console.log(items);
}

function printList(items,ls)
{
  var todoList = document.getElementById('tasklist');
  while(todoList.firstChild)
  {
    todoList.removeChild(todoList.firstChild);
  }
  var ul = document.createElement("ul");
  for(var i in items)
  {
    if(!items[i].complete)
    {
    var li = document.createElement("li");
//    li.id = taskList[i].getLabel();
//    li.draggable = true;
    var taskCheck = document.createElement("input");
    taskCheck.setAttribute('type','checkbox');
    taskCheck.id = "check"+i;
    taskCheck.onchange = function(event){document.getElementById(event.target.id).parentNode.style.textDecoration = "line-through"; document.getElementById(event.target.id).style.display = "none";console.log(event.target.id.substr("check".length));ls.data.TASKLIST[event.target.id.substr("check".length)].setComplete(true);ls.setData();};
    li.appendChild(taskCheck);
    var taskText = document.createTextNode(items[i].label)
    var a = document.createElement("a");
    a.id = i;
    a.onclick = function(event){document.getElementById(event.target.id).parentNode.style.display = "none";ls.deleteItem("TASKLIST",event.target.id);console.log(event.target.id);};
    var remove = document.createTextNode("[ X ]");
    a.appendChild(remove);
    li.appendChild(taskText);
    li.appendChild(a);
    ul.appendChild(li);
    }
  }
  todoList.appendChild(ul);
}

function printWorld(items)
{
  console.log(items);
}
