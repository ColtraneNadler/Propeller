window.onload = function()
{
  var ls = new LocalStore();
  ls.getUser(verifyUser);
  var todoIn = document.getElementById('task-in');
  var tagIn = document.getElementById('tagLabel');
  tagIn.onkeydown = addTag;
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
      ls.getData('TAGS',printTags);
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

  function addTag(event)
  {
    if(event.keyCode == 13)
    {
      var tag = event.target.value.replace(/, /g,",");
      tag = tag.split(",");
      for(var i = 0; i < tag.length; i++)
      {
        tag[i] = tag[i].replace(/ /g,"_");
      }
      ls.addTag("TAGS",tag,printTags);
      event.target.value = null;
    }
  }
}

function loadItems(items)
{
  console.log(items);
}

function printTags(items,ls)
{
  var tagList = document.getElementById('tagList');
  while(tagList.firstchild)
  {
    tagList.removeChild(tagList.firstChild);
  }
  var ul = document.createElement("ul");
  for(var i in items)
  {
    var li = document.createElement("li");
    var tagLabel = document.createTextNode(items[i].replace(/_/g," "));
    li.appendChild(tagLabel);
    ul.appendChild(li);
  }
  tagList.appendChild(ul);
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
