function countDown(timeInMinutes)
{
  var timerTime = new Date().getTime() +  timeInMinutes * 60 * 1000;

  var timerID = window.setInterval(function()
                     {
//                       var button = document.getElementById('timerControl');
//                       button.onclick = clearInterval(timerID); startTimer;
                       
                       var deltaTime = new Date().getTime();
                       var timeLeft = timerTime - deltaTime;
                       if(timeLeft >= 0)
                       {
                         document.getElementById('timer').innerHTML = timeLeft;
                       }
                       else
                       {                         
                         clearInterval(timerID);
                         showTimerControl();
                         document.getElementById('timer').innerHTML = "00:00:00.0";
                       }
                     },100);
}
