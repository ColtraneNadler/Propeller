window.onload = function()
{
  var todoList = document.getElementById('tasklist');
  var ul = document.createElement("ul");
  
//implement indexedDB file storage
  var tasks = [
    {label: "create to do list app"},
    {label: "add things to list"},
    {label: "?????????"},
    {label: "profit"}
    ];
  
  var db_name = "storedTasks";
  var db_version = 1;
  var db_store_name = "allTasks";
  
  var db;

  function openDB()
  {
    console.log("Openning DB " + db_name);
    var request = indexedDB.open(db_name, db_version);
    request.onsuccess = function(event)
    {
      db = this.result;
      //getAllToDoItems
    };
    request.onerror = function(event)
    {
      console.log("DB Error: " + event.value);
    };
    request.onupgradeneeded = function(event)
    {
      console.log("upgrade needed on DB " + db_name);
      var store = event.currentTarget.result.createObjectStore(db_store_name, {keyPath: 'id', autoincrement: true});
    }
  }
  
  function addToDo(label)
  {
    var transaction = db.transaction(db_store_name,"readwrite");
    var store = transaction.objectStore(db_store_name);
    var request = store.put({"label" : label,"timeStamp" : new Date().getTime()});
    request.onsuccess = function(event)
    {
      //getAllToDoItems
    };
    request.onerror = function(event)
    {
      console.log("DB Error: " + event.value);
    };
  }
    
  function getAllToDos()
  {
    var trans = db.transaction(db_store_name,"readwrite");
    var store = transaction.objectStore(db_store_name);
      
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = store.openCursor(keyRange);
      
    cursorRequest.onsuccess = function(event)
    {
      var result = event.target.result;
      if(!!result == false)
        return;
        
      renderToDo(result.value);
      result.continue();
    };
    cursorRequest.onerror = function(event)
    {
      console.log("Retrieving List Error: " + event.value);
    };
  }

  function renderToDo(row)
  {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(row.label));
    ul.appendChild(li);
  }

  openDB();
  for(var i in tasks)
  {
    renderToDo(tasks[i]);
  }
  todoList.appendChild(ul);
}
