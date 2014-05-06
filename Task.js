function Task(label)
{
  this.timer = new Timer(0.25);

  this.id =  Math.random().toString(36).substr(2, 5);
  this.label = label;
  this.tags = [];

  this.active = true;
  this.complete = false;
  
  this.creationTime = new Date().getTime();
  this.completionTime = null;
}
Task.prototype.setTimer = function(timer)
{
  this.timer = timer;
}
Task.prototype.getTimer = function()
{
  return this.timer;
}
Task.prototype.setId = function(id)
{
  this.id = id;
}
Task.prototype.getId = function()
{
  return this.id;
}
Task.prototype.setLabel = function(aLabel)
{
  this.label = aLabel;
}
Task.prototype.getLabel = function()
{
  return this.label;
}
Task.prototype.setActive = function(active)
{
  this.active = active;
}
Task.prototype.getActive = function()
{
  return this.active;
}
Task.prototype.setComplete = function(complete)
{
  this.complete = complete;
  if(complete)
  {
    this.completionTime = new Date().getTime();
  }
}
Task.prototype.getComplete = function()
{
  return this.complete;
}
Task.prototype.setCreationTime = function(creationTime)
{
  this.creationTime = creationTime;
}
Task.prototype.getCreationTime = function()
{
  return this.creationTime;
}
Task.prototype.setCompletionTime = function(completionTime)
{
  this.completionTime = completionTime;
}
Task.prototype.getCompletionTime = function()
{
  return this.completionTime;
}