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