function Task()
{
  this.timer = new Timer(0.25);
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
