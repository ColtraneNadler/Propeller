window.onload = function()
{
  var ls = new LocalStore();  
  ls.getData("TASKLIST",printList);
}

function printList(items)
{
  var todoList = document.getElementById('tasklist');
  var ul = document.createElement("ul");
  for(i in items)
  {
    var li = document.createElement("li");
//    li.id = taskList[i].getLabel();
//    li.draggable = true;
    var taskText = document.createTextNode(items[i].label)
    var a = document.createElement("a");
    a.id = i;
    var remove = document.createTextNode("[ X ]");
    a.appendChild(remove);
    li.appendChild(taskText);
    li.appendChild(a);
    ul.appendChild(li);
  }
  todoList.appendChild(ul);
}
