window.onload = function()
{
//  var pomodoro = new Timer(0.25);
//  var taskList = new Array();

//generate a dummy array of tasks
//  for(var i = 0; i < 5; i++)
//  {
//    taskList[i] = new Task();
//    taskList[i].setLabel("Item "+(i+1));
//  }

//if there are any tasks, create a list and display them
  var todoList = document.getElementById('tasklist');
  var ul = document.createElement("ul");

//  if(taskList.length > 0)
//  {
//    for(var i = 0; i < taskList.length; i++)
//    {
//      var li = document.createElement("li");
//      li.id = taskList[i].getLabel();
//      li.draggable = true;
//      li.appendChild(document.createTextNode(taskList[i].getLabel()));
//      ul.appendChild(li);
//    }
//  }
  
//I don't remember what this does
//  document.getElementById('activeItem').ondrop = function(){dragDrop(event,pomodoro);};
//  document.getElementById('activeItem').ondragenter = cancel;
//  document.getElementById('activeItem').ondragover = cancel; //function(){return dragOver(event);};  

//  makeDraggable();

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
  
  var Propeller = {};
  Propeller.db = null;

  Propeller.openDB = function()
  {
    console.log("Openning DB " + db_name);
    var request = indexedDB.open(db_name, db_version);
    request.onsuccess = function(event)
    {
      Propeller.db = this.result;
//      for(var i in tasks)
//      {
//        Propeller.addToDo(tasks[i],i);
//        Propeller.renderToDo(tasks[i]);
//      }
      //getAllToDoItems
      Propeller.getAllToDos();
    };
    request.onerror = function(event)
    {
      console.log("DB Error: " + event.value);
    };
    request.onupgradeneeded = function(event)
    {
      console.log("upgrade needed on DB " + db_name);
      var store = event.currentTarget.result.createObjectStore(db_store_name,{ keyPath: 'id', autoIncrement: true });
//      store.createIndex('label', {unique: false});
//      store.createIndex('timeStamp', {unique: false});
    }
  }
  Propeller.addToDo = function(label,id)
  {
    var db = Propeller.db;
    console.log(Propeller.db);
    var transaction = db.transaction(db_store_name,"readwrite");
    var store = transaction.objectStore(db_store_name);
    var request = store.put({"id" : id, "label" : label /** , "timeStamp" : new Date().getTime() **/});
    request.onsuccess = function(event)
    {
      //getAllToDoItems
      Propeller.getAllToDos();
    };
    request.onerror = function(event)
    {
      console.log("DB Error: " + event.value);
    };
  }
    
  Propeller.getAllToDos = function()
  {
    var db = Propeller.db;
    console.log(Propeller.db);
    var transaction = db.transaction(db_store_name,"readwrite");
    var store = transaction.objectStore(db_store_name);
      
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = store.openCursor(keyRange);
      
    cursorRequest.onsuccess = function(event)
    {
      var result = event.target.result;
      if(!!result == false)
//      {
//        console.log("No more results");
        return;
//      } 
      Propeller.renderToDo(result.value.label);
      result.continue();
    };
    cursorRequest.onerror = function(event)
    {
      console.log("Retrieving List Error: " + event.value.label);
    };
  }

  Propeller.renderToDo = function(row)
  {
    var li = document.createElement("li");
//    li.id = row.label;
//    li.draggable = true;
    li.appendChild(document.createTextNode(row.label));
    ul.appendChild(li);
  }

  Propeller.openDB();
//  for(var i in tasks)
//  {
//    Propeller.addToDo(tasks[i]);
//    Propeller.renderToDo(tasks[i]);
//  }
  todoList.appendChild(ul);
}

//Everything below here needs to be cleaned up
function cancel(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

function dragStart(ev)
{
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData('Text',ev.target.id);
  console.log(ev.target.id);
  return true;
}

function dragDrop(ev,aTimer)
{
  var data = ev.dataTransfer.getData('Text');
  ev.target.innerHTML = "";
  ev.target.innerHTML = "<span draggable=\"true\">"+data+"</span>";
  console.log(document.getElementById(data));
  document.getElementById(data).style.display = "none";
  aTimer.setFace(document.getElementById('timer'));
  aTimer.stop();
  aTimer.setDuration(0.25);
  aTimer.face.onclick = function(){aTimer.togglePause();};
  aTimer.countDown();
  ev.stopPropagation();
  return false;
}

function makeDraggable()
{
  var element = document.getElementsByTagName('li');
  for(var i = 0; i < element.length; i++)
  {
    element[i].ondragstart = function(){dragStart(event);};
  }
}
