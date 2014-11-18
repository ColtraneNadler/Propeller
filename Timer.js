function Timer() {
  this.duration = ""
  this.timeLeft = duration * 60 * 1000
  this.timerEnd = 0

  this.running = false
  this.timerID = 0

  function tick() {
    timeLeft = timerEnd - (new Date().getTime())
    if(timeLeft > 0) {
      //tell the time left
    } else {
      stop()
    }
  }

  function stop() {
    clearInterval(timerID)
    timeLeft = 0
    isRunning = false
  }

  return {
    countDown: function() {
      if(!running) {
        running = true
        timerEnd = new Date().getTime() + timeLeft
      }
    }
  }
}
