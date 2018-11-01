let ballSize = 8;

class Ball {
    constructor() {
        this.resetPosition();
    }

    resetPosition() {
        // start in middle of screen
        // randomly choose which direction to go in
        this.x = 450;
        this.y = 300;
        // dx is either -4 or 4
        // dy is anything between -5 and 5
        this.dx = random([-6, 6]);
        this.dy = random(-6, 6);
    }

    tick() {
        this.x += this.dx;
        this.y += this.dy;

        // bounce off floor and ceiling
        if (this.y < ballSize / 2) {
            this.y = ballSize / 2;
            this.dy = -this.dy;
        } else if (this.y > 600 - ballSize / 2) {
            this.y = 600 - ballSize / 2;
            this.dy = -this.dy;
        }

        // bounce off paddles
        let xOffset = paddleWidth / 2 + ballSize / 2,
            yOffset = paddleHeight / 2 + ballSize / 2;

        for (let paddle of [playerPaddle, aiPaddle]) {
            if (this.x > paddle.x - xOffset && this.x < paddle.x + xOffset && this.y > paddle.y - yOffset && this.y < paddle.y + yOffset) {
                this.bounceOffPaddle(paddle);
            }
        }

        // check if we've gone off screen
        if (this.x < ballSize / 2 - 100) {
            awardPoint(aiPaddle);
        } else if (this.x > 1000 + ballSize / 2) {
            awardPoint(playerPaddle);
        }
    }

    draw() {
        fill(255);
        rect(this.x - ballSize / 2, this.y - ballSize / 2, ballSize, ballSize);
    }

    bounceOffPaddle(which) {
        // reverse direction and randomly choose new y velocity
        this.dx = -this.dx;
        this.dy = random(-6, 6);

        // move position to be outside paddle so we don't hit it again on the next frame
        if (which == playerPaddle) {
            // bounced off player paddle
            this.x = which.x + paddleWidth / 2 + ballSize / 2;
        } else {
            // bounced off AI paddle
            this.x = which.x - paddleWidth / 2 - ballSize / 2;
        }
    }
}
