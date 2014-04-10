window.onload = function()
{
  var pomodoro = new Timer(0.25);
  var taskList = new Array();

//generate a dummy array of tasks
  for(var i = 0; i < 5; i++)
  {
    taskList[i] = new Task();
    taskList[i].setLabel("Item "+(i+1));
  }

//if there are any tasks, create a list and display them
  if(taskList.length > 0)
  {
    var todoList = document.getElementById('tasklist');
    var ul = document.createElement("ul");
    for(var i = 0; i < taskList.length; i++)
    {
      var li = document.createElement("li");
      li.id = taskList[i].getLabel();
      li.draggable = true;
      li.appendChild(document.createTextNode(taskList[i].getLabel()));
      ul.appendChild(li);
    }
    todoList.appendChild(ul);
  }

  document.getElementById('activeItem').ondrop = function(){dragDrop(event,pomodoro);};
  document.getElementById('activeItem').ondragenter = cancel;
  document.getElementById('activeItem').ondragover = cancel; //function(){return dragOver(event);};  

  makeDraggable();
}

//Everything below here needs to be cleaned up
function cancel(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

function dragStart(ev)
{
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData('Text',ev.target.id);
  return true;
}

function dragDrop(ev,aTimer)
{
  var data = ev.dataTransfer.getData('Text');
  ev.target.innerHTML = "";
  ev.target.innerHTML = "<span draggable=\"true\">"+data+"</span>";
  document.getElementById(data).style.display = "none";
  aTimer.setFace(document.getElementById('timer'));
  aTimer.stop();
  aTimer.setDuration(0.25);
  aTimer.face.onclick = function(){aTimer.togglePause();};
  aTimer.countDown();
  ev.stopPropagation();
  return false;
}

function makeDraggable()
{
  var element = document.getElementsByTagName('li');
  for(var i = 0; i < element.length; i++)
  {
    element[i].ondragstart = function(){dragStart(event);};
  }
}
