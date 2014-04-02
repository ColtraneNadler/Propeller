var pomodoro = new Timer(0.25);

window.onload = setEvents;

function setEvents()
{
  pomodoro.setFace(document.getElementById('timer'));
  pomodoro.face.onclick = function(){pomodoro.countDown();};

  Timer.prototype.speak = function(message)
  {
    this.face.innerHTML = message;
  }
}
