function startTimer()
{
  var button = document.getElementById('timerControl');
  button.value = "STOP";
  button.onclick = stopTimer;
}

function stopTimer()
{
  var button = document.getElementById('timerControl');
  button.value = "START";
  button.onclick = startTimer;
}
