
// Global Constants
const CANVAS_ID = "gameCanvas";
const COLORS = ["red", "green", "blue", "yellow", "purple", "black", "brown", "orange"];

// Global Data
let didGameEnd = false;
let viewportWidth = document.documentElement.clientWidth;
let viewportHeight = document.documentElement.clientHeight;
let gameCanvas = document.getElementById(CANVAS_ID);
let canvasCtxt = gameCanvas.getContext("2d");
let intervalFunc;

function startPlaying() {
    // Starting the game
    game = new Game();
}

function initInterval(ballObj, intrvl) {
    intervalFunc = window.setInterval(function () { ballObj.fall(); }, intrvl);
    return intervalFunc;
}

async function dropBall(ball) {
    ball.startFalling();
}

class Game {
    constructor() {
        this.ballsArr = [];

        gameCanvas.width = window.innerWidth;
        gameCanvas.height = window.innerHeight;

        //canvasCtxt.globalCompositeOperation = "copy";

        this.startPlayingGame();
    }

    startPlayingGame() {
        let i = 0;

        // Main loop
        while (!this.didLevelEnd()) {
            for (i = 0; i < 10; i++) {
                if (this.ballsArr[i] === undefined ||
                    this.ballsArr[i] === null) {

                    this.ballsArr[i] = new Ball();
                    dropBall(this.ballsArr[i]);
                }
            }
        }
    }

    didLevelEnd() {
        // Temporary - allowing a single iteration
        let temp = didGameEnd; // the global variable didGameEnd starts with false
        didGameEnd = true; // Setting it to true

        return temp; // Returning the temp, not the global. First time is false, then second time will be true
    }
}

class Ball {
    constructor() {
        this._isAlive = true;
        this._radius = getRandomRadius();
        this._diameter = this._radius * 2;
        this._color = getRandomColor();

        this._posLeft = getRandomLeftPos(this._radius);
        this._posTop = getRandomTopPos();

        // Gravity Force should be between 1 and 20 pixels down:
        this._gravityForce = getRandomGravity();

        // Wait Time should be between 200 and 600 milliseconds long:
        this._fallTime = getRandomFallTime();

        this._fallFuncInterval;
    }

    amAlive() {
        if (this._posTop >= this.graveYardArea()) {
            this._isAlive = false;
        }

        return this._isAlive;
    }

    async startFalling() {
        //while (this.amAlive()) {
        // setInterval(fall, this.fallTime);

        //this.fallFuncInterval = setInterval(this.fall, this.fallTime);

        this._fallFuncInterval = initInterval(this, this._fallTime)
        //}
    }

    async stopFalling() {
        clearInterval(this._fallFuncInterval);
    }

    fall() {
        //console.log("fallFuncInterval = " + this.fallFuncInterval);

        this.eraseBall();

        this._posTop += this._gravityForce;

        this.drawBall();

        if (this._posTop >= viewportHeight) {
            this.eraseBall();
            this.stopFalling();
        }
    }

    drawBall() {
        //canvasCtxt.strokeStyle = "#000000";
        //canvasCtxt.lineWidth = 0;
        canvasCtxt.fillStyle = this._color;
        canvasCtxt.beginPath();
        canvasCtxt.arc(this._posLeft, this._posTop, this._radius, 0, 2 * Math.PI);
        //canvasCtxt.stroke();
        canvasCtxt.fill();
    }

    eraseBall() {
        //canvasCtxt.strokeStyle = "#FFFFFF";
        //canvasCtxt.lineWidth = 0;
        canvasCtxt.fillStyle = "#FFFFFF";
        canvasCtxt.beginPath();
        canvasCtxt.arc(this._posLeft, this._posTop, this._radius, 0, 2 * Math.PI);
        //canvasCtxt.stroke();
        canvasCtxt.fill();
    }

    graveYardArea() {
        let graveYardArea = viewportHeight + this._diameter;

        return graveYardArea;
    }

}

function getRandomRadius() {
    return ((Math.random() * 10) + 25);

}

function getRandomLeftPos(radius) {
    let newLeftPos = Math.random() * (viewportWidth - radius);

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

function getRandomTopPos() {
    let newTopPos = Math.random() * (0.25 * viewportHeight);

    return newTopPos;
}

function getRandomGravity() {
    let gravityForce = 0;

    // Gravity Force should be between 10 (exclusive) and 20 pixels down:
    while (gravityForce == 0) {
        gravityForce = 9 + (Math.random() * 10);
    }

    return gravityForce;
}

function getRandomFallTime() {
    let fallTime = 0;

    // Wait Time should be between 20 and 220 milliseconds long:
    while (fallTime == 0) {
        fallTime = (Math.random() * 200) + 20;
    }

    return fallTime;
}

function getRandomColor() {
    return COLORS[Math.random() * COLORS.length | 0];

}
