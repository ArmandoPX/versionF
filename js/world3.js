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

    platforms.push(new Platform(0, bottomPos - 20, 300, 20, GAME.context));
    platforms.push(new Platform(400, bottomPos - 80, 300, 20, GAME.context));
    platforms.push(new Platform(800, bottomPos - 140, 300, 20, GAME.context));
    platforms.push(new Platform(1200, bottomPos - 200, 300, 20, GAME.context));
    platforms.push(new Platform(1600, bottomPos - 260, 300, 20, GAME.context));
    platforms.push(new Platform(2000, bottomPos - 320, 300, 20, GAME.context));
    platforms.push(new Platform(2400, bottomPos - 380, 300, 20, GAME.context));
    platforms.push(new Platform(2800, bottomPos - 440, 300, 20, GAME.context));
    platforms.push(new Platform(3200, bottomPos - 500, 300, 20, GAME.context));
    platforms.push(new Platform(3600, bottomPos - 560, 300, 20, GAME.context));
    platforms.push(new Platform(4000, bottomPos - 620, 300, 20, GAME.context));
    platforms.push(new Platform(4400, bottomPos - 680, 300, 20, GAME.context));
    platforms.push(new Platform(4800, bottomPos - 740, 300, 20, GAME.context));
    platforms.push(new Platform(5200, bottomPos - 800, 1200, 20, GAME.context));

    // Agregamos una plataforma adicional debajo de la última
    platforms.push(new Platform(5200, bottomPos, 1200, 20, GAME.context));

    enemies.push(new Enemy(1600, bottomPos - 260 - 30, 30, 30, "red", GAME.context, 1600, 1600 + 200));
    enemies.push(new Enemy(3600, bottomPos - 560 - 30, 30, 30, "red", GAME.context, 3600, 3600 + 200));
    
    // Agregamos un camino adicional
    platforms.push(new Platform(5600, bottomPos - 800, 300, 20, GAME.context));

    boss = new Jugador(30, 30, 30, 30, "white", GAME.context);
    boss.setVelocity(bossVelocity);
    jugador = new Jugador(30, 30, 30, 30, "rgb(246, 255, 100)", GAME.context);
    jugador.setGravityJump(3.0);  // Ajuste el valor según tus preferencias para un salto equilibrado
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
    // Iterar sobre todas las plataformas
    for (var i = 0; i < platforms.length; i++) {
        // Verificar si el boss está sobre una plataforma
        if (
            boss.y + boss.height > platforms[i].y &&
            boss.y + boss.height < platforms[i].y + 10 &&
            boss.x + boss.width > platforms[i].x &&
            boss.x < platforms[i].x + platforms[i].width
        ) {
            boss.isFalling = false;
            boss.setGravityJump(3.3); // Ajustar la gravedad en todas las plataformas
            break; // Salir del bucle si el boss está sobre una plataforma
        } else {
            boss.isFalling = true;
        }
    }

    // Ajustar la velocidad del boss
    if (boss.isJumping) {
        boss.setVelocity(bossVelocity * 2.0);
    } else {
        boss.setVelocity(bossVelocity);
    }

       // Verificar si el boss ha pasado la última plataforma
       if (boss.x > platforms[platforms.length - 1].x + platforms[platforms.length - 1].width - boss.width) {
        GAME.finish();
        document.getElementById("tittle").innerHTML = "HAS PERDIDO LA CARRERA";
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
            jugador.color = "rgb(246, 255, 100)";
        }
    }
    
    // Observar que el jugador esté sobre las superficies
    for (var i = 0; i < platforms.length; i++) {
        if (
            jugador.y + jugador.height > platforms[i].y &&
            jugador.y + jugador.height < platforms[i].y + 10 &&
            jugador.x + jugador.width > platforms[i].x &&
            jugador.x < platforms[i].x + platforms[i].width
        ) {
            jugador.isFalling = false;
            break;
        } else {
            jugador.isFalling = true;
        }
    }

    // Evaluar la posición de la bala del jugador
    for (var i = 0; i < jugador.bullets.length; i++) {
        for (var j = 0; j < enemies.length; j++) {
            if (
                jugador.bullets[i].x < enemies[j].x + enemies[j].width &&
                jugador.bullets[i].x > enemies[j].x &&
                jugador.bullets[i].y > enemies[j].y - jugador.bullets[i].height / 2 &&
                jugador.bullets[i].y < enemies[j].y + enemies[j].height
            ) {
                jugador.bullets.splice(i, 1);
                enemies.splice(j, 1);
            }
        }
    }

    // Colisiones con enemigos
    for (var i = 0; i < enemies.length; i++) {
        if (
            jugador.x < enemies[i].x + enemies[i].width &&
            jugador.x + jugador.width > enemies[i].x &&
            jugador.y < enemies[i].y + enemies[i].height &&
            jugador.y + jugador.height > enemies[i].y
        ) {
            penance = 200;
            jugador.setVelocity(0);
            jugador.color = "rgb(246, 255, 100, 0.2)";
        }

        for (var j = 0; j < enemies[i].bullets.length; j++) {
            if (
                enemies[i].bullets[j].x < jugador.x + jugador.width &&
                enemies[i].bullets[j].x > jugador.x &&
                enemies[i].bullets[j].y > jugador.y - enemies[i].bullets[j].height / 2 &&
                enemies[i].bullets[j].y < jugador.y + jugador.height
            ) {
                enemies[i].bullets.splice(j, 1);
                penance = 200;
                jugador.setVelocity(0);
                jugador.color = "rgb(246, 255, 100, 0.2)";
            }
        }
    }

    // Colisión con plataforma de fuego
    if (
        jugador.x > platformFire.x &&
        jugador.x < platformFire.x + platformFire.width &&
        jugador.y + jugador.height >= platformFire.y &&
        jugador.y + jugador.height < platformFire.y + 10
    ) {
        jugador.setVelocity(jugador.speedX * 0.95);
        jugador.isJumping = false;
    }

    // Verificar si el jugador ha caído
    if (jugador.y > SETTINGS.height) {
        GAME.finish();
        document.getElementById("tittle").innerHTML = "PERDISTE LA CARRERA";
        jugador.setVelocity(0);
        jugador.y = 0;
        boss.setVelocity(0);
    }

    // Verificar si el jugador ha llegado al final antes que el boss
    if (boss.x + boss.width > platforms[platforms.length - 1].x + platforms[platforms.length - 1].width - 200) {
        GAME.finish();
        document.getElementById("tittle").innerHTML = "PERDISTE LA CARRERA";
        boss.setVelocity(0);
        jugador.setVelocity(0);
        boss.x = 0;
    }

    // Verificar si el jugador ha ganado la carrera
    // Verificar si el jugador ha ganado la carrera
    if (jugador.x + jugador.width > platforms[platforms.length - 1].x - 200) {
        GAME.finish();
        document.getElementById("tittle").innerHTML = "GANASTE LA CARRERA";
        boss.setVelocity(0);
        jugador.setVelocity(0);
        boss.x = 0;
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