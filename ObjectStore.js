function ObjectStoreIndex(name,keyPath)
{
  this.name = name;
  this.keyPath = keyPath;
  this.unique = false;
  this.multiEntry = false;
}

ObjectStoreIndex.prototype.setName = function(name)
{
  this.name = name;
}

ObjectStoreIndex.prototype.getName = function()
{
  return this.name;
}

ObjectStoreIndex.prototype.setKeyPath = function(keyPath)
{
  this.keyPath = keyPath;
}

ObjectStoreIndex.prototype.getKeyPath = function()
{
  return this.keyPath;
}

ObjectStoreIndex.prototype.setUnique = function(unique)
{
  this.unique = unique;
}

ObjectStoreIndex.prototype.getUnique = function()
{
  return this.unique;
}

ObjectStoreIndex.prototype.setMultiEntry = function(multiEntry)
{
  this.multiEntry = multiEntry;
}

ObjectStoreIndex.prototype.getMultiEntry = function()
{
  return this.multiEntry;
}

function ObjectStore(name)
{
  this.name = name;
  this.index = Array();
  this.keyPath = null;
  this.autoIncrement = true;
  this.defaultEntry = Array();
}

ObjectStore.prototype.setName = function(name)
{
  this.name = name;
}

ObjectStore.prototype.getName = function()
{
  return this.name;
}

ObjectStore.prototype.addIndex = function(index)
{
  this.index.push(index);
}

ObjectStore.prototype.removeIndex = function(index)
{
  this.index.splice(index,1);
}

ObjectStore.prototype.getIndex = function()
{
  return this.index;
}

ObjectStore.prototype.setKeyPath = function(keyPath)
{
  this.keyPath = keyPath;
}

ObjectStore.prototype.getKeyPath = function()
{
  return this.keyPath;
}

ObjectStore.prototype.setAutoIncrement = function(autoIncrement)
{
  this.autoIncrement = autoIncrement;
}

ObjectStore.prototype.getAutoIncrement = function()
{
  return this.autoIncrement;
}

ObjectStore.prototype.setDefaultEntry = function(defaultEntry)
{
  this.defaultEntry = defaultEntry;
}

ObjectStore.prototype.getDefaultEntry = function()
{
  return this.defaultEntry;
}
