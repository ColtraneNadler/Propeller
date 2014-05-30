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
//      console.log(ls.data.USER);
//      console.log(ls.data.USER.getActiveTag());
//      console.log(ls.data.USER.getActiveTask());
      document.getElementById("activeItem");
      ls.getData('TASKLIST',getTasksByTag,ls.data.USER.getActiveTag());
      ls.getData('TAGS',printTags);
      console.log(ls.data.USER.getActiveTask());
      ls.getData('TASKLIST',getActiveTaskFromTasklist,ls.data.USER.getActiveTask());
    }
  }
}

function getActiveTaskFromTasklist(tasklist,ls,activeTask)
{
//  console.log(activeTask);
  var activeItem = document.getElementById("activeItem");
  while(activeItem.firstChild) {
    activeItem.removeChild(activeItem.firstChild);
  }
  if(activeTask && activeTask != null) {
//  activeItem.innerText = tasklist[activeTask].label;

    var taskCheck = document.createElement("input");
    taskCheck.setAttribute('type','checkbox');
    taskCheck.id = "check";
    taskCheck.onchange = function(event)
                         {
                           document.getElementById(event.target.id).parentNode.style.textDecoration = "line-through";
                           document.getElementById(event.target.id).style.display = "none";
                           ls.data.TASKLIST[activeTask].setComplete(true);
                           ls.data.TASKLIST[activeTask].addTag("completed");
                           ls.data.USER.setActiveTask(null);
                           ls.setData();
                           ls.getData('TASKLIST',getTasksByTag,ls.data.USER.getActiveTag());
                           ls.getData('TAGS',printTags);
                           ls.getData('TASKLIST',getActiveTaskFromTasklist,ls.data.USER.getActiveTask());
                         };
    activeItem.appendChild(taskCheck);

    var taskText = document.createTextNode(tasklist[activeTask].label);

    var editLink = document.createElement("a");
    editLink.id = "edit";
    editLink.addEventListener("click",function(event)
                                      {
//                                        document.getElementById("taskLabel").value = document.getElementById(event.target.id).parentNode.innerText.substr(0,document.getElementById(event.target.id).parentNode.innerText.length - "[ EDIT ][ X ]".length); 
//                                        console.log(event.target.id.substr("edit".length));
//                                        showTaskForm(event,event.target.id.substr("edit".length));
                                      }
                             );
    var edit = document.createTextNode("[ EDIT ]");
    
    var removeLink = document.createElement("a");
    removeLink.id = "remove";//items[i].id;
    removeLink.addEventListener("click",function(event)
                                        {
                                          document.getElementById(event.target.id).parentNode.innerHTML = null;
//                                          document.getElementById(event.target.id).parentNode.style.display = "none";
                                          ls.data.TASKLIST[activeTask].deleted = true;
                                          ls.data.USER.setActiveTask(null);
                                          ls.setData();
//                                          ls.getData('TASKLIST',getTasksByTag,ls.data.USER.getActiveTag());
//                                          ls.getData('TAGS',printTags);
//                                          ls.getData('TASKLIST',getActiveTaskFromTasklist,null);   
//                                          activeItem.style.display = "block";
                                        }
                               );
    var remove = document.createTextNode("[ X ]");
  
    editLink.appendChild(edit);
    removeLink.appendChild(remove);
    activeItem.appendChild(taskText);
    activeItem.appendChild(editLink);
    activeItem.appendChild(removeLink);
    activeItem.addEventListener("dblclick",function(event)
                                           {
                                             ls.data.USER.setActiveTask(null);
                                             ls.setData();
                                             document.getElementById(event.target.id).innerHTML = null;
                                             ls.getData('TASKLIST',getTasksByTag,ls.data.USER.getActiveTag());
//                                             console.log(event.target.id);
//                                             ls.setData();
//                                             ls.getData('TASKLIST',getActiveTaskFromTasklist,ls.data.USER.getActiveTask());
                                           }
                               );
  }
  activeItem.setAttribute('title',ls.data.TASKLIST[activeTask].notes);
  activeItem.style.display = "block";
}

//document.getElementById("activeTask").innerText = ls.data.TASKLIST[ls.data.USER.getActiveTask()].label;

