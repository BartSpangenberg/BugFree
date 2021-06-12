const canvasElement = document.querySelector('#canvas')
canvasElement.style.background = 'black'
const ctx = canvasElement.getContext('2d')



// Global variables
let gameIntervalId = null;
let gameTime = 0;
let animationId = null;
let gameIsOver = false;
let heatMeter = 0;
let score = 0;
let collisionOffSet = 20;
let selectedHotGun = 'basicGun';

// Arrays of objects
let monsters = [];
let roadParts = [];
let hotGuns = [];


const startGame = () => {
    animate();
    startGameTimer();
    // reset all game variables
}

const startGameTimer = () => {
    gameIntervalId = setInterval( () => {
        gameTime += 0.1;
    }, 100)
}

const gameOver = () => {
    // Called when the gameOver condition is met;
    // if heatScore > 0 for example;
    clearInterval(gameIntervalId);
    cancelAnimationFrame(animationId);
}



const gameInterval = () => {
    // Use set interval method to create a gameinterval 
}

const shootBullet = () => {
    // loop over monsters
    // loop over hotGuns
    // if loaded is true && within range, firsst implementation can be without the loading, just go for low damage and continous hitting
        // decrease health
        // set loaded to false 

            // if monster.health < 0 --> delete monster
}


const animate = () => {
    drawFullRoad();
    monsterAction();
    drawHotGuns();
    shootBullet();

    // Move monsters


    roadParts.forEach(roadPart => {
        // console.log(roadPart.startX, roadPart.startY, roadPart.width, roadPart.height, 'roadPart')
        roadPart.drawCollisionRectangle();
        drawRoadElementCollison(roadPart);
    })

    //Logic for changing the position of the monsters
    
    if (gameIsOver) {
        gameOver();
    }
    else {
        animationId = requestAnimationFrame(animate);
    }
}


window.addEventListener('load', () => {
    createMonsterWave(firstWave);
    createRoad();
    startGame();

    // place gun function
    // collision logic, road + guns

    canvasElement.addEventListener('click', (event) => {
        let canvasLeft = canvas.offsetLeft; // + canvas.clientLeft; Add  when border is applied // CanvasLeft = distance  to left side screen
        let canvasTop = canvas.offsetTop; // + canvas.clientTop; Add when border is applied to the canvas
        let x = event.pageX - canvasLeft; // event.pageX is actual location  
        let y = event.pageY - canvasTop;
        if (checkHotGunSpaceAvailable(x, y, selectedHotGun)) {
            placeGun(x, y, selectedHotGun);
        }
    } )
})