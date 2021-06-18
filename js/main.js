// Canvas elements
const startSection = document.querySelector("#startscreen");
const inBetweenSection = document.querySelector("#in-between");
const victorySection = document.querySelector("#victory");
const gameOverSection = document.querySelector("#game-over");
const gameOverSectionContainer = document.querySelector("#game-over-flex");
const gameSectionElement = document.querySelector("#game");
const canvasStatsElement = document.querySelector('#stats-canvas');
const canvasGameElement = document.querySelector('#canvas');
const canvasGunElement = document.querySelector('#gun-canvas');
const startGameBtn = document.querySelector('#start-game');
let nextLevelBtn = document.querySelector('#next-level');
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
const gun1ElementHover = document.querySelector('#gun-hover1');
const gun2ElementHover = document.querySelector('#gun-hover2');
const gun3ElementHover = document.querySelector('#gun-hover3');
const gun4ElementHover = document.querySelector('#gun-hover4');
const gun5ElementHover = document.querySelector('#gun-hover5');
const gun6ElementHover = document.querySelector('#gun-hover6');
const musicButton = document.querySelector('#music');
const soundEffectButton = document.querySelector('#sound-effects');
const victoryScoreElement = document.querySelector('#victory-score');
const victoryHighScoreElement = document.querySelector('#victory-highscore');
const gameOverScoreElement = document.querySelector('#game-over-score');
const gameOverHighScoreElement = document.querySelector('#game-over-highscore');
const situationDivElement = document.querySelector('#situation'); 
const missionDivElement = document.querySelector('#mission'); 
const executionDivElement = document.querySelector('#execution'); 
const gameplayDivElement = document.querySelector('#gameplay'); 
const situationTextElement = document.querySelector('#situation-text'); 
const missionTextElement = document.querySelector('#mission-text'); 
const executionTextElement = document.querySelector('#execution-text'); 
const instructionsDivElement = document.querySelector('#instructions'); 


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
let bgColor =  'transparent';
let roadEdgeColor = "#5A3825";
let roadColor = '#C5AA5B'
let textColor = '#072400';
let statColor = '#9F7700';
let roadShadow = '#2C0C00';
let monsterShadow = 'black';
let levelStartX = null, levelStartY = null;
let waveStarted = false;
let canvasLoaded = false; // Not used I think
let userIsPlacingGun = false;
let speedChangeGandalf = 0.3;
let gandalfPlaced = false;
let playMusic = true;
let playSoundEffects = true;

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

const animate = (cancelAnimation) => {
    if (cancelAnimation && typeof cancelAnimation === "boolean") {
        cancelAnimationFrame(animationId);
        console.log("I run")
    }

    clearBoard();
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
                    if (highScore < score) {
                        highScore = score;
                    }
                    turnGameScreenOff();
                    setVictoryScreenData();
                    loadVictoryScreen();
                }
                else {
                    turnGameScreenOff();
                    loadInBetweenScreenHtml();
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
        drawRoadElementCollison(roadPart);
    })

    //Logic for changing the position of the monsters
    if (gameIsOver) {
        if (highScore < score) {
            highScore = score;
        }
        gameOver();
        turnGameScreenOff();
        setGameOverScreenData();
        loadGameOverScreen();
    }
    else {
        animationId = requestAnimationFrame(animate);
    }
}


