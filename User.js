function User(name)
{
  this.name = name;
  this.activeTag = "all";
  this.activeTask;
}
User.prototype.setActiveTag = function(activeTag)
{
  this.activeTag = activeTag;
}
User.prototype.getActiveTag = function()
{
  return this.activeTag;
}
User.prototype.setActiveTask = function(activeTask)
{
  this.activeTask = activeTask;
}
User.prototype.getActiveTask = function()
{
  return this.activeTask;
}
