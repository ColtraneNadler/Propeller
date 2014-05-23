function LocalStore(callback)
{
  this.data = {};
}

LocalStore.prototype.getUser = function(callback)
{
  var ls = this;
  chrome.storage.local.get('USER',function(result)
                                  {
//                                    console.log(Object.keys(result).length);
                                    if(Object.keys(result).length == 1)
                                    {
                                      ls.data.USER = reconstitute("USER",result.USER);
                                    }
                                    callback(!!Object.keys(result).length);
                                  }
                          );
  
  function reconstitute(object,value)
  {
    if(object == "USER")
    {
      var tempUser = new User(value.name);
      for(var i in value)
      {
        tempUser[i] = value[i];
      }
      value = tempUser;
    }
    return value;
  }

}

LocalStore.prototype.setDefaults = function(callback)
{
  var ls = this;
  ls.data.USER = new User("user1");
  
  ls.data.TAGS = [];
  ls.data.TAGS.push("all");
  ls.data.TAGS.push("work");
  ls.data.TAGS.push("school");
  ls.data.TAGS.push("home");
  ls.data.TAGS.push("other");
  ls.data.TAGS.push("completed");
  
  ls.data.TASKLIST = [];  
  
  var task = new Task("create to do list app");
  task.addTag("all");
  task.addTag("other");
  ls.data.TASKLIST.push(task);
  
  var task = new Task("add things to list");
  task.addTag("all");
  task.addTag("other");
  ls.data.TASKLIST.push(task);

  var task = new Task("??????????????????");
  task.addTag("all");
  task.addTag("other");
  ls.data.TASKLIST.push(task);
  
  var task = new Task("profit");
  task.addTag("all");
  task.addTag("other");
  ls.data.TASKLIST.push(task);
  
  var task = new Task("share propeller");
  task.addTag("all");
  task.addTag("other");
  ls.data.TASKLIST.push(task);
  
  chrome.storage.local.set(ls.data,returnDefaults);
  
  function returnDefaults()
  {
    callback(ls.data.TASKLIST,ls);
  }
}

LocalStore.prototype.getData = function(key,callback,args)
{
  var ls = this;
  chrome.storage.local.get(key,function(result)
                               {
                                 ls.data[key] = reconstitute(key,result[key]);
                                 ls.setData();
                                 callback(ls.data[key],ls,args);
                               }
                          );
  
  function reconstitute(object,value)
  {
    if(object == "USER")
    {
      var tempUser = new User(value.name);
      for(var i in value)
      {
        tempUser[i] = value[i];
      }
      console.log(tempUser);
      value = tempUser;
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
//        if(i != "deleted")
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

LocalStore.prototype.addItem = function(key,value,callback,args)
{
  var ls = this;
  this.data[key].push(value);
  chrome.storage.local.set(this.data,returnData);
  
  function returnData()
  {
    callback(ls.data[key],ls,args);
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

LocalStore.prototype.dumpData = function(callback)
{
  chrome.storage.local.get(null,function(result){callback(JSON.stringify(result))});
}

LocalStore.prototype.importData = function(input)
{
  if(Object.prototype.toString.call(input) == "[object Object]")
  {
    for(var i in input.TAGS)
    {
      if(this.data.TAGS.indexOf(input.TAGS[i]) == -1)
      {
        this.data.TAGS.push(input.TAGS[i]);
      }
    }
    for(var i in input.TASKLIST)
    {
      if(isUniqueTask(input.TASKLIST[i],this.data.TASKLIST))
      {
        var tempTask = new Task(input.TASKLIST[i].label);
        for(var j in input.TASKLIST[i])
        {
          tempTask[j] = input.TASKLIST[i][j];
        }
        console.trace(tempTask);
        if(tempTask.tags.length == 0)
        {
          tempTask.addTag("other");
        }
        if(tempTask.getComplete())
        {
          tempTask.addTag("completed");
        }
        tempTask.addTag("all");
        this.data.TASKLIST.push(tempTask);
      }
    }
  }
  else
  {
    console.log(input);
  }
  this.setData();
  
  function isUniqueTask(task,taskList)
  {
    var unique = true;
    var m = 0;
    while(unique && m < taskList.length)
    {
      unique = (!taskList[m].getLabel().localeCompare(task.label) == 0);
      m++;
    }
    return unique;
  }
}
