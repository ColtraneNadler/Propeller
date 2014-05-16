function User(name)
{
  this.name = name;
  this.activeTag = "all";
}
User.prototype.setActiveTag = function(activeTag)
{
  this.activeTag = activeTag;
}
User.prototype.getActiveTag = function()
{
  return this.activeTag;
}
