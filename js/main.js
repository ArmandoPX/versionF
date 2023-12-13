
var width = window.innerWidth;
var height= window.innerHeight;
function startGame() {
    GAME.start();
    import  ("./world.js")
}


const SETTINGS = {
    width:3980,
    height:height,
}

const GAME = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = SETTINGS.width;
        this.canvas.height = SETTINGS.height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    updateHeight: function (height) {
        this.canvas.height = height;

    },
    finish:function () {
      this.canvas.style.opacity="0"
        document.getElementById("newGame").style.visibility="visible";
    }
    
    
    
}



window.onresize = function(event) {
GAME.updateHeight(window.outerHeight)
};
