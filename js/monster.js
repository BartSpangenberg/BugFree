class Monster {
    constructor() {
        this.name = "Basic monster";
        this.description = "Blablabla";
        this.monsterX = 75;
        this.monsterY = 50;
        this.directionX = 0;
        this.directionY = 1;
        this.spawnTime = undefined;
        this.speed = 10;    
        this.health = 100;
        this.radius = 15;
    }

    drawMonster() {
        ctx.beginPath();
        ctx.fillStyle = 'pink';
        ctx.arc(this.monsterX, this.monsterY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
   } 
}

const moveMonster = monster => {
    monster.monsterX += monster.directionX * monster.speed;
    monster.monsterY += monster.directionY * monster.speed;
}

const checkMonsterCollision = monster => {
    // loop over roadparts
    roadParts.forEach(roadPart => {
        // Check for collision with direction change rectangle
        if ( roadPart.collisionX < monster.monsterX && monster.monsterX < roadPart.collisionX + roadPart.collisionSideSize ) {
            if ( monster.monsterY < roadPart.collisionY + roadPart.collisionSideSize && roadPart.collisionY < monster.monsterY  ) {
                monster.directionX = roadPart.directionChangeX;
                monster.directionY = roadPart.directionChangeY;
            }
        }
    })
    if (monster.monsterY > canvas.height + 30) {
        gameIsOver = true;
        console.log(gameIsOver)
    }
        // Checks for collision with end point
}


const monsterAction = () => {
    monsters.forEach(monster => {
        if (monster.spawnTime < gameTime) {
            monster.drawMonster()
            moveMonster(monster);
            checkMonsterCollision(monster);
        }
    })
}



// checkDirectionChange(this); // Where to place this object