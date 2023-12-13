import Jugador from "./jugador.js";
import Platform from "./platform.js";
import Enemy from "./enemy.js";
import PlatformFire from "./platform_fire.js";
import EnemyB from "./enemy_b.js";

var jugador = Jugador;
var platforms = [];
var enemies = [];
var boss = Jugador;
var bossVelocity = 0.7;
var cameraMov = 0;
var posCameraX=0;
var penance = 0;
var platformFire = PlatformFire;
var enemyB = EnemyB;
initWorld();

function initWorld() {
    var bottomPos = height;
    platforms.push(new Platform(0, bottomPos - 100, 400, 100, GAME.context));
    platforms.push(new Platform(335, bottomPos - 186, 100, 50, GAME.context));
    platforms.push(new Platform(512, bottomPos - 256, 100, 50, GAME.context));
    platforms.push(new Platform(350, bottomPos - 356, 100, 50, GAME.context));
    platforms.push(new Platform(212, bottomPos - 456, 100, 50, GAME.context));
    platforms.push(new Platform(350, bottomPos - 556, 800, 50, GAME.context));
    platforms.push(new Platform(1150, bottomPos - 100, 1200, 100, GAME.context));

    platforms.push(new Platform(1000, bottomPos - 190, 100, 50, GAME.context));
    platforms.push(new Platform(1150, bottomPos - 290, 100, 50, GAME.context));
    platforms.push(new Platform(1350, bottomPos - 256, 200, 50, GAME.context));
    platforms.push(new Platform(1650, bottomPos - 256, 100, 50, GAME.context));
    platforms.push(new Platform(1890, bottomPos - 256, 300, 50, GAME.context));
    platforms.push(new Platform(2480, bottomPos - 100, 1500, 100, GAME.context));

    platformFire = new PlatformFire(1800, bottomPos - 100, 500, 10, "black", GAME.context);
    enemies.push(new Enemy(350, bottomPos - 556 - 30, 30, 30, "red", GAME.context, 350, 350 + 800));
    enemies.push(new Enemy(1890, bottomPos - 256 - 30, 30, 30, "red", GAME.context, 1890, 1890 + 300));
    enemies.push(new Enemy(2480, bottomPos - 100 - 30, 30, 30, "red", GAME.context, 2480, 2480 + 1500));


    boss = new Jugador(30, 30, 30, 30, "black", GAME.context);
    boss.setVelocity(bossVelocity);
    jugador = new Jugador(30, 30, 30, 30, "rgb(246, 255, 100)", GAME.context);
    enemyB = new EnemyB(jugador.y, 1400, 30, 15, "red", GAME.context);

    setInterval(draw, 1);
}


function draw() {
    GAME.clear();
    generalBehaviors();
    bossBehaviors();
    cameraMovenment();
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
        platforms[i].cameraMov = cameraMov;
    }
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        enemies[i].cameraMov = cameraMov;
    }
    boss.draw();
    jugador.draw();
    platformFire.draw();
    // enemyB.draw();


}


function cameraMovenment() {
    posCameraX += cameraMov;

        if (jugador.x > width - width / 2) {
            cameraMov = -1;
        }
        if (jugador.x <= width - width / 2 && jugador.x >= 20) {
            cameraMov = 0;
        }
        if (jugador.x < width -( (width / 2)+width / 4)&&posCameraX<=0) {
            cameraMov = 1;
        }

        jugador.cameraMov = cameraMov;
        boss.cameraMov = cameraMov;
        platformFire.cameraMov = cameraMov;


}

function bossBehaviors() {
    for (var i = 0; i < platforms.length; i++) {
        if (boss.y + boss.height > platforms[i].y && boss.y + boss.height < platforms[i].y + 10 && boss.x + boss.width > platforms[i].x && boss.x < platforms[i].x + platforms[i].width) {
            boss.isFalling = false;
            break;
        } else {
            boss.isFalling = true;
        }
    }


    if (boss.isJumping) {
        boss.setVelocity(bossVelocity * 1.8);
    } else {
        boss.setVelocity(bossVelocity);
    }

    if (boss.x > platforms[1].x-30 && boss.x < platforms[1].x + 30 && boss.y + boss.height >= platforms[0].y && boss.y + boss.height < platforms[0].y + 10) {

        boss.setGravityJump(3.3);
    }


    if (boss.x > platforms[1].x + 30 && boss.x < platforms[1].x + platforms[1].width && boss.y + boss.height >= platforms[1].y && boss.y + boss.height < platforms[1].y + 10) {
        boss.setGravityJump(3.3);
    }

    if (boss.x > platforms[2].x + 10 && boss.x < platforms[2].x + platforms[2].width - 30 && boss.y + boss.height >= platforms[2].y && boss.y + boss.height < platforms[2].y + 10) {
        bossVelocity = bossVelocity * -1;
        boss.setGravityJump(3.3);
    }

    if (boss.x < platforms[3].x + 30 && boss.y + boss.height >= platforms[3].y && boss.y + boss.height < platforms[3].y + 10) {

        boss.setGravityJump(3.3);
    }

    if (boss.x > platforms[4].x && boss.x < platforms[4].x + platforms[4].width - 30 && boss.y + boss.height >= platforms[4].y && boss.y + boss.height < platforms[4].y + 10) {
        bossVelocity = bossVelocity * -1;
        boss.setGravityJump(3.3);
    }

    if (boss.x > platforms[6].x + platforms[6].width - 10 && boss.x < platforms[6].x + platforms[6].width + 10 && boss.y + boss.height >= platforms[6].y && boss.y + boss.height < platforms[6].y + 10) {

        boss.setGravityJump(3.3);
    }


    if (boss.x > platforms[platforms.length - 1].x + platforms[platforms.length - 1].width - 200) {

        GAME.finish();
        document.getElementById("tittle").innerHTML = "PERDISTE LA CARRERA";
        jugador.setVelocity(0);
        jugador.y = 0;
        boss.setVelocity(0);
    }
}

