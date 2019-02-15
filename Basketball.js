
// Global Constants
const CANVAS_ID = "gameCanvas";

// Global Data
let didGameEnd = false;
let viewportWidth = document.documentElement.clientWidth;
let viewportHeight = document.documentElement.clientHeight;
let gameCanvas = document.getElementById(CANVAS_ID);
let canvasCtxt = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

//canvasCtxt.globalCompositeOperation = "copy";

function Game()
{
	// Main loop
	// while (!didLevelEnd) {
	for (i = 0; i < 10; i++) {
		new Ball().startFalling();
	}
	// while (didLevelEnd() != true)
	// {
		
	// }
}

function Ball() {
    this.isAlive = true;
    this.radius = (Math.random() * 10) + 25;
    this.posLeft = /* this.radius + */ (Math.random() * (viewportWidth - this.radius));
    this.posTop = /* this.radius + */ (Math.random() * (0.25 * viewportHeight));

    // Gravity Force should be between 1 and 20 pixels down:
    this.gravityForce = 1 + (Math.random() * 20);

    // Wait Time should be between 200 and 600 milliseconds long:
    this.fallTime = (Math.random() * 400) + 200;

    this.diameter = this.radius * 2;
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

Ball.prototype.isAlive = function () {
    if (this.posTop >= this.graveYardArea()) {
        this.isAlive = false;
    }

    return this.isAlive;
}

Ball.prototype.startFalling = function () {
    while (this.isAlive()) {
        setInterval(this.fall, this.fallTime);
    }
}

Ball.prototype.fall = function () {
	
    this.eraseBall(this.posLeft, this.posTop, this.radius);
	
    this.posTop += this.gravityForce;

    this.drawBall(this.posLeft, this.posTop, this.radius);
}

Ball.prototype.graveYardArea = function () {
    let graveYardArea = viewportHeight + this.diameter;

    return graveYardArea;
}

function didLevelEnd() {
    // Temporary - allowing a single iteration
    let temp = didGameEnd;
    didGameEnd = true;
    return temp;
}

Ball.prototype.drawBall = function (xPos, yPos, radius) {
	canvasCtxt.strokeStyle = "FF0000";
	canvasCtxt.beginPath();
	canvasCtxt.arc(xPos, yPos, radius, 0, 2 * Math.PI);
    canvasCtxt.stroke();
}

Ball.prototype.eraseBall = function (xPos, yPos, radius) {
	canvasCtxt.strokeStyle = "FFFFFF";
	canvasCtxt.beginPath();
	canvasCtxt.arc(xPos, yPos, radius, 0, 2 * Math.PI);
    canvasCtxt.stroke;
}

// Starting the game
Game();
