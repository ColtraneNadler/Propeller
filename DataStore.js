function DataStore(name)
{
  this.name = name;
  this.version = null;
  this.objectStore = Array();

  this.results = Array();
}

DataStore.prototype.setName = function(name)
{
  this.name = name;
}

DataStore.prototype.getName = function(name)
{
  return this.name;
}

DataStore.prototype.setVersion = function(version)
{
  this.version = version;
}

DataStore.prototype.getVersion = function()
{
  return this.version;
}

DataStore.prototype.addObjectStore = function(objectStore)
{
  this.objectStore.push(objectStore);
}

DataStore.prototype.removeObjectStore = function(objectStore)
{
  this.objectStore.splice(objectStore,1);
}

DataStore.prototype.getObjectStore = function()
{
  return this.objectStore;
}
//INDEXEDDB FUNCTIONALITY
DataStore.prototype.open = function()
{
  var dataStore = this;
  if(!this.version)
  {
    this.version = 1;
  }
  var request = indexedDB.open(this.name, this.version);
  request.onerror = function(event)
  {
    //things that went wrong are processed here
  }
  request.onupgradeneeded = function(event)
  {
    dataStore.removeTables(event.target.result);
    dataStore.newEntries = dataStore.addTables(event.target.result);
  }
  request.onsuccess = function(event)
  {
    //most queries processed here
    //does this need to be extracted into a function?
    if(dataStore.newEntries)
    {
      for(i in dataStore.newEntries)
      {
        dataStore.addEntry(event.target.result,dataStore.newEntries[i].objectStore,dataStore.newEntries[i].defaults);
      }
      dataStore.newEntries = null;
    }
    for(i in dataStore.objectStore)
    {
      dataStore.retrieveEntry(event.target.result,dataStore.objectStore[i].getName());
    }
  }
}

DataStore.prototype.addTables = function(db)
{
//  console.log(this + " is adding tables to " + db);
  for(i in this.objectStore)
  {
    if(!db.objectStoreNames.contains(this.objectStore[i]))
    {
      console.log("Creating object store " + this.objectStore[i].getName());
      var store = db.createObjectStore(this.objectStore[i].getName(),{ "autoIncrement" : true });
      if(this.objectStore[i].getDefaultEntry().length > 0)
      {
        var defaultEntries = Array();
        defaultEntries.push({"objectStore" : this.objectStore[i].getName(),"defaults" : this.objectStore[i].getDefaultEntry()});
      }
    }
  }
  return defaultEntries;
}

DataStore.prototype.removeTables = function(db)
{
//  console.log(this + " is removing tables from " + db);
  for(var i = 0; i < db.objectStoreNames.length; i++)
  {
    if(this.objectStore.indexOf(db.objectStoreNames.item(i)) == -1)
    {
      console.log("DELETING OBJECT STORE " + db.objectStoreNames.item(i));
      db.deleteObjectStore(db.objectStoreNames.item(i));
    }
  }
}

DataStore.prototype.addEntry = function(db,objectStore,entry)
{
  var transaction = db.transaction(objectStore,"readwrite");
  var store = transaction.objectStore(objectStore);

  if(Array.isArray(entry))
  {
    for(i in entry)
    {
//      var request = store.add(JSON.stringify(entry[i]));
      var request = store.add(entry[i]);
    }
  }
  else
  {
//    var request = store.add(JSON.stringify(entry));    
    var request = store.add(entry);
  }
}

DataStore.prototype.retrieveEntry = function(db,objectStore,entry)
{
  var dataStore = this;
  
  var transaction = db.transaction(objectStore,"readonly");
  var store = transaction.objectStore(objectStore);
  var cursor = store.openCursor();
  cursor.onsuccess = function(event)
  {
    var result = event.target.result;
    if(result)
    {
      dataStore.results.push(result.value);
      result.continue();
    }
  }
}