window.addEventListener('load', () => {    
    gameMusic.sound.play();
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
    flyingMonsterImage.src = './images/flying-monster.png';

    bullet.src = './images/bullet.png';

    startGameBtn.addEventListener('click', () => {
        turnStartScreenOff();
        loadInBetweenScreenHtml();
        loadInBetweenScreen();
    })

    nextWaveBtn.addEventListener('click', () => {
        disableWaveButton();
        setWaveData();
        startWave();
    })

    playAgainVictoryBtn.addEventListener('click', () => { // ?? Can I create the same event listener for 2 differen buttons?
        resetGame();
        loadInBetweenScreen();
        loadInBetweenScreenHtml();
        turnEndScreensOff();
        enableWaveButton();
    })

    playAgainGameOverBtn.addEventListener('click', () => {
        resetGame();
        loadInBetweenScreen();
        loadInBetweenScreenHtml();
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

        // Click on tower --> change the cursor style
        gun1Element.addEventListener('mouseover', () => {
            gun1ElementHover.style.display = "block";
        })

        gun1Element.addEventListener('mouseout', () => {
            gun1ElementHover.style.display = "none";
        })
    
        gun2Element.addEventListener('mouseover', () => {
            gun2ElementHover.style.display = "block";
        })

        gun2Element.addEventListener('mouseout', () => {
            gun2ElementHover.style.display = "none";
        })
    
        gun3Element.addEventListener('mouseover', () => {
            gun3ElementHover.style.display = "block";
        })

        gun3Element.addEventListener('mouseout', () => {
            gun3ElementHover.style.display = "none";
        })
    
        gun4Element.addEventListener('mouseover', () => {
            gun4ElementHover.style.display = "block";
        })

        gun4Element.addEventListener('mouseout', () => {
            gun4ElementHover.style.display = "none";
        })
    
        gun5Element.addEventListener('mouseover', () => {
            gun5ElementHover.style.display = "block";
        })

        gun5Element.addEventListener('mouseout', () => {
            gun5ElementHover.style.display = "none";
        })
    
        gun6Element.addEventListener('mouseover', () => {
            gun6ElementHover.style.display = "block";
        })

        gun6Element.addEventListener('mouseout', () => {
            gun6ElementHover.style.display = "none";
        })
    

    // Remove selected hotGun
    window.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            userIsPlacingGun = false;
            hotGunImage.style.display = "none";        
        }
    })
    window.addEventListener('keydown', (event) => {
        if (event.key === "1") {
            selectedHotGun = 'bigGun';
            userIsPlacingGun = true;
            hotGunImage.src ='./images/baisc-tower-final-range.png';
            hotGunImage.style.display = "block";        
        }
    })
    window.addEventListener('keydown', (event) => {
        if (event.key === "2") {
            selectedHotGun = 'doubleGun';
            userIsPlacingGun = true;
            hotGunImage.src ='./images/quick-gun-range.png';
            hotGunImage.style.display = "block";       
        }
    })
    window.addEventListener('keydown', (event) => {
        if (event.key === "3") {
            selectedHotGun = 'sniper';
            userIsPlacingGun = true;
            hotGunImage.src ='./images/sniper-range.png';
            hotGunImage.style.display = "block";           
        }
    })
    window.addEventListener('keydown', (event) => {
        if (event.key === "4") {
            selectedHotGun = 'bazooka';
            userIsPlacingGun = true;
            hotGunImage.src ='./images/bazooka-range.png';
            hotGunImage.style.display = "block";          
        }
    })
    window.addEventListener('keydown', (event) => {
        if (event.key === "5") {
            selectedHotGun = 'lazer';
            userIsPlacingGun = true;
            hotGunImage.src ='./images/lazer-range.png';
            hotGunImage.style.display = "block";           
        }
    })
    window.addEventListener('keydown', (event) => {
        if (event.key === "6") {
            selectedHotGun = 'gandalf';
            userIsPlacingGun = true;
            hotGunImage.src ='./images/gandalf-range.png';
            hotGunImage.style.display = "block";            
        }
    })

    musicButton.addEventListener('click', () => {
        if (gameMusic.playStatus) {
            gameMusic.playStatus = false;
            gameMusic.sound.pause();
            musicButton.src = '../images/music-off.png'
        }
        else {
            gameMusic.playStatus = true;
            gameMusic.sound.play();
        }
    })

    soundEffectButton.addEventListener('click', () => {
        if (playSoundEffects) {
            playSoundEffects = false;
            soundEffectButton.src = '../images/sound-effect-off.png'
        }
        else {
            playSoundEffects = true;
        }
    })

    situationDivElement.addEventListener('mouseover', () => {
        situationTextElement.innerText = "You are building your dream project. However, Monster Bugs try to enter your codebase.";
        situationTextElement.style.fontSize = '1em'
        situationDivElement.style.backgroundColor = '#ffbf00';
        situationDivElement.style.boxShadow = '0px 5px 3px 3px rgba(0, 0, 0, 0.5)';
    })

    situationDivElement.addEventListener('mouseout', () => {
        situationTextElement.innerText = "Situation";
        situationTextElement.style.fontSize = '1.6em'
        situationDivElement.style.backgroundColor = 'rgba(255, 191, 0, 0.5)';
        situationDivElement.style.boxShadow = '0px 2px 3px 3px rgba(0, 0, 0, 0.2)';
    })

    missionDivElement.addEventListener('mouseover', () => {
        missionTextElement.innerText = "Eliminate all the Monster Bugs before they reach your code.";
        missionTextElement.style.fontSize = '1em'
        missionDivElement.style.backgroundColor = '#ffbf00';
        missionDivElement.style.boxShadow = '0px 5px 3px 3px rgba(0, 0, 0, 0.5)';
    })

    missionDivElement.addEventListener('mouseout', () => {
        missionTextElement.innerText = "Mission";
        missionTextElement.style.fontSize = '1.6em'
        missionDivElement.style.backgroundColor = 'rgba(255, 191, 0, 0.5)';
        missionDivElement.style.boxShadow = '0px 2px 3px 3px rgba(0, 0, 0, 0.2)';
    })


    executionDivElement.addEventListener('mouseover', () => {
        executionTextElement.innerText = "Spend your money wisely by placing Guns in strategic positions.";
        executionTextElement.style.fontSize = '1em'
        executionDivElement.style.backgroundColor = '#ffbf00';
        executionDivElement.style.boxShadow = '0px 5px 3px 3px rgba(0, 0, 0, 0.5)';
    })

    executionDivElement.addEventListener('mouseout', () => {
        executionTextElement.innerText = "Execution";
        executionTextElement.style.fontSize = '1.6em'
        executionDivElement.style.backgroundColor = 'rgba(255, 191, 0, 0.5)';
        executionDivElement.style.boxShadow = '0px 2px 3px 3px rgba(0, 0, 0, 0.2)';
    })


    gameplayDivElement.addEventListener('mouseover', () => {
        gameplayDivElement.style.backgroundColor = '#ffbf00';
        gameplayDivElement.style.boxShadow = '0px 5px 3px 3px rgba(0, 0, 0, 0.5)';
        instructionsDivElement.style.display = 'block';
    })

    gameplayDivElement.addEventListener('mouseout', () => {
        gameplayDivElement.style.backgroundColor = 'rgba(255, 191, 0, 0.5)';
        gameplayDivElement.style.boxShadow = '0px 2px 3px 3px rgba(0, 0, 0, 0.2)';
        instructionsDivElement.style.display = 'none';
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
