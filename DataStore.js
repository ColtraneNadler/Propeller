function DataStore(name)
{
  this.db = {};
  this.name = name;
  this.version = null;
  this.objectStores = Array();
  console.log("DataStore " + name + " version " + this.version + " created");
  this.defaultValues = Array();
}

DataStore.prototype.setDefaults = function(defaultValues)
{
    this.defaultValues = defaultValues;
}

DataStore.prototype.open = function(callback,parameters)
{
  console.log("Opening DataStore " + this.name);
  if(!this.version)
  {
    this.version = 1;
  }
  var dataStore = this;
  var request = indexedDB.open(this.name, this.version);
  request.onsuccess = function(event)
  {
    console.log("DataStore " + dataStore.name + " version " + dataStore.version + " successfully opened.");
    dataStore.db = event.target.result;
    if(callback)
    {
      parameters.db = dataStore.db;
      callback(parameters);
    }
  }
  request.onerror = function(event)
  {
    console.log("ERROR OPENING DATASTORE " + dataStore.name + " version " + dataStore.version + ": " + event.value);
  }
  request.onupgradeneeded = function(event)
  {
    console.log("UPGRADE NEEDED ON DATASTORE " + dataStore.name);
    for(var i = 0; i < event.target.result.objectStoreNames.length; i++)
    {
      if(dataStore.objectStores.indexOf(event.target.result.objectStoreNames.item(i)) == -1)
      {
        console.log("DELETING OBJECT STORE " + event.target.result.objectStoreNames.item(i));
        event.target.result.deleteObjectStore(event.target.result.objectStoreNames.item(i));
      }
    }
    for(i in dataStore.objectStores)
    {
      if(!event.currentTarget.result.objectStoreNames.contains(dataStore.objectStores[i]))
      {
        console.log("Creating object store " + dataStore.objectStores[i]);
        var store = event.currentTarget.result.createObjectStore(dataStore.objectStores[i],{ "autoIncrement" : true });
      }
    }
  }
}

DataStore.prototype.createObjectStore = function(objectStore)
{
  if(Array.isArray(objectStore))
  {
    for(i in objectStore)
    {
       this.objectStores.push(objectStore[i]);
    }
  }
  else
  {
    this.objectStores.push(objectStore);
  }
  this.bumpVersion();
}

DataStore.prototype.deleteObjectStore = function(objectStore)
{
  if(Array.isArray(objectStore))
  {
    for(i in objectStore)
    {
      if(this.objectStores.indexOf(objectStore[i]) > -1)
      {
        this.objectStores.splice(objectStore[i], 1);
      }
    }
  }
  else
  {
    if(this.objectStores.indexOf(objectStore) > -1)
    {
      this.objectStores.splice(objectStore, 1);
    }
  }
  this.bumpVersion();
}

DataStore.prototype.createObject = function(object,objectStore)
{
  var dataStore = this;
  if(Array.isArray(object))
  {
    for(i in object)
    {
      object[i].timeStamp = new Date().getTime();
    }
  }
  else
  {
    object.timeStamp = new Date().getTime();
  }
  var parameters = {"objectStore" : objectStore,"object" : object};
  this.open(dataStore.addObject,parameters);
}

DataStore.prototype.addObject = function(parameters)
{
  if(parameters.hasOwnProperty("objectStore"))
  {
    console.log("Adding Objects to " + parameters.objectStore + " object Store.");
    var transaction = parameters.db.transaction(parameters.objectStore,"readwrite");
    var store = transaction.objectStore(parameters.objectStore);
    if(Array.isArray(parameters.object))
    {
      for(i in parameters.object)
      {
        var request = store.put(JSON.stringify(parameters.object[i]));    
      }
    }
    else
    {
      var request = store.put(JSON.stringify(parameters.object));
    }
  }
}

DataStore.prototype.dumpObjectStore = function(objectStore)
{
  var dataStore = this;
  var parameters = { "objectStore" : objectStore };
  this.open(dataStore.retrieveObject,parameters);
}

DataStore.prototype.retrieveObject = function(parameters)
{
  if(parameters.hasOwnProperty("objectStore"))
  {
    var dataStore = parameters.db;
    var transaction = parameters.db.transaction(parameters.objectStore,"readwrite");
    var store = transaction.objectStore(parameters.objectStore);
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = store.openCursor(keyRange);
    cursorRequest.onsuccess = function(event)
    {
      return event.target.result;
    }
    cursorRequest.onerror = function(event)
    {
      console.log("LIST RETRIEVAL ERROR: " + event.value.label);
    }
  }
}

DataStore.prototype.delete = function()
{
  console.log("DELETING DATASTORE " + this.name);
  indexedDB.deleteDatabase(this.name);
  console.log("DATASTORE " + this.name + " DELETED.");
}

DataStore.prototype.bumpVersion = function(version)
{
  if(this.version && version)
    this.version = version;
  else if(this.version)
    this.version++;
}
