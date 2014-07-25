function Tag() {
  this.id = ""
  this.label = ""
  this.active = ""
}

function Task() {
  this.id = Math.random().toString(36).substr(2, 5);
  this.label = ""
  this.active = ""
  this.complete = ""

  this.creationTime = new Date().getTime()
  this.completeTime = null;

  this.tags = []
}
