function LocalStore()
{
  this.data = {};
  this.getUser();
}

LocalStore.prototype.getUser = function()
{
  this.getData("user",this.checkUser);
}

LocalStore.prototype.getData = function(key,callback)
{
  var ls = this;
  chrome.storage.local.get(key,function(result)
                               {
                                 ls.data[key] = result[key];
                                 if(callback)
                                 {
                                   callback(result[key],ls);
                                 }
                               }
                          );
}

LocalStore.prototype.checkUser = function(result,ls)
{
  if(ls.dataCheck(result))
  {
    console.log("user loaded");
    ls.user = result;
  }
  else
  {
    console.log("user created");
    var list = [{"label" : "create to do list app"},{"label" : "add things to list"},{"label" : "?????????"},{"label" : "profit"}];
    ls.user = {"name":"user1"};
    var data = {"user": ls.user,"taskList" : list};
  }
  ls.setData(data);
}

LocalStore.prototype.dataCheck = function(result)
{
  if(!result || result == null || result.length === 0)
  {
//    console.log("no result");
    return false;
  }
  else
  {
//    console.log(result);
    return true;
  }
}

LocalStore.prototype.setData = function(data)
{
  var ls = this;
  chrome.storage.local.set(data);
}

LocalStore.prototype.deleteItem = function(key,value)
{
  this.data[key].splice(value,1);
  this.setData(this.data);
}
