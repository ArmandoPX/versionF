import Bullet from "./bullet.js"

class Enemy {


//con backupDirection guardo la dirección en la que quedó el jugador para agregarle esa dirección a la bala
    constructor(x, y, width, height, color, context, start, end) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.x = x;
        this.y = y;
        this.context = context;
        this.bullets = [];
        this.counter = 0;
        this.setVelocity(1.5);
        this.cameraMov = 0;
        this.shape = function () {
            this.context.fillStyle = color;
            this.context.fillRect(this.x, this.y, this.width, this.height);
            for (var i = 0; i <= 5; i++) {
                var ran = Math.floor((Math.random() * 15) + 1);
                this.context.fillRect(this.x - (ran / 2), this.y + (6 * i), this.width + ran, 1);
            }

        };

        this.move = function () {
            this.x += this.speedX + this.cameraMov;
            start = start + this.cameraMov;
            end = end + this.cameraMov;
            if (this.x < start) {
                this.setVelocity(1.5);
            }

            if (this.x > end - (this.width)) {
                this.setVelocity(-1.5);
            }
        };


    }

    draw() {
        this.move();
        this.shape();
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw();
            this.bullets[i].cameraMov = this.cameraMov;
            this.bullets[i].speedX = 4;
            if (this.bullets[i].x > width || this.bullets[i].x < 0) {
                this.bullets.splice(i, 1);
            }
        }
        this.counter += 1;
        if (this.counter > 400) {
            this.fire();
            this.counter = 0;
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


    fire() {
        this.bullets.push(new Bullet(this.x, this.y + (this.height / 2), 10, 10, "red", 1, this.context))
        this.bullets.push(new Bullet(this.x, this.y + (this.height / 2), 10, 10, "red", -1, this.context))

    }


}

export default Enemy;