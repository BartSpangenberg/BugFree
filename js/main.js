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
const gun1Element = document.querySelector('#gun1');
const gun2Element = document.querySelector('#gun2');
const gun3Element = document.querySelector('#gun3');
const gun4Element = document.querySelector('#gun4');
const gun5Element = document.querySelector('#gun5');
const gun6Element = document.querySelector('#gun6');
const hotGunImage = document.querySelector('#cursor-follow');

// Images
let towerFoundationBasic = new Image();
let towerFoundationQuick = new Image();
let towerFoundationLazer = new Image();
let towerFoundationBazooka = new Image();
let towerFoundationSniper = new Image();

let basicGunImage = new Image();
let quickGunImage = new Image();
let sniperGunImage = new Image();
let lazerGunImage = new Image();
let bazookaGunImage = new Image();
let gandalfImage = new Image();

let basicGunImageRange = new Image();
let quickGunImageRange = new Image();
let sniperGunImageRange = new Image();
let lazerGunImageRange = new Image();
let bazookaGunImageRange = new Image();
let gandalfImageRange = new Image();

let bullet = new Image();

let basicMonsterImage = new Image();
let bigMonsterImage = new Image();
let invisibleMonsterImage = new Image();
let invisibleStateMonsterImage = new Image();
let healMonsterImage = new Image();
let speedMonsterImage = new Image();
let flyingMonsterImage = new Image();

// create context
const ctxStats = canvasStatsElement.getContext('2d');
const ctx = canvasGameElement.getContext('2d');
const ctxGuns = canvasGunElement.getContext('2d');

// Game variables
let gameIntervalId = null;
let gameTime = 0;
let animationId = null;
let gameIsOver = false;
let collisionOffSet = 20;
let healthMeterColor = 'green';
let healthMeterBgColor = 'white';
let bgColor =  '#026633'
let roadColor = '#6E3B2E'
let textColor = 'white';
let statColor = 'yellow';
let roadShadow = '#2C0C00';
let monsterShadow = 'black';
let levelStartX = null, levelStartY = null;
let waveStarted = false;
let canvasLoaded = false; // Not used I think
let userIsPlacingGun = false;
let speedChangeGandalf = 0.4;
let gandalfPlaced = false;

// HotGun info
let instanceOfAllHotGuns = [new BigGun, new QuickGun, new Sniper, new Gandalf, new Lazer, new Bazooka];
let selectedHotGun = null;

// Arrays of objects
let monsters = [];
let roadParts = [];
let hotGuns = [];

// Stats
let money = null;
let level = 1;
let wave = 1;
let score = 0;
let highScore = 0;
let dps = 0;
let shotsPerSecond = 0;
let oneShotDamage = 0;
let arsenalValue = 0; 
let heatMeter = 0;