function createTask(event)
{
  if(event.keyCode == 13)
  {
    var task = new Task(event.target.value);
    var tagList = document.getElementById("tagList").firstChild;
    var taskNote = document.getElementById("taskNote").value;
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
   //   console.log(taskNote);
      task.setNote(taskNote);
      ls.addItem("TASKLIST",task,getTasksByTag,ls.data.USER.getActiveTag());
      
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
                  if(ls.data.USER.getActiveTag() == event.target.parentNode.innerText.substr(0,event.target.parentNode.innerText.length - "[ X ]".length)) {
                    ls.data.USER.setActiveTag("all");
                  }
                  document.getElementById(event.target.id).parentNode.style.display = "none";
                  ls.deleteItem("TAGS",event.target.id);
                  ls.getData('TASKLIST',removeTagsFromTasks,event.target.parentNode.innerText.substr(0,event.target.parentNode.innerText.length - "[ X ]".length));
                  ls.getData('TASKLIST',getTasksByTag,ls.data.USER.getActiveTag());
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
function removeTagsFromTasks(items,ls,tag)
{
  console.log("removing " + tag + " tag.");
  for(var i in items) {
    if(tag != "all" && tag != "other" && tag != "completed" && items[i].tags.indexOf(tag) != -1 && !items[i].complete) {
      items[i].tags.splice(items[i].tags.indexOf(tag), 1);
      console.log(items[i]);
    }
  }
//  console.log(items);
  ls.data.TASKLIST = items;
  ls.setData();
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
//  console.trace(tag);
  if(!tag || tag == null)
  {
    tag = "all";
  }
  var tasks = [];
  for(var i in items)
  {
    if(items[i].tags.indexOf(tag) != -1 && (tag == "completed" || items[i].tags.indexOf("completed") == -1) && i != ls.data.USER.getActiveTask())
    {
      if(items[i].deleted != true)
      {
//        console.log(items[i].deleted);
        tasks[i] = items[i];
      }
      else
      {
//        console.log(i);
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
    li.id = i;
    if(!items[i].complete) {
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
    }
    
    var taskText = document.createTextNode(items[i].label)

    if(!items[i].complete) {
      var editLink = document.createElement("a");
      editLink.id = "edit"+i;
      editLink.addEventListener("click",function(event)
                                        {
                                          showEditForm(event,i);
//                                          document.getElementById("taskLabel").value = document.getElementById(event.target.id).parentNode.innerText.substr(0,document.getElementById(event.target.id).parentNode.innerText.length - "[ EDIT ][ X ]".length); 
//                                          console.log(event.target.id.substr("edit".length));
//                                          showTaskForm(event,event.target.id.substr("edit".length));
                                        }
                               );
      var edit = document.createTextNode("[ EDIT ]");
    
      var removeLink = document.createElement("a");
      removeLink.id = "remove"+i;//items[i].id;
      removeLink.addEventListener("click",function(event)
                                 {
                                   document.getElementById(event.target.id).parentNode.style.display = "none";
                                   ls.data.TASKLIST[event.target.id.substr("remove".length)].deleted = true;
                                   ls.setData();
                                 }
                         );
      var remove = document.createTextNode("[ X ]");
    
      editLink.appendChild(edit);
      removeLink.appendChild(remove);
    }
    li.appendChild(taskText);
    if(!items[i].complete) {
      li.appendChild(editLink);

      li.appendChild(removeLink);
      li.addEventListener("dblclick",function(event)
                                     {
                                       ls.data.USER.setActiveTask(event.target.id);
                                       var tarmac = document.getElementById("activeItem");
                                       while(tarmac.firstChild)
                                       {
//                                         todoList.appendChild(tarmac.firstChild);                         
                                         tarmac.removeChild(tarmac.firstChild);
                                       }
//                                       tarmac.appendChild(event.target);
                                       ls.getData('TASKLIST',getTasksByTag,ls.data.USER.getActiveTag());
//                                       console.log(event.target.id);
                                       ls.setData();
                                       ls.getData('TASKLIST',getActiveTaskFromTasklist,ls.data.USER.getActiveTask());
                                     }
                         );
    }
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

function showEditForm(event,task)
{
  console.log(event.target.id.substr("edit".length));
  var editTaskForm = document.getElementById("editTask");
  while(editTaskForm.firstChild) {
    editTaskForm.removeChild(editTaskForm.firstChild);
  }
  var task = event.target.id.substr("edit".length);
  var targetTask = document.createTextNode(event.target.id.substr("edit".length));
  var taskLabel = document.createElement("input");
  taskLabel.setAttribute('type','text');
  taskLabel.setAttribute('value',ls.data.TASKLIST[event.target.id.substr("edit".length)].label);
  taskLabel.addEventListener("keydown",function(event){editTask(event,task);});
  var tags = ls.data.TAGS;
  var tagList = document.createElement("ul");
  tagList.id = "editTags";
  for(var i in tags)
  {
    if(tags[i] != "all")
    {
      var tag = document.createElement("li");
      var tagCheck = document.createElement("input");
      tagCheck.setAttribute('type','checkbox');
      if(ls.data.TASKLIST[event.target.id.substr("edit".length)].isTag(tags[i]))
      {
        tagCheck.checked = true;
      }
      tag.appendChild(tagCheck);
      tag.appendChild(document.createTextNode(tags[i]));
      tagList.appendChild(tag);
    }
  }
  var editTaskNote = document.createElement("input");
  editTaskNote.setAttribute('type','text');
  editTaskNote.setAttribute('value',ls.data.TASKLIST[event.target.id.substr("edit".length)].getNote());
//  editTaskForm.appendChild(targetTask);
  editTaskForm.appendChild(taskLabel);
  editTaskForm.appendChild(tagList);
  editTaskForm.appendChild(editTaskNote);
}

function returnWorld(items)
{
  return items;
}

function editTask(event,task)
{
//  console.log(task);
  if(event.keyCode == 13)
  {
    var editTags = document.getElementById("editTags");
    var tags = editTags.getElementsByTagName("li");
    for(var i = 0; i < tags.length; i++)
    {
      if(tags[i].firstChild.checked && !ls.data.TASKLIST[task].isTag(tags[i].innerText))
      {
        ls.data.TASKLIST[task].addTag(tags[i].innerText);
      }
      else if(!tags[i].firstChild.checked && ls.data.TASKLIST[task].isTag(tags[i].innerText))
      {
        ls.data.TASKLIST[task].removeTag(tags[i]);
      }
//      console.log(tags[i].innerText);
//      console.log(tags[i].firstChild);
    }
    ls.data.TASKLIST[task].setLabel(event.target.value);
    ls.data.TASKLIST[task].setNote(event.target.parentNode.lastChild.value);
//    console.log(event.target);
//    console.log(tasklist);
    ls.setData();
    ls.getData('TASKLIST',getTasksByTag,ls.data.USER.getActiveTag());
    ls.getData('TASKLIST',getActiveTaskFromTasklist,ls.data.USER.getActiveTask());
    while(event.target.parentNode)
    {
      event.target.parentNode.removeChild(event.target.parentNode.lastChild);
    }
  }
}
