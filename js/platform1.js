class Platform {
    constructor(x, y, width, height, context, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.cameraMov = 0;
        this.color = color;
        this.isDestructible = false;
        this.isMoving = false;
        this.isDestroyed = false;
    }

    draw() {
        this.x += this.cameraMov;
        this.drawPlatform();
    }

    drawPlatform() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = "rgb(23, 199, 28)";
        context.fillRect(this.x, this.y, this.width, 10);
    }

    movePlatform(distance) {
        if (this.isMoving) {
            this.x += distance;
        }
    }

    destroyPlatform() {
        if (this.isDestructible) {
            this.isDestroyed = true;
        }
    }

    isDestroyed() {
        return this.isDestroyed;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

export default Platform;
