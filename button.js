function startTimer()
{
  var button = document.getElementById('timerControl');
  countDown(0.25);
  hideTimerControl();
}

function hideTimerControl()
{
  var button = document.getElementById('timerControl');
  button.style.display = "none";  
}

function showTimerControl()
{
  var button = document.getElementById('timerControl');
  button.style.display = "inline";  
}

function stopTimer()
{
}
