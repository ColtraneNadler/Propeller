window.onload = function()
{
  var pomodoro = new Timer(0.25);
  document.getElementById('activeItem').ondrop = function(){dragDrop(event,pomodoro);};
  document.getElementById('activeItem').ondragenter = cancel;
  document.getElementById('activeItem').ondragover = cancel; //function(){return dragOver(event);};  

  makeDraggable();
}

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