function generalBehaviors() {
    if (penance > 0) {
        penance--;
        if (penance < 2) {
            penance = 0;
            jugador.color = "rgb(246, 255, 100)"
        }
    }
    //observa que el jugador esté sobre las superficies
    for (var i = 0; i < platforms.length; i++) {
        if (jugador.y + jugador.height > platforms[i].y && jugador.y + jugador.height < platforms[i].y + 10 && jugador.x + jugador.width > platforms[i].x && jugador.x < platforms[i].x + platforms[i].width) {
            jugador.isFalling = false;
            break;
        } else {
            jugador.isFalling = true;
        }
    }

//evalúa la posición de la bala del jugador
    for (var i = 0; i < jugador.bullets.length; i++) {

        for (var j = 0; j < enemies.length; j++) {
            if (jugador.bullets[i].x < enemies[j].x + enemies[j].width && jugador.bullets[i].x > enemies[j].x && jugador.bullets[i].y > enemies[j].y - (jugador.bullets[i].height / 2) && jugador.bullets[i].y < enemies[j].y + enemies[j].height) {

                jugador.bullets.splice(i, 1);
                enemies.splice(j, 1);
            }

        }
    }


    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].x < jugador.x + jugador.width && enemies[i].x > jugador.x && enemies[i].y > jugador.y - (enemies[i].height / 2) && enemies[i].y < jugador.y + jugador.height) {

            penance = 200;
            jugador.setVelocity(0);
            jugador.color = "rgb(246, 255, 100,0.2)"
        }

        for (var j = 0; j < enemies[i].bullets.length; j++) {
            if (enemies[i].bullets[j].x < jugador.x + jugador.width && enemies[i].bullets[j].x > jugador.x && enemies[i].bullets[j].y > jugador.y - (enemies[i].bullets[j].height / 2) && enemies[i].bullets[j].y < jugador.y + jugador.height) {

                enemies[i].bullets.splice(i, 1);
                penance = 200;
                jugador.setVelocity(0);
                jugador.color = "rgb(246, 255, 100,0.2)"
            }


        }
    }

    if (jugador.x > platformFire.x && jugador.x < platformFire.x + platformFire.width) {
        if (jugador.y + jugador.height >= platformFire.y && jugador.y + jugador.height < platformFire.y + 10) {
            jugador.setVelocity(jugador.speedX*0.95);
            jugador.isJumping=false;
        }

    }

    if (jugador.y > SETTINGS.height) {
        GAME.finish();
        document.getElementById("tittle").innerHTML = "PERDISTE LA CARRERA";
        jugador.setVelocity(0);
        jugador.y = 0;
        boss.setVelocity(0);
    }

    if (jugador.x > platforms[platforms.length - 1].x + platforms[platforms.length - 1].width - 200) {

        GAME.finish();
        document.getElementById("tittle").innerHTML = "GANASTE LA CARRERA";
        boss.setVelocity(0);
        jugador.setVelocity(0);
        boss.x=0;

    }

}

keyBoard();

function keyBoard() {
    document.addEventListener('keydown', function (event) {
        if (penance === 0) {
            switch (event.key) {
                case 'd':
                case 'D':
                case 'ArrowRight':

                    jugador.setVelocity(1);
                    break;
                case 'a':
                case 'A':
                case 'ArrowLeft':
                    jugador.setVelocity(-1);
                    break;
                case 'w':
                case 'W':
                case 'ArrowUp':
                    jugador.setGravityJump(3.3);
                    break;
                case 'd':
                case 'D':
                case 'ArrowDown':
                    console.log('Down was pressed');
                    break;

                case ' ':

                    jugador.fire();
                    console.log('Space was pressed');
                    break;
            }
        }
    });

    document.addEventListener('keyup', function (event) {

        switch (event.key) {
            case 'd':
            case 'D':
            case 'ArrowRight':
                cameraMov = 0;
                jugador.setVelocity(0);
                break;
            case 'a':
            case 'A':
            case 'ArrowLeft':
                cameraMov = 0;
                jugador.setVelocity(0);
                break;
            case 'u':
            case 'U':
            case 'ArrowUp':
                console.log('Up was up');
                break;
            case 'd':
            case 'D':
            case 'ArrowDown':
                console.log('Down was up');
                break;

            case ' ':
                console.log('Space was up');
                break;
        }

    });
}




//buttons mobile, no terminado


var btnRight=document.getElementById("btnRight");
var btnLeft=document.getElementById("btnLeft");
var btnUp=document.getElementById("btnUp");
var btnNewGame = document.getElementById("newGame");


window.onmousedown=function (event) {
    if(event.target===btnRight){
        jugador.setVelocity(1);
    }

    if(event.target===btnUp){
        jugador.setGravityJump(3.3);
    }
    if(event.target===btnLeft){
        jugador.setVelocity(-1);
    }
    if(event.target===btnFire){
        jugador.fire();
    }

    if (event.target === btnNewGame) {
        location.reload();

    }
}

window.onmouseup=function (event) {
    if(event.target===btnRight){
        jugador.setVelocity(0);
    }


    if(event.target===btnLeft){
        jugador.setVelocity(0);
    }

}