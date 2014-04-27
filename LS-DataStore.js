function LocalStore(callback)
{
  this.data = {};
}

LocalStore.prototype.getUser = function(callback)
{
  var ls = this;
  chrome.storage.local.get('USER',function(result){ls.data.USER = result.USER;callback(!!Object.keys(result).length);});
}

LocalStore.prototype.setDefaults = function(callback)
{
  var ls = this;
  ls.data.USER = {"name" : "user1"};
  ls.data.TASKLIST = [{"label" : "create to do list app"},{"label" : "add things to list"},{"label" : "?????????"},{"label" : "profit"},{"label" : "share propeller with your friends"}];
  chrome.storage.local.set(ls.data,returnDefaults);
  
  function returnDefaults()
  {
    callback(ls.data.TASKLIST,ls);
  }
}

LocalStore.prototype.getData = function(key,callback)
{
  var ls = this;
  chrome.storage.local.get(key,function(result){ls.data[key] = result[key];callback(result[key],ls);});
}

LocalStore.prototype.deleteItem = function(key,value,callback)
{
  this.data[key].splice(value,1);
  //this needs a callback
  chrome.storage.local.set(this.data);
}

LocalStore.prototype.addItem = function(key,value,callback)
{
  var ls = this;
  this.data[key].push(value);
  chrome.storage.local.set(this.data,returnData);
  
  function returnData()
  {
    callback(ls.data[key],ls);
  }
}
