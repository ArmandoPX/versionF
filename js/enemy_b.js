import Bullet from "./bullet.js"

class EnemyB {


//con backupDirection guardo la dirección en la que quedó el jugador para agregarle esa dirección a la bala
    constructor(x, y, width, height, color, context) {
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.x = x;
        this.y = y;
        this.context = context;
        this.bullets = [];
        this.counter = 0;

        this.cameraMov = 0;

        this.shape = function () {
            this.context.fillStyle = color;
            var ranW = Math.floor((Math.random() * this.width) + 1);
            this.context.fillRect(this.x + ranW, this.y, this.width, this.height);


        };

        this.move = function () {
            this.x += this.cameraMov;


        };


    }

    draw() {
        this.move();

        if (this.counter > 1000) {
            this.shape();
        }


        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw();
            this.bullets[i].cameraMov = this.cameraMov;
            this.bullets[i].speedX = 4;
            if (this.bullets[i].x > width || this.bullets[i].x < 0) {
                this.bullets.splice(i, 1);
            }
        }
        this.counter += 1;
        if (this.counter > 2000) {
            this.fire();
            this.counter = 0;
            var ranW = Math.floor((Math.random() * width) + 1);
            var ranH = Math.floor((Math.random() * height) + 1);

            this.x = ranW;
            this.y = ranH;
        }


    }


    setVelocity(vel) {

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

export default EnemyB;