class Monster {
    constructor() {
        this.name = "Basic monster";
        this.description = "Blablabla";
        this.monsterX = levelStartX + 25;
        this.monsterY = levelStartY;
        this.directionX = 0;
        this.directionY = 1;
        this.spawnTime = undefined;
        this.color = '#F58B36'
        this.speed = 2;    
        this.currentSpeed = this.speed;
        this.health = 100;
        this.maxHealth = 100;
        this.radius = 15;
        this.points = 100;
        this.money = 25;
    }

    drawMonster() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 1;
        ctx.arc(this.monsterX, this.monsterY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
   } 

   drawHealthMeter() {
        ctx.beginPath();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = healthMeterBgColor;
        ctx.fillRect(this.monsterX - this.radius, this.monsterY - 1.5 * this.radius, this.radius*2 ,  1 / 3 * this. radius);
        ctx.fill();
        ctx.fillStyle = healthMeterColor;
        ctx.fillRect(this.monsterX - this.radius, this.monsterY - 1.5 * this.radius, this.health * this.radius * 2 / this.maxHealth,  1 / 3 * this. radius);
        ctx.fill();
        ctx.closePath();
   }
}

const moveMonster = monster => {
    monster.monsterX += monster.directionX * monster.currentSpeed;
    monster.monsterY += monster.directionY * monster.currentSpeed;
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
    }
        // Checks for collision with end point
}

const monsterAction = () => {
    monsters.forEach(monster => {
        if (monster.spawnTime < gameTime) {
            monster.drawMonster()
            monster.drawHealthMeter();
            moveMonster(monster);
            checkMonsterCollision(monster);
        }
    })
}

const createMonsterWave = (monsterWave) => {
    for (let i = 0; i < monsterWave.amountOfNormalMonsters; i++) {
        let monster = new Monster
        monster.spawnTime = randomSpawnTime(monsterWave.waveTime);
        monsters.push(monster);
    }    
    monsters.sort((a, b) => {
        return a.spawnTime - b.spawnTime;
    })
}

const randomSpawnTime = time => {
    return Math.random() * time;
}

const checkIfMonsterIsAlive = (monster) => {
    if (monster.health < 0) {
        score += monster.points;
        money += monster.money;
        monsters.splice(monsters.indexOf(monster), 1);
    }
}
