class Platform {


    constructor(x, y, width, height, context) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.cameraMov = 0;


        this.shape = function () {
            context.fillStyle = "rgb(198, 152, 92)";
            context.fillRect(this.x, this.y, this.width, this.height);
            context.fillStyle = "rgb(23, 199, 28)";
            context.fillRect(this.x, this.y, this.width, 10);
        }


    }

    draw() {
        this.x += this.cameraMov;
        this.shape();
    }


    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }


}

export default Platform;