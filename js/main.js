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

// Arrays of objects
let monsters = [];
let roadParts = [];
let hotGuns = [];

const createMonsterWave = (monsterName, amount, amountOfTimeAllMonstersSpawnIn) => {
    // Loop over amount
        // create monsterName Object
        // with random time in reach of amountOfTimeAllMonstersSpawnIn
}

const createRoad = () => {
    roadParts.push(new RoadPart(50, 0, 50, 200, 'bottom', 1, 0, 'red'));
    roadParts.push(new RoadPart(100, 150, 250, 50, 'right', 1, 0, 'green'));
    roadParts.push(new RoadPart(300, 50, 50, 100, 'top', 1, 0, 'yellow'));
    roadParts.push(new RoadPart(350, 50, 600, 50, 'right', 1, 0, 'blue'));
    roadParts.push(new RoadPart(900, 100, 50, 350, 'bottom', 1, 0, 'purple'));
    roadParts.push(new RoadPart(650, 400, 250, 50, 'left', 1, 0, 'orange'));
    roadParts.push(new RoadPart(650, 200, 50, 200, 'top', 1, 0, 'red'));
    roadParts.push(new RoadPart(500, 200, 150, 50, 'left', 1, 0, 'yellow'));
    roadParts.push(new RoadPart(500, 250, 50, 200, 'bottom', 1, 0, 'red'));
    roadParts.push(new RoadPart(300, 400, 200, 50, 'left', 1, 0, 'yellow'));
    roadParts.push(new RoadPart(300, 300, 50, 100, 'top', 1, 0, 'red'));
    roadParts.push(new RoadPart(50, 300, 250, 50, 'left', 1, 0, 'yellow'));
    roadParts.push(new RoadPart(50, 350, 50, 150, 'bottom', 1, 0, 'red'));

    roadParts.forEach(roadPart => {
        roadPart.drawCollisionRectangle();
    })
}

const randomSpawnTime = time => {
    // Create a random time between 0 and time
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
    drawMonsters();
    drawHotGuns();
    shootBullet();

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
    createMonsterWave();
    createRoad();
    startGame();

    // place gun function
    // collision logic, road + guns

    canvasElement.addEventListener('click', (event) => {
        // log all this stuff to see what is happening exactly
        let canvasLeft = canvas.offsetLeft + canvas.clientLeft;
        let canvasTop = canvas.offsetTop + canvas.clientTop;
        let x = event.pageX - canvasLeft;
        let y = event.pageY - canvasTop;
    } )
})