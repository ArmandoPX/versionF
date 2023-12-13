import Bullet from "./bullet.js"

class Jugador {


//con backupDirection guardo la dirección en la que quedó el jugador para agregarle esa dirección a la bala
    constructor(x, y, width, height, color, context) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.x = x;
        this.y = y;
        this.gravity = 0.05;
        this.gravitySpeed = 0;
        this.isJumping = false;
        this.context = context;
        this.bullets = [];
        this.backupDirection = 1;
        this.isFalling = true;
        this.cameraMov = 0;
        this.color = color;
        this.shape = function () {
            this.context.fillStyle = this.color;

            this.context.fillRect(this.x, this.y, this.width, this.height);
        }

        this.move = function () {

            this.x += this.speedX + this.cameraMov;


        }


        this.jump = function () {
            if (this.isJumping) {
                this.gravitySpeed -= this.gravity;
                this.y -= this.gravitySpeed;
            }


            if (this.isFalling && this.gravitySpeed <= 0) {
                this.isJumping = false;
                this.gravitySpeed -= this.gravity;
                this.y -= this.gravitySpeed;
            }

            if (this.isJumping == false && this.isFalling == false) {
                this.gravitySpeed = 0;
            }


        }

    }

    draw() {
        this.move();
        this.jump();
        this.shape();
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw();
            this.bullets[i].fall();
            this.bullets[i].cameraMov = this.cameraMov;
            if (this.bullets[i].x > width || this.bullets[i].x < 0) {
                this.bullets.splice(i, 1);
            }
        }


    }


    setVelocity(vel) {
        this.speedX = vel;
        if (vel > 0) {
            this.backupDirection = 1;
        }
        if (vel < 0) {
            this.backupDirection = -1;
        }
    }

    setGravityJump(jump) {
        if (this.isJumping == false && this.isFalling == false) {
            this.isJumping = true;
            this.gravitySpeed = jump;
        }
    }

    fire() {
        this.bullets.push(new Bullet(this.x, this.y, 10, 10, "red", this.backupDirection, this.context))
    }


}

export default Jugador;