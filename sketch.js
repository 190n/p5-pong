let gameObjects = [],
    playerPaddle,
    aiPaddle,
    ball,
    sfxBounce;

function preload() {
    sfxBounce = loadSound('bounce.wav');
}

function setup() {
    playerPaddle = new Paddle(true);
    aiPaddle = new Paddle(false);
    ball = new Ball();
    gameObjects = [playerPaddle, aiPaddle, ball];
    createCanvas(900, 600);
}

function draw() {
    background(0);
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw();
        gameObjects[i].tick();
    }
}

function awardPoint(which) {
    which.score++;
    ball.resetPosition();
}
