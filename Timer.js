function Timer() {
  this.duration = 0
  this.timeLeft = this.duration * 60 * 1000
  this.timerEnd = 0

  this.running = false
  this.timerID = 0
}
