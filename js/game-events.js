const turnStartScreenOff = () => {
    startSection.style.display = "none";
}

const turnInBetweenScreenOff = () => {
    inBetweenSection.style.display = "none";
}

const turnGameScreenOff = () => {
    gameSectionElement.style.display = "none";
}

const turnEndScreensOff = () => {
    gameOverSection.style.display = "none";
    victorySection.style.display = "none";
    gameOverSectionContainer.style.display = "flex";
}

const loadInBetweenScreen = () => {
    inBetweenSection.style.display = "block";
}

const loadGameScreen = () => {
    gameSectionElement.style.display = "block";
}

const loadVictoryScreen = () => {
    victorySection.style.display = "block";
}

const loadGameOverScreen = () => {
    gameOverSection.style.display = "block";
}

const disableWaveButton = () => {
    nextWaveBtn.disabled = true;
}

const enableWaveButton = () => {
    nextWaveBtn.disabled = false;
}

const setLevelData = () => {
    hotGuns = [];
    roadParts = [];
    levelStartX = roadLevelStartPoints[level - 1].levelStartX;
    levelStartY = roadLevelStartPoints[level - 1].levelStartY;
    money = startMoney[level - 1];

    // Road needs to be made specific for level
    createRoad();
}

const setWaveData = () => {
    createMonsterWave(monsterWaves[level - 1][wave - 1]);    
}

const startWave = () => {
    waveStarted = true;
    startGameTimer();
}

const startLevel = () => {
    animate();
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

const resetGame = () => {
    // Game variables
    gameIntervalId = null;
    gameTime = 0;
    animationId = null;
    gameIsOver = false;
    heatMeter = 0;
    waveStarted = false;
    gandalfPlaced = false;

// Arrays of objects
    hotGuns = [];
    monsters = [];

// Stats
    level = 1;
    wave = 1;
    score = 0;
    dps = 0;
    shotsPerSecond = 0;
    oneShotDamage = 0;
    arsenalValue = 0; 
}

const calculateDps = () => {
    dps = hotGuns.reduce((dps, hotGun) => {
        return dps += hotGun.dps;
    }, 0)
}

const calculateShotsPerSecond = () => {
    shotsPerSecond = hotGuns.reduce((shotsPerSecond, hotGun) => {
        return shotsPerSecond += hotGun.shotsPerSecond;
    }, 0)
}

const calculateOneShotDamage = () => {
    oneShotDamage = hotGuns.reduce((oneShotDamage, hotGun) => {
        return oneShotDamage += hotGun.damage;
    }, 0)
}

const changeHotGunPrototypePosition = (x, y) => {
    hotGunImage.style.top = y + 'px';
    hotGunImage.style.left = x + 'px';
}

const setSoundEffectTimer = (soundObject) => {
    soundObject.sound.play();
    soundObject.playStatus = false;
    setTimeout(() => {
        soundObject.playStatus = true;
    }, soundObject.playTimeOut)
}

const loadInBetweenScreenHtml = () => {
    while (inBetweenSection.firstChild) {
        inBetweenSection.removeChild(inBetweenSection.lastChild);
    }
    console.log(level)
    inBetweenSection.innerHTML = `
        <h1 class="in-between-header">${levelInformation[level - 1].title}</h1>
        <div class="in-between-flex">
        <span class="monster-tag">New Bug</span>
        <img class="monster-image" src="${levelInformation[level - 1].monsterImg}">
        <div class="in-between-game-info">
                <h4 class="monster-header">${levelInformation[level - 1].monsterTitle}</h4>
                <p class="monster-paragraph">${levelInformation[level - 1].monsterParagraph}</p>
                <h5 class="fact-header">${levelInformation[level - 1].didYouKnow}</h5>
                <p class="fact-paragraph">${levelInformation[level - 1].didYouKnowParagraph}</p>
                <button id="next-level" class="btn">Next level</button>
            </div>
        </div>
    `
    nextLevelBtn = document.querySelector('#next-level');

    nextLevelBtnClickEvent();
}

const nextLevelBtnClickEvent = () => {
    nextLevelBtn.addEventListener('click', () => {
        // ?? Not exactly sure why this works, helps to prevent the bug that a gun is placed when next level button is clicked
        
        setTimeout(() => {
            turnInBetweenScreenOff();
            loadGameScreen();
            setLevelData();
            startLevel();
        }, 0)
    })
}

const setVictoryScreenData = () => {
    victoryScoreElement.innerText = `Score: ${score}`
    victoryHighScoreElement.innerText = `Highscore: ${highScore}`
}

const setGameOverScreenData = () => {
    gameOverScoreElement.innerText = `Score: ${score}`
    gameOverHighScoreElement.innerText = `Highscore: ${highScore}`
}

