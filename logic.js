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
  var dumpSpace = document.getElementById("dump");
  var clickToImport = document.getElementById("importMenu");
  
  addTask.style.display = "none";
  hideAddTask.style.display = "none";
  hideMenu.style.display = "none";
  tagsMenu.style.display = "none";
  dumpSpace.style.display = "none";

  clickToImport.addEventListener("click",function(event)
                                         {
                                           ls.dumpData(dump);                                           
                                           if(dumpSpace.style.display == "none")
                                           {
                                             dumpSpace.style.display = "inline-block";
                                           }
                                           else
                                           {
                                             dumpSpace.style.display = "none";
                                           }
                                         }
                                );
  
  showAddTask.addEventListener("click",function(event)
                                       {
                                         ls.getData('TAGS',printTags);
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
                                                                var data  = JSON.parse(event.target.value);
                                                                ls.importData(data);
                                                                ls.getData('TASKLIST',getTasksByTag,"all");
                                                              }
                                                  );
  
  ls.getUser(verifyUser);
  
  function verifyUser(exists)
  {
    if(!exists)
    {
      return ls.setDefaults(getTasksByTag);
    }
    else
    {
      console.log(ls.data.USER);
      console.log(ls.data.USER.getActiveTag());
      ls.getData('TASKLIST',getTasksByTag,ls.data.USER.getActiveTag());
      ls.getData('TAGS',printTags);
    }
  }
}

function createTask(event)
{
  if(event.keyCode == 13)
  {
    var task = new Task(event.target.value);
    var tagList = document.getElementById("tagList").firstChild;
    var tags = tagList.getElementsByTagName("li");
    if(tags.length == 0)
    {
      task.addTag("other");
    }
    else
    {
      for(var i = 0; i < tags.length; i++)
      {
        if(tags[i].firstChild.checked)
        {
          task.addTag(tags[i].id);
        }
      }
      task.addTag("all");
      ls.addItem("TASKLIST",task,printTasks);
      
      event.target.value = null;
    }
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
    if(ls.data.USER.getActiveTag() == items[i])
    {
      tagCheck.checked = true;
    }
    var tagLabel = document.createTextNode(items[i].replace(/_/g," "));
    li.appendChild(tagCheck);
    li.appendChild(tagLabel);
    var a = document.createElement("a");
    a.id = i;
    a.onclick = function(event)
                {
                  document.getElementById(event.target.id).parentNode.style.display = "none";   
                  ls.deleteItem("TAGS",event.target.id);
                  console.log(event.target.id);
                };
    var remove = document.createTextNode("[ X ]");
    a.appendChild(remove);
    li.appendChild(a);
    
    ul.appendChild(li);
  }
  var createTag = document.createElement("input");
  createTag.setAttribute('type','text');
  createTag.id = "tagLabel";
  createTag.onkeydown = addTag;
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
    a.addEventListener("click",function(event)
                               {
                                 console.log(ls.data.USER);
                                 ls.data.USER.setActiveTag(event.target.id);
                                 ls.getData("TASKLIST",getTasksByTag,event.target.id);
                               }
                      );
    li.appendChild(a);
    ul.appendChild(li);
  }
  tagList.appendChild(ul);
}

function getTasksByTag(items,ls,tag)
{
  console.trace(tag);
  if(!tag || tag == null)
  {
    tag = "all";
  }
  var tasks = [];
  for(var i in items)
  {
    if(items[i].tags.indexOf(tag) != -1 && (tag == "completed" || items[i].tags.indexOf("completed") == -1))
    {
      if(items[i].deleted != true)
      {
        console.log(items[i].deleted);
        tasks[i] = items[i];
      }
      else
      {
        console.log(i);
      }
    }
  }
  printTasks(tasks,ls);
}

function printTasks(items,ls)
{
  var todoList = document.getElementById('taskList');
  while(todoList.firstChild)
  {
    todoList.removeChild(todoList.firstChild);
  }
  var ul = document.createElement("ul");
  for(var i in items)
  {
    var li = document.createElement("li");
    
    var taskCheck = document.createElement("input");
    taskCheck.setAttribute('type','checkbox');
    taskCheck.id = "check"+i;
    taskCheck.onchange = function(event)
                         {
                           document.getElementById(event.target.id).parentNode.style.textDecoration = "line-through";
                           document.getElementById(event.target.id).style.display = "none";
                           console.log(event.target.id.substr("check".length));
                           ls.data.TASKLIST[event.target.id.substr("check".length)].setComplete(true);
                           ls.data.TASKLIST[event.target.id.substr("check".length)].addTag("completed");
                           ls.setData();
                         };

    li.appendChild(taskCheck);

    
    var taskText = document.createTextNode(items[i].label)

    var editLink = document.createElement("a");
    editLink.id = "edit"+i;
    editLink.addEventListener("click",function(event)
                                      {
//                                        document.getElementById("taskLabel").value = document.getElementById(event.target.id).parentNode.innerText.substr(0,document.getElementById(event.target.id).parentNode.innerText.length - "[ EDIT ][ X ]".length); 
//                                        console.log(event.target.id.substr("edit".length));
//                                        showTaskForm(event,event.target.id.substr("edit".length));
                                      }
                             );
    var edit = document.createTextNode("[ EDIT ]");
    
    var removeLink = document.createElement("a");
    removeLink.id = i;//items[i].id;
    removeLink.addEventListener("click",function(event)
                               {
                                 document.getElementById(event.target.id).parentNode.style.display = "none";
                                 ls.data.TASKLIST[event.target.id].deleted = true;
                                 ls.setData();
                               }
                       );
    var remove = document.createTextNode("[ X ]");
    
    editLink.appendChild(edit);
    removeLink.appendChild(remove);
    li.appendChild(taskText);
    li.appendChild(editLink);
    li.appendChild(removeLink);
    li.addEventListener("dblclick",function(event)
                                   {
                                     var tarmac = document.getElementById("activeItem");
                                     while(tarmac.firstChild)
                                     {
                                       todoList.appendChild(tarmac.firstChild);                                       
//                                       tarmac.removeChild(tarmac.firstChild);
                                     }
                                     tarmac.appendChild(event.target);
//                                     event.target.removeEventListener("dblclick",arguments.callee);
//                                     event.target.addEventListener("dblclick",function(event)
//                                                                              {
//                                                                                todoList.appendChild(event.target);
//                                                                                event.target.removeEventListener("dblclick",arguments.callee);                                     
//                                                                              }
//                                                                  );
//                                     console.log(event.target);
                                   }
                       );
    ul.appendChild(li);
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

function showTaskForm(event,task)
{
  if(task)
  {
//    console.log(task);    
  }
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
