window.onload = function() {
  //register different blocks
  var doTask = document.getElementById("doTask");
  var viewTaskList = document.getElementById("viewTaskList");
  var createTask = document.getElementById("createTask");
  var createTag = document.getElementById("createTag");
  var editTask = document.getElementById("editTask");
  var dumpData = document.getElementById("dumpData");
  var tagsMenu = document.getElementById("tagsMenu");

  var showCreateTask = document.getElementById("showCreateTask");
  var showMenu = document.getElementById("showMenu");
  var showImport = document.getElementById("showImport");
  
  //set the default block views
  doTask.style.display = "none";
  viewTaskList.style.display = "none";
  createTask.style.display = "none";
  createTag.style.display = "none";
  editTask.style.display = "none";
  dumpData.style.display = "none";
  tagsMenu.style.display = "none";

  var propeller = new App();
  propeller.registerView(createTask);
  propeller.registerView(tagsMenu);
  propeller.registerView(dumpData);
  
  //assign default event listeners
  showCreateTask.addEventListener("click",function(event) { propeller.toggleView(createTask); });
  showMenu.addEventListener("click",function(event) { propeller.toggleView(tagsMenu); });
  showImport.addEventListener("click",function(event) { propeller.toggleView(dumpData); });
}

//this function will not prevent multiple things from being visible
function toggleElementView(element) {
  if(element.style.display == "none")
    element.style.display = "inline-block";
  else
    element.style.display = "none";
}

function App() {
  this.views = []
}

App.prototype.registerView = function(view) {
  this.views.push(view);
}

App.prototype.toggleView = function(view) {
  console.log(view);
  console.log(this.views.length);
  var match = false;
  for(var i = 0; i < this.views.length && !match; i++) {
    if(this.views[i] == view) {
      this.views[i].style.display = "inline-block";
    } else {
      this.views[i].style.display = "none";
    }
    console.log(match);
  }
}
