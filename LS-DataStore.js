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

  ls.data.TASKLIST = [];
  ls.data.TASKLIST.push(new Task("create to do list app"));
  ls.data.TASKLIST.push(new Task("add things to list"));
  ls.data.TASKLIST.push(new Task("??????????????????"));
  ls.data.TASKLIST.push(new Task("profit"));
  ls.data.TASKLIST.push(new Task("share propeller"));

  ls.data.TAGS = [];
  ls.data.TAGS.push("work");
  ls.data.TAGS.push("school");
  ls.data.TAGS.push("home");
  ls.data.TAGS.push("other");
  
  chrome.storage.local.set(ls.data,returnDefaults);
  
  function returnDefaults()
  {
    console.log(ls.data);
    callback(ls.data.TASKLIST,ls);
  }
}

LocalStore.prototype.getData = function(key,callback)
{
  var ls = this;
  chrome.storage.local.get(key,function(result)
                               {
                                 ls.data[key] = reconstitute(key,result[key]);
                                 ls.setData();
                                 callback(ls.data[key],ls);
                               }
                          );
  
  function reconstitute(object,value)
  {
    if(object == "USER")
    {
    }
    else if(object == "TASKLIST")
    {
      if(value.length > 0)
      {
        for(var i in value)
        {
          value[i] = reconstitute("TASK",value[i]);
        }
      }
      else
      {
        value = reconstitute("TASK",value);
      }
    }
    else if(object == "TIMER")
    {
      var tempTimer = new Timer(value.duration);
      value = tempTimer;
    }
    else if(object == "TASK")
    {
      var tempTask = new Task(value.label);
      for(var i in value)
      {
        tempTask[i] = value[i];
      }
      value = tempTask;
    }
    return value;
  }
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

LocalStore.prototype.addTag = function(key,value,callback)
{
  var ls = this;
  if(ls.data[key])
  {
    for(var i in value)
    {
      this.data[key].push(value[i]);
    }
  }
  else
  {
    ls.data[key] = value;
  }
  chrome.storage.local.set(this.data,returnData);
  
  function returnData()
  {
    callback(ls.data[key],ls);
  }
}

LocalStore.prototype.setData = function()
{
  chrome.storage.local.set(this.data);
}
