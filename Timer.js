//(function(window)
// {
function Timer(time, face)
{
  this.duration = time;
  this.timerID = 0;
  this.refreshInterval = 100;
  this.isRunning = false;
  this.timeLeft = time * 60 * 1000;
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
  if(!this.isRunning)
  {
    this.isRunning = true;
//    this.timeLeft = (this.timeLeft == 0) ? this.duration * 60 * 1000 : this.timeLeft;
    this.timerEnd = new Date().getTime() + this.timeLeft;
    var that = this;
    this.timerID = window.setInterval(function(ls){that.tick(ls);},this.refreshInterval);
  }
}

Timer.prototype.tick = function(ls)
{
  this.timeLeft = this.timerEnd - (new Date().getTime());
  if(this.timeLeft > 0)
  {
    this.speak(this.prependZero(this.getHours(this.timeLeft))+":"+this.prependZero(this.getMinutes(this.timeLeft))+":"+this.prependZero(this.getSeconds(this.timeLeft))+"."+this.getMilliseconds(this.timeLeft));
//    ls.setData();
  }
  else
  {
    this.stop(ls);
  }
}

Timer.prototype.pause = function(ls)
{
  if(this.isRunning)
  {
    clearInterval(this.timerID);
    this.timerID = 0;
    this.isRunning = false;
//    ls.setData();
  }
}

Timer.prototype.togglePause = function(ls)
{
  if(this.isRunning)
  {
    this.pause(ls);
  }
  else  //this.isRunning = false;
  {
    this.countDown(ls);
  }
  ls.setData();
}

Timer.prototype.stop = function(ls)
{
  clearInterval(this.timerID);
  this.timerID = 0;
  this.speak("00:00:00.0");
  this.timeLeft = 0;
  this.isRunning = false;
  ls.setData();
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

Timer.prototype.tellTime = function()
{
  this.speak(this.prependZero(this.getHours(this.timeLeft))+":"+this.prependZero(this.getMinutes(this.timeLeft))+":"+this.prependZero(this.getSeconds(this.timeLeft))+"."+this.getMilliseconds(this.timeLeft));
}
//  window.Timer = Timer;
//}(window));
