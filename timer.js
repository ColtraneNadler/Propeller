function Timer(time, face)
{
  this.duration = time;
  this.timerID = 0;
  this.refreshInterval = 100;
  this.isRunning = false;
}

Timer.prototype.setFace = function(face)
{
  this.face = face;
}

Timer.prototype.setDuration = function(time)
{
  this.duration = time;
}

Timer.prototype.countDown = function()
{
  if(this.isRunning == false)
  {
    this.isRunning = true;
    this.timerEnd = new Date().getTime() + this.duration * 60 * 1000;
    var that = this;
    this.timerID = window.setInterval(function(){that.tick();},this.refreshInterval);
  }
}

Timer.prototype.tick = function()
{
  var timeLeft = this.timerEnd - (new Date().getTime()) ;
  if(timeLeft > 0)
  {
    this.speak(this.prependZero(this.getHours(timeLeft))+":"+this.prependZero(this.getMinutes(timeLeft))+":"+this.prependZero(this.getSeconds(timeLeft))+"."+this.getMilliseconds(timeLeft));
  }
  else
  {
    this.stop();
  }
}

Timer.prototype.stop = function()
{
    clearInterval(this.timerID);
    this.timerID = 0;
    this.speak("00:00:00.0");
    this.isRunning = false;
}

Timer.prototype.getMilliseconds = function(milliseconds)
{
  return Math.floor((milliseconds % 1000) / 100);
}

Timer.prototype.getSeconds = function(milliseconds)
{
  return (Math.floor(milliseconds / 1000) % 60);
}

Timer.prototype.getMinutes = function(milliseconds)
{
  return (Math.floor((milliseconds / 1000) / 60) % 60);
}

Timer.prototype.getHours = function(milliseconds)
{
  return Math.floor((milliseconds / 1000 / 3600));
}

Timer.prototype.prependZero = function(value)
{
  if(Math.floor(value / 10) == 0)
  {
    return "0"+value;
  }
  else
  {
    return value;
  }
}

Timer.prototype.speak = function(message)
{
  this.face.innerHTML = message;
}
