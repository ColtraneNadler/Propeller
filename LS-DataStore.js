function LocalStore(callback)
{
  this.data = {};
//  this.getUser();
}

LocalStore.prototype.getUser = function()
{
  var ls = this;
  chrome.storage.local.get(null,function(result)
                                  {
//                                    console.log(Object.keys(result).indexOf("USER"));
//                                    console.log(result.hasOwnProperty("USER"));
//                                    console.log(Object.keys(result).length);
                                    if(Object.keys(result).indexOf("USER") < 0)
                                    {
                                      console.log("no result");
                                      ls.data["USER"] = {"name": "user1"};
                                      ls.data["TASKLIST"] = [{"label" : "create to do list app"},{"label" : "add things to list"},{"label" : "?????????"},{"label" : "profit"},{"label" : "share propeller with your friends"}];
                                    }
                                    else
                                    {
                                      console.log("result found: " + result.USER.name);
                                      ls.data.USER = result.USER;
                                      ls.data.TASKLIST = result.TASKLIST;
                                    }
//                                    console.log("Local User: " + ls.data.USER.name);
//                                    console.log("TASK LIST: " + ls.data.TASKLIST);
                                    chrome.storage.local.set(ls.data);
                                  }
                          );
}

LocalStore.prototype.getData = function(key,callback)
{
  var ls = this;
  if(Object.keys(ls.data).indexOf(key) < 0)
  {
//    console.log("not found");
    chrome.storage.local.get(null,function(result)
                                  {
                                    if(Object.keys(result).indexOf(key) < 0)
                                    {
                                      console.log("no result");
                                    }
                                    else
                                    {
                                      console.log(result[key]);
                                      ls.data[key] = result[key];
                                      callback(ls.data[key]);
//                                      console.log(ls.data.hasOwnProperty(key));
//                                      console.log(ls.data[key]);
                                    }
                                  }
                             );
  }
  else
  {
    console.log(Object.keys(this.data).indexOf(key));
  }
}
