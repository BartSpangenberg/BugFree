// Canvas elements
const canvasStatsElement = document.querySelector('#stats-canvas') // ?? What is the 4px on the bottom of every canvas element?
const canvasGameElement = document.querySelector('#canvas')
const canvasGunElement = document.querySelector('#gun-canvas')
const gameSectionElement = document.querySelector("#game");

// create context
const ctxStats = canvasStatsElement.getContext('2d');
const ctx = canvasGameElement.getContext('2d');
const ctxGuns = canvasGunElement.getContext('2d');

// Game variables
let gameIntervalId = null;
let gameTime = 0;
let animationId = null;
let gameIsOver = false;
let heatMeter = 0;
let collisionOffSet = 20;
let selectedHotGun = 'basicGun';
let healthMeterColor = 'green';
let healthMeterBgColor = 'white';
let bgColor = 'black'
let textColor = 'white'
let levelStartX = 50, levelStartY = 0;

// Arrays of objects
let monsters = [];
let roadParts = [];
let hotGuns = [];
let gunShots = [];

// Stats
let level = 1;
let wave = 1;
let score = 0;
let highScore = 0;
let dps = 0;
let shotsPerSecond = 0;
let oneShotDamage = 0;
let arsenalValue = 0; 

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

const animate = () => {
    drawAllBoards();
    drawFullRoad();
    monsterAction();
    drawHotGuns();
    checkRange();
    drawHotGunRange();
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

    canvasGameElement.addEventListener('click', (event) => {
        console.log(canvasStatsElement)
        let canvasLeft = canvasGameElement.offsetLeft + gameSectionElement.offsetLeft ; // + canvas.clientLeft; Add  when border is applied // CanvasLeft = distance  to left side screen
        let canvasTop = canvasGameElement.offsetTop + gameSectionElement.offsetTop; // + canvas.clientTop; Add when border is applied to the canvas
        let x = event.pageX - canvasLeft; // event.pageX is actual location  
        let y = event.pageY - canvasTop;
        if (checkHotGunSpaceAvailable(x, y, selectedHotGun)) {
            placeGun(x, y, selectedHotGun);
        }
        console.log(canvas.offsetLeft, event.pageX)
        console.log(canvas.offsetTop, event.pageY)
    } )
})