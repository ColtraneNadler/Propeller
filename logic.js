window.onload = function()
{
  var ls = new LocalStore();
  
  var addTask = document.getElementById("addTask").style.display = "none";
  var showAddTask = document.getElementById("showAddTask");
  var hideAddTask = document.getElementById("hideAddTask");
  var taskLabel = document.getElementById("taskLabel");
  
  showAddTask.addEventListener("click",function(event){ document.getElementById("addTask").style.display = "inline-block"; });
  hideAddTask.addEventListener("click",function(event){ document.getElementById("addTask").style.display = "none"; });  
  taskLabel.addEventListener("keydown",function(event,ls){ createTask(event,ls); });
  
  ls.getUser(verifyUser);
  
  function verifyUser(exists)
  {
    if(!exists)
    {
      return ls.setDefaults(printList); 
    }
    else
    {
      ls.getData('TASKLIST',printList);
      ls.getData('TAGS',printTags);
    }
  }
}

function createTask(event,ls)
{
  console.log(ls);
  console.log(event.target);
  if(event.keyCode == 13)
  {
//    var task = new Task(event.target.value);
//    ls.addItem("TASKLIST",task,printList);
//    event.target.value = null;
  }
}

function printList(items,ls)
{
  var todoList = document.getElementById('taskList');
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
