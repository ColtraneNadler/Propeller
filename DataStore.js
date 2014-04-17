function DataStore(newName)
{
  this.db = null;
  this.name = newName;
  this.version = 1;
  this.stores = Array();
}

DataStore.prototype.addStore = function(newStoreName)
{
  this.stores.push(newStoreName);
  this.version++;
}

DataStore.prototype.open = function(newStoreName)
{
  if(this.stores.indexOf(newStoreName) == -1)
  {
    this.addStore(newStoreName);
  }
  var dataStore = this;
  var request = indexedDB.open(this.name, this.version);
  request.onupgradeneeded = function(event)
  {
    console.log("UPGRADE NEEDED ON DATASTORE " + dataStore.name);
    if(!event.currentTarget.result.objectStoreNames.contains(newStoreName))
    {
      var store = event.currentTarget.result.createObjectStore(newStoreName,{ keyPath: 'id', autoIncrement: true });
    }
  }
  request.onsuccess = function(event)
  {
    console.log("SUCCESS!");
    console.log(this);
    dataStore.db = event.target.result;
    console.log(dataStore.db);
    dataStore.getData(newStoreName);
  }
  request.onerror = function(event)
  {
    console.log("dataStore "+dataStore.name+" error: " + event.value);
  }
}

DataStore.prototype.getData = function(newStoreName)
{
  console.log(this.db);
  var transaction = this.db.transaction(newStoreName,"readwrite");
  var store = transaction.objectStore(newStoreName);
  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(keyRange);
  cursorRequest.onsuccess = function(event)
  {
    var result = event.target.result;
    if(!!result == false)
        return;
      result.continue();
  }
  cursorRequest.onerror = function(event)
  {
    console.log("LIST RETRIEVAL ERROR: " + event.value.label);
  }
}
