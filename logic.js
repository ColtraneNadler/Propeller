var ls = new LocalStore();

window.onload = function()
{  
  var addTask = document.getElementById("addTask");
  var showAddTask = document.getElementById("showAddTask");
  var hideAddTask = document.getElementById("hideAddTask");
  var taskLabel = document.getElementById("taskLabel");
  var showMenu = document.getElementById("showMenu");
  var hideMenu = document.getElementById("hideMenu");
  var tagsMenu = document.getElementById("tagsMenu");
  
  addTask.style.display = "none";
  hideAddTask.style.display = "none";
  hideMenu.style.display = "none";
  tagsMenu.style.display = "none";

  showAddTask.addEventListener("click",function(event)
                                       {
                                         hideTagMenu(event);
                                         showTaskForm(event);
                                       }
                              );
  hideAddTask.addEventListener("click",function(event)
                                       {
                                         hideTaskForm(event);
                                       }
                              );
  taskLabel.addEventListener("keydown",function(event,ls){ createTask(event,ls); });
  
  showMenu.addEventListener("click",function(event)
                                    {
                                      hideTaskForm(event);
                                      showTagMenu(event);
                                    }
                            );
  hideMenu.addEventListener("click",function(event)
                                    {
                                      hideTagMenu(event);
                                    }
                            );
  document.getElementById("dump").addEventListener("dblclick",function(event)
                                                              {
                                                                console.log("event detected");
                                                                var data  = JSON.parse(event.target.value);
                                                                console.log(data);
                                                                ls.importData(data);
                                                              }
                                                  );
  
  ls.getUser(verifyUser);
  
  function verifyUser(exists)
  {
    if(!exists)
    {
      return ls.setDefaults(printTasks); 
    }
    else
    {
      ls.getData('TASKLIST',printTasks);
      ls.getData('TAGS',printTags);
    }
  }
}

ls.dumpData(dump);
//ls.dumpData(ls.importData);

function createTask(event)
{
  if(event.keyCode == 13)
  {
    var task = new Task(event.target.value);
    var tagList = document.getElementById("tagList").firstChild;
    var tags = tagList.getElementsByTagName("li");
    for(var i = 0; i < tags.length; i++)
    {
      if(tags[i].firstChild.checked)
      {
//        console.log(tags[i].id);
        task.addTag(tags[i].id);
      }
    }
//    console.log(task);
    ls.addItem("TASKLIST",task,printTasks);
    event.target.value = null;
  }
}

function dump(data)
{
  var output = document.createTextNode(data);
  document.getElementById("dump").appendChild(output);
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

function printTags(items,ls)
{
  var tagList = document.getElementById('tagList');
  while(tagList.firstChild)
  {
    tagList.removeChild(tagList.firstChild);
  }
  var ul = document.createElement("ul");
  for(var i in items)
  {
    var li = document.createElement("li");
    li.id = items[i];
    var tagCheck = document.createElement("input");
    tagCheck.setAttribute('type','checkbox');
    var tagLabel = document.createTextNode(items[i].replace(/_/g," "));
    li.appendChild(tagCheck);
    li.appendChild(tagLabel);
    
    var a = document.createElement("a");
    a.id = i;
    a.onclick = function(event){document.getElementById(event.target.id).parentNode.style.display = "none";ls.deleteItem("TAGS",event.target.id);console.log(event.target.id);};
    var remove = document.createTextNode("[ X ]");
    a.appendChild(remove);
    li.appendChild(a);
    
    ul.appendChild(li);
  }
//  var li = document.createElement("li");
  var createTag = document.createElement("input");
  createTag.setAttribute('type','text');
  createTag.id = "tagLabel";
  createTag.onkeydown = addTag;
//  li.appendChild(createTag);
  ul.appendChild(li);
  tagList.appendChild(ul);
  tagList.appendChild(createTag);
}

function makeMenu(items,ls)
{
  var tagList = document.getElementById('tagsMenu');
  while(tagList.firstChild)
  {
    tagList.removeChild(tagList.firstChild);
  }
  var ul = document.createElement("ul");
  for(var i in items)
  {
    var li = document.createElement("li");
    li.id = items[i];
    var tagLabel = document.createTextNode(items[i].replace(/_/g," "));
    var a = document.createElement("a");
    a.id=items[i];
    a.appendChild(tagLabel);
    a.addEventListener("click",function(event){ls.getData("TASKLIST",getTasksByTag,event.target.id);});
    li.appendChild(a);
    ul.appendChild(li);
  }
  tagList.appendChild(ul);
//  getTasksByTag();
}

function getTasksByTag(items,ls,tag)
{
  var tasks = [];
  for(var i in items)
  {
    if(items[i].tags.indexOf(tag) != -1)
    {
      tasks.push(items[i]);      
    }
//    console.log(items[i].tags.indexOf("#houston"));
  }
//  console.log(tasks);
//  return tasks;
  printTasks(tasks,ls);
}

function printTasks(items,ls)
{
  console.log(items);
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
    taskCheck.onchange = function(event){document.getElementById(event.target.id).parentNode.style.textDecoration = "line-through"; document.getElementById(event.target.id).style.display = "none";console.log(event.target.id.substr("check".length));ls.data.TASKLIST[event.target.id.substr("check".length)].setComplete(true);ls.data.TASKLIST[event.target.id.substr("check".length)].addTag("completed");ls.setData();};
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

function showTagMenu(event)
{
  ls.getData('TAGS',makeMenu);
//  ls.getData('TASKLIST',getTasksByTag,"#houston");
  document.getElementById("tagsMenu").style.display = "inline-block";
  document.getElementById("hideMenu").style.display = "inline-block";
  document.getElementById("showMenu").style.display = "none";
}

function hideTagMenu(event)
{
  document.getElementById("tagsMenu").style.display = "none";
  document.getElementById("hideMenu").style.display = "none";
  document.getElementById("showMenu").style.display = "inline-block";
}

function showTaskForm(event)
{
  document.getElementById("addTask").style.display = "inline-block";
  document.getElementById("hideAddTask").style.display = "inline-block";
  document.getElementById("showAddTask").style.display = "none";
}

function hideTaskForm(event)
{
  document.getElementById("addTask").style.display = "none";
  document.getElementById("hideAddTask").style.display = "none";
  document.getElementById("showAddTask").style.display = "inline-block";
}
