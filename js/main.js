// Canvas elements
const startSection = document.querySelector("#startscreen");
const inBetweenSection = document.querySelector("#in-between");
const victorySection = document.querySelector("#victory");
const gameOverSection = document.querySelector("#game-over");
const gameSectionElement = document.querySelector("#game");
const canvasStatsElement = document.querySelector('#stats-canvas');
const canvasGameElement = document.querySelector('#canvas');
const canvasGunElement = document.querySelector('#gun-canvas');
const startGameBtn = document.querySelector('#start-game');
const nextLevelBtn = document.querySelector('#next-level');
const nextWaveBtn = document.querySelector('#next-wave');
const playAgainVictoryBtn = document.querySelector('#play-again-victory');
const playAgainGameOverBtn = document.querySelector('#play-again-game-over');

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
let collisionOffSet = 5;
let selectedHotGun = 'basicGun';
let healthMeterColor = 'green';
let healthMeterBgColor = 'white';
let bgColor = 'black'
let textColor = 'white'
let levelStartX = 50, levelStartY = 0;
let waveStarted = false;

// Arrays of objects
let monsters = [];
let roadParts = [];
let hotGuns = [];

// Stats
let level = 1;
let wave = 1;
let score = 0;
let highScore = 0;
let dps = 0;
let shotsPerSecond = 0;
let oneShotDamage = 0;
let arsenalValue = 0; 

const animate = () => {
    drawAllBoards();
    drawFullRoad();
    drawHotGuns();
    drawHotGunRange();

    if (waveStarted) {
        if (!monsters.length) {
            waveStarted = false;
            wave++;
            enableWaveButton();
            clearInterval(gameIntervalId);
            gameTime = 0;

            if ( monsterWaves[level - 1].length < wave ) {
                level++;
                wave = 1;


                if (monsterWaves.length < level) {
                    turnGameScreenOff();
                    loadVictoryScreen();
                }
                else {
                    turnGameScreenOff();
                    loadInBetweenScreen();
                }
            }
        }
        else {
            monsterAction();
            checkRange();
        }
    }

    roadParts.forEach(roadPart => {
        // console.log(roadPart.startX, roadPart.startY, roadPart.width, roadPart.height, 'roadPart')
        roadPart.drawCollisionRectangle();
        drawRoadElementCollison(roadPart);
    })

    //Logic for changing the position of the monsters
    if (gameIsOver) {
        gameOver();
        turnGameScreenOff();
        loadGameOverScreen();
    }
    else {
        animationId = requestAnimationFrame(animate);
    }
}


window.addEventListener('load', () => {
    canvasGameElement.addEventListener('click', (event) => {
        let canvasLeft = canvasGameElement.offsetLeft + gameSectionElement.offsetLeft ; // + canvas.clientLeft; Add  when border is applied // CanvasLeft = distance  to left side screen
        let canvasTop = canvasGameElement.offsetTop + gameSectionElement.offsetTop; // + canvas.clientTop; Add when border is applied to the canvas
        let x = event.pageX - canvasLeft; // event.pageX is actual location  
        let y = event.pageY - canvasTop;
        if (checkHotGunSpaceAvailable(x, y, selectedHotGun)) {
            placeGun(x, y, selectedHotGun);
        }
    } )

    startGameBtn.addEventListener('click', () => {
        turnStartScreenOff();
        loadInBetweenScreen();
    })

    nextLevelBtn.addEventListener('click', () => {
        turnInBetweenScreenOff();
        loadGameScreen();
        setLevelData();
        startLevel();
    })

    nextWaveBtn.addEventListener('click', () => {
        disableWaveButton();
        setWaveData();
        startWave();
    })

    playAgainVictoryBtn.addEventListener('click', () => { // ?? Can I create the same event listener for 2 differen buttons?
        console.log('I run victory btn')
        resetGame();
        loadInBetweenScreen();
        turnEndScreensOff();
    })

    playAgainGameOverBtn.addEventListener('click', () => {
        console.log('I run game over button')
        resetGame();
        loadInBetweenScreen();
        turnEndScreensOff();
        enableWaveButton();
    })

})
