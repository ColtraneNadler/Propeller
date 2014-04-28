function Task(label)
{
  this.timer = new Timer(0.25);
  this.complete = false;
  this.label = label;
  this.creationTime = new Date().getTime();
}

Task.prototype.setLabel = function(aLabel)
{
  this.label = aLabel;
}

Task.prototype.getLabel = function()
{
  return this.label;
}

Task.prototype.setTime = function(aTime)
{
  this.timer.setDuration(aTime);
}
Task.prototype.setComplete = function(complete)
{
  this.complete = complete;
  if(complete)
  {
    this.completionTime = new Date().getTime();
  }
}
