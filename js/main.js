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
let collisionOffSet = 10;
let selectedHotGun = 'basicGun';

// Arrays of objects
let monsters = [];
let roadParts = [];
let hotGuns = [];

const createMonsterWave = (firstWave) => {
    for (let i = 0; i < firstWave.amountOfNormalMonsters; i++) {
        let monster = new Monster
        monster.spawnTime = randomSpawnTime(firstWave.waveTime);
        monsters.push(monster);
    }    
}

const randomSpawnTime = time => {
    return Math.random() * time;
}

const createRoad = () => {
    roadParts.push(new RoadPart(50, 0, 50, 200, 'bottom', 1, 0, 'red'));
    roadParts.push(new RoadPart(100, 150, 250, 50, 'right', 0, -1, 'green'));
    roadParts.push(new RoadPart(300, 50, 50, 100, 'top', 1, 0, 'yellow'));
    roadParts.push(new RoadPart(350, 50, 600, 50, 'right', 0, 1, 'blue'));
    roadParts.push(new RoadPart(900, 100, 50, 350, 'bottom', -1, 0, 'purple'));
    roadParts.push(new RoadPart(650, 400, 250, 50, 'left', 0, -1, 'orange'));
    roadParts.push(new RoadPart(650, 200, 50, 200, 'top', -1, 0, 'red'));
    roadParts.push(new RoadPart(500, 200, 150, 50, 'left', 0, 1, 'yellow'));
    roadParts.push(new RoadPart(500, 250, 50, 200, 'bottom', -1, 0, 'red'));
    roadParts.push(new RoadPart(300, 400, 200, 50, 'left', 0, -1, 'yellow'));
    roadParts.push(new RoadPart(300, 300, 50, 100, 'top', -1, 0, 'red'));
    roadParts.push(new RoadPart(50, 300, 250, 50, 'left', 0, 1, 'yellow'));
    roadParts.push(new RoadPart(50, 350, 50, 150, 'bottom', 0, 1, 'red'));

    roadParts.forEach(roadPart => {
        roadPart.drawCollisionRectangle();
    })
}


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
            selectedHotGun = null;
        }
    } )
})