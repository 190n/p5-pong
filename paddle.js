let paddleWidth = 8,
    paddleHeight = 64;

class Paddle {

    // forPlayer = true: paddle controlled by keyboard
    // forPlayer = false: paddle controlled by computer
    constructor(forPlayer) {
        this.forPlayer = forPlayer;

        // human on left, AI on right
        if (forPlayer) {
            this.x = 40;
        } else {
            this.x = 860;
        }

        // start at middle of screen
        this.y = 300;

        this.score = 0;
    }

    tick() {
        if (this.forPlayer) {
            // keyboard input
            if (keyIsDown(UP_ARROW)) {
                this.y -= 5;
            }
            if (keyIsDown(DOWN_ARROW)) {
                this.y += 5;
            }
        } else if (ball.dx > 0) { // AI only moves if ball is moving towards it
            // move in direction of ball
            // but only if paddle is more than a certain distance from ball's y coordinate
            // that distance is much smaller when the ball is close to the paddle
            // when the ball is far from the paddle, it is much greater than even the paddle's height
            // this allows the AI to miss

            let tolerance;
            if (ball.x > 700) tolerance = 5;
            else tolerance = 100;

            fill('rgba(255, 0, 0, 0.3)');
            rect(0, this.y - tolerance, 900, tolerance * 2);


            if (abs(this.y - ball.y) > tolerance) {
                if (this.y < ball.y) this.y += 5;
                else if (this.y > ball.y) this.y -= 5;
            }
        }

        // stay on screen
        if (this.y < paddleHeight / 2) {
            this.y = paddleHeight / 2;
        } else if (this.y > 600 - paddleHeight / 2) {
            this.y = 600 - paddleHeight / 2;
        }
    }

    draw() {
        fill(255);
        // rectangle centered at (x, y)
        rect(this.x - paddleWidth / 2, this.y - paddleHeight / 2, paddleWidth, paddleHeight);

        // draw score
        textFont('monospace');
        textSize(40);
        textAlign(CENTER, CENTER);
        if (this.forPlayer) {
            text(this.score, 200, 50);
        } else {
            text(this.score, 700, 50);
        }
    }
}