const animate = () => {
    drawAllBoards();
    drawFullRoad();
    drawHotGuns();
    // drawHotGunRange();

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

    // roadParts.forEach(roadPart => {
    //     drawRoadElementCollison(roadPart);
    // })

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
    // Load images
    towerFoundationBasic.src = './images/tower-foundation.png'
    towerFoundationQuick.src = './images/tower-foundation-quick-gun.png';
    towerFoundationLazer.src = './images/foundation-lazer.png';
    towerFoundationBazooka.src = './images/foundation-bazooka.png';
    towerFoundationSniper.src = './images/foundation-sniper.png';

    basicGunImage.src = './images/basic-tower-final-tower.png';
    quickGunImage.src = './images/quick-gun.png';
    sniperGunImage.src = './images/sniper.png';
    lazerGunImage.src = './images/lazer.png';
    bazookaGunImage.src = './images/bazooka.png';
    gandalfImage.src = './images/gandalf.png';

    basicGunImageRange.src = './images/baisc-tower-final-range.png';
    quickGunImageRange.src = './images/quick-gun-range.png';
    sniperGunImageRange.src = './images/sniper-range.png';
    lazerGunImageRange.src = './images/lazer-range.png';
    bazookaGunImageRange.src = './images/bazooka-range.png';
    gandalfImageRange.src = './images/gandalf-range.png';

    basicMonsterImage.src = './images/basic-monster.png'
    invisibleMonsterImage.src = './images/invisible-monster.png'
    invisibleStateMonsterImage.src = './images/invisible-state-invisible-monster.png';
    bigMonsterImage.src = './images/big-monster.png'
    healMonsterImage.src = './images/heal-monster.png'
    speedMonsterImage.src = './images/speed-monster.png';
    flyingMonsterImage.src = './images/flying-monster.png'

    bullet.src = './images/bullet.png';

    startGameBtn.addEventListener('click', () => {
        turnStartScreenOff();
        loadInBetweenScreen();
    })

    nextLevelBtn.addEventListener('click', () => {
        // ?? Not exactly sure why this works, helps to prevent the bug that a gun is placed when next level button is clicked
        setTimeout(() => {
            turnInBetweenScreenOff();
            loadGameScreen();
            setLevelData();
            startLevel();
        }, 0)
    })

    nextWaveBtn.addEventListener('click', () => {
        disableWaveButton();
        setWaveData();
        startWave();
    })

    playAgainVictoryBtn.addEventListener('click', () => { // ?? Can I create the same event listener for 2 differen buttons?
        resetGame();
        loadInBetweenScreen();
        turnEndScreensOff();
    })

    playAgainGameOverBtn.addEventListener('click', () => {
        resetGame();
        loadInBetweenScreen();
        turnEndScreensOff();
        enableWaveButton();
    })

    // Click on tower --> change the cursor style
    gun1Element.addEventListener('click', () => {
        selectedHotGun = 'bigGun';
        userIsPlacingGun = true;
        hotGunImage.src ='./images/baisc-tower-final-range.png';
        hotGunImage.style.display = "block";        
    })

    gun2Element.addEventListener('click', () => {
        selectedHotGun = 'doubleGun';
        userIsPlacingGun = true;
        hotGunImage.src ='./images/quick-gun-range.png';
        hotGunImage.style.display = "block";        
    })

    gun3Element.addEventListener('click', () => {
        selectedHotGun = 'sniper';
        userIsPlacingGun = true;
        hotGunImage.src ='./images/sniper-range.png';
        hotGunImage.style.display = "block";        
    })

    gun4Element.addEventListener('click', () => {
        selectedHotGun = 'bazooka';
        userIsPlacingGun = true;
        hotGunImage.src ='./images/bazooka-range.png';
        hotGunImage.style.display = "block";        
    })

    gun5Element.addEventListener('click', () => {
        selectedHotGun = 'lazer';
        userIsPlacingGun = true;
        hotGunImage.src ='./images/lazer-range.png';
        hotGunImage.style.display = "block";        
    })

    gun6Element.addEventListener('click', () => {
        selectedHotGun = 'gandalf';
        userIsPlacingGun = true;
        hotGunImage.src ='./images/gandalf-range.png';
        hotGunImage.style.display = "block";        
    })

    // Remove selected hotGun
    window.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            userIsPlacingGun = false;
            hotGunImage.style.display = "none";        
        }
    })

    window.addEventListener('mousemove', (event) => { 
        if (userIsPlacingGun) {
            let canvasLeft = canvasGameElement.offsetLeft + gameSectionElement.offsetLeft ; // + canvas.clientLeft; Add  when border is applied // CanvasLeft = distance  to left side screen
            let canvasTop = canvasGameElement.offsetTop + gameSectionElement.offsetTop; // + canvas.clientTop; Add when border is applied to the canvas
            let x = event.pageX - canvasLeft; // event.pageX is actual location  
            let y = event.pageY - canvasTop;
            hotGunImage.style.top = y - createTemporaryHotGunObject().range + 50 + 'px';
            hotGunImage.style.left = x - createTemporaryHotGunObject().range + 'px';
        }
    })

    window.addEventListener('click', (event) => {
       if (userIsPlacingGun) {
            let canvasLeft = canvasGameElement.offsetLeft + gameSectionElement.offsetLeft ; // + canvas.clientLeft; Add  when border is applied // CanvasLeft = distance  to left side screen
            let canvasTop = canvasGameElement.offsetTop + gameSectionElement.offsetTop; // + canvas.clientTop; Add when border is applied to the canvas
            let x = event.pageX - canvasLeft; // event.pageX is actual location  
            let y = event.pageY - canvasTop;
            let temporaryHotGun = createTemporaryHotGunObject();
            if (checkHotGunSpaceAvailable(x, y, temporaryHotGun)) {
                placeGun(x, y, temporaryHotGun);
            }
        }
    })
})
