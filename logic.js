window.onload = function()
{
   var ls = new LocalStore();  
  ls.getData("taskList",printList);
}

function printList(items)
{
  var ls = new LocalStore();
  ls.data['taskList'] = items;
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
    a.onclick = function(event){document.getElementById(event.target.id).parentNode.style.display = "none";ls.deleteItem("taskList",event.target.id);console.log(event.target.id);};
    var remove = document.createTextNode("[ X ]");
    a.appendChild(remove);
    li.appendChild(taskText);
    li.appendChild(a);
    ul.appendChild(li);
  }
  todoList.appendChild(ul);
}
