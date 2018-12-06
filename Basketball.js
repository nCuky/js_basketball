
// Global Constants
const CANVAS_ID = "gameCanvas",
	  


// Global Data
let didGameEnd = false,
    viewportWidth = document.documentElement.clientWidth,
    viewportHeight = document.documentElement.clientHeight,
    gameCanvas = document.getElementById(CANVAS_ID),
    canvasCtxt = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

function Game()
{
	while !(didLevelEnd)
	{
		
	}
}

function Ball() {
    this.isAlive = true;
    this.radius = (Math.random() * 10) + 25;
    this.posLeft = /* this.radius + */ (Math.random() * (viewportWidth - this.radius));
    this.posTop = /* this.radius + */ (Math.random() * (0.25 * viewportHeight));

    // Gravity Force should be between 1 and 20 pixels down:
    this.gravityForce = gravityForce = 1 + (Math.random() * 20);

    // Wait Time should be between 200 and 600 milliseconds long:
    this.fallTime = (Math.random() * 400) + 200;

    let diameter = this.radius * 2;
}

Ball.prototype.getRandomRadius = function () {
    return ((Math.random() * 10) + 25);

}
Ball.prototype.getRandomLeftPos = function () {
    let newLeftPos = /* this.radius + */ (Math.random() * (viewportWidth - this.radius));

    // if (viewportWidth - newLeftPos < btnBoundingWidth) {
    //     newLeftPos = viewportWidth - btnBoundingWidth;
    // }

    // if (viewportHeight - newTopPos < btnBoundingHeight) {
    //     newTopPos = viewportHeight - btnBoundingHeight;
    // }

    // btnItself.style.left = (newLeftPos.toFixed(0) + "px");
    // btnItself.style.top = (newTopPos.toFixed(0) + "px");

    return newLeftPos;
}

Ball.prototype.getRandomTopPos = function () {
    let newTopPos = /* this.radius + */ (Math.random() * (0.25 * viewportHeight));

    return newTopPos;
}

Ball.prototype.getRandomGravity = function () {
    let gravityForce = 0;

    // Gravity Force should be between 0 (exclusive) and 20 pixels down:
    while (gravityForce == 0) {
        gravityForce = (Math.random() * 20);
    }

    return gravityForce;
}

Ball.prototype.getRandomFallTime = function () {
    let fallTime = 0;

    // Wait Time should be between 200 and 600 milliseconds long:
    while (fallTime == 0) {
        fallTime = (Math.random() * 400) + 200;
    }

    return fallTime;
}

Ball.prototype.startFalling = function () {
    while (this.isAlive()) {
        setInterval(this.fall, this.fallTime);
    }
}

Ball.prototype.fall = function () {
    this.posTop += this.gravityForce;

    canvasCtxt.arc(this.posLeft, this.posTop, this.radius, 0, 2 * Math.PI);
    canvasCtxt.stroke();
}

Ball.prototype.isAlive = function () {
    if (this.posTop >= this.graveYardArea()) {
        this.isAlive = false;
    }

    return this.isAlive;
}

Ball.prototype.graveYardArea = function () {
    let graveYardArea = viewportHeight + this.diameter();

    return graveYardArea;
}


function didLevelEnd() {
    // Temporary - allowing a single iteration
    let temp = didGameEnd;
    didGameEnd = true;
    return temp;
}

// Main loop
// while (!didLevelEnd) {
for (i = 0; i < 10; i++) {
    new Ball().startFalling();
}
