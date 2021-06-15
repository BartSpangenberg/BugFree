class Monster {
    constructor() {
        this.monsterX = levelStartX + 25;
        this.monsterY = levelStartY;
        this.directionX = 0;
        this.directionY = 1;
        this.spawnTime = undefined;
    }

   drawHealthMeter() {
       if (!this.invisible) {
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
}


class BasicMonster extends Monster {
    constructor() {
        super();
        this.name = "Basic monster";
        this.description = "Blablabla";
        this.color = '#E5F572'
        this.speed = 2;    
        this.currentSpeed = this.speed;
        this.maxHealth = 100;
        this.health = this.maxHealth;
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
}

class BigMonster extends Monster {
    constructor() {
        super();
        this.name = "bigMonster";
        this.description = "Blablabla";
        this.color = '#5a4d41'
        this.speed = 1;    
        this.currentSpeed = this.speed;
        this.maxHealth = 5000;
        this.health = this.maxHealth;
        this.radius = 30;
        this.points = 2500;
        this.money = 250;
    }

    drawMonster() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 1;
        ctx.arc(this.monsterX, this.monsterY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
   } 
}

class SpeedMonster extends Monster {
    constructor() {
        super();
        this.name = "speedMonster";
        this.description = "Blablabla";
        this.color = '#FA8700'
        this.speed = 4;
        this.currentSpeed = this.speed;
        this.maxHealth = 500;
        this.health = this.maxHealth;
        this.radius = 18;
        this.money = 50;
    }

    drawMonster() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 1;
        ctx.arc(this.monsterX, this.monsterY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
   } 
}

class HealMonster extends Monster {
    constructor() {
        super();
        this.name = "healMonster";
        this.description = "Blablabla";
        this.color = '#00FAC3'
        this.speed = 2;    
        this.maxHealth = 750;
        this.health = this.maxHealth;
        this.currentSpeed = this.speed;
        this.radius = 15;
        this.points = 500;
        this.money = 50;
        this.healRange = 100;
        this.framesVisible = null;
        this.healInterval = 4000;
        this.healPoints = 250;
        this.randomStartTimeHealing = null;
    }

    drawMonster() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 1;
        ctx.arc(this.monsterX, this.monsterY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
   } 

   healOtherMonsters() {

        setTimeout(() => {
            setInterval(() => {
                    monsters.forEach(fellowMonster => {
                        if ( this.monsterX - this.healRange < fellowMonster.monsterX  && fellowMonster.monsterX < this.monsterX + this.healRange ) {
                            if ( this.monsterY - this.healRange < fellowMonster.monsterY  && fellowMonster.monsterY < this.monsterY + this.healRange ) {
                                if ( fellowMonster.maxHealth - this.healPoints < fellowMonster.health ) {
                                    fellowMonster.health = fellowMonster.maxHealth;
                                }
                                else {
                                    fellowMonster.health += this.healPoints;
                                }
                                this.framesVisible = 60;
                            }
                        }
                    })
            }, this.healInterval) 
        }, Math.floor(this.randomStartTimeHealing * 1000))
   }

   healAnimation(monster) {
        if (this.framesVisible > 0) {
            this.framesVisible--; 
            ctx.beginPath();
            ctx.arc(monster.monsterX, monster.monsterY, this.healRange, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(124, 252, 0, 0.3)";
            ctx.fill();
            ctx.closePath();
        }
    }   
}

class InvisibleMonster extends Monster {
    constructor() {
        super();
        this.name = "invisibleMonster";
        this.description = "Blablabla";
        this.color = 'black'
        this.speed = 2;    
        this.currentSpeed = this.speed;
        this.maxHealth = 250;
        this.health = this.maxHealth;
        this.radius = 12;
        this.points = 250;
        this.money = 35;
        this.invisible = false;
        this.timeInvisible = 3000;
        this.randomStartTimeInvisibility = null;
    }

    drawMonster() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 1;
        ctx.arc(this.monsterX, this.monsterY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
   } 

   becomeInvisbile() {

        setTimeout(() => {
            setInterval(() => {
                this.color = 'transparent';
                this.invisible = true;
                
                setTimeout(() => {
                 this.color = 'black';
                 this.invisible = false;
                }, this.timeInvisible)
            }, this.timeInvisible * 3 ) 
        }, Math.floor(this.randomStartTimeInvisibility * 1000))
    }

}

class FlyingMonster extends Monster {
    constructor() {
        super();
        this.name = "flyingMonster";
        this.description = "Blablabla";
        this.color = '#E3A640'
        this.speed = 0.75;    
        this.currentSpeed = this.speed;
        this.maxHealth = 500;
        this.health = this.maxHealth;
        this.radius = 10;
        this.points = 1000;
        this.money = 75;
        this.directionX = 0;
        this.directionY = 1;
        this.monsterX = createRandomCoordinate(canvas.width);
    }

    drawMonster() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 1;
        ctx.arc(this.monsterX, this.monsterY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
   } 
}


// Monster functions
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
                if (monster.name !== 'flyingMonster') {
                    monster.directionX = roadPart.directionChangeX;
                    monster.directionY = roadPart.directionChangeY;
                }
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
            monster.drawMonster();
            monster.drawHealthMeter();
            moveMonster(monster);
            checkMonsterCollision(monster);
            if (monster.name === 'healMonster') {
                monster.healAnimation(monster);
            }
        }
    })
}

const createMonsterWave = (monsterWave) => {
    for (let i = 0; i < monsterWave.amountOfBasicMonsters; i++) {
        let monster = new BasicMonster();
        monsters.push(monster);
    }    
    
    for (let i = 0; i < monsterWave.amountOfSpeedMonsters; i++) {
        let monster = new SpeedMonster();
        monsters.push(monster);
    }    
    
    for (let i = 0; i < monsterWave.amountOfInvisibleMonsters; i++) {
        let monster = new InvisibleMonster();
        monster.randomStartTimeInvisibility = randomTime(monsterWave.waveTime);
        monster.becomeInvisbile();
        monsters.push(monster);
    }    
    
    for (let i = 0; i < monsterWave.amountOfHealMonsters; i++) {
        let monster = new HealMonster();
        monster.randomStartTimeHealing = randomTime(monsterWave.waveTime);
        monster.healOtherMonsters();
        monsters.push(monster);
    }    
    
    for (let i = 0; i < monsterWave.amountOfBigMonsters; i++) {
        let monster = new BigMonster();
        monsters.push(monster);
    }    
    
    for (let i = 0; i < monsterWave.amountOfFlyingMonsters; i++) {
        let monster = new FlyingMonster();
        monsters.push(monster);
    }    
    
    monsters.forEach(monster => {
        monster.spawnTime = randomTime(monsterWave.waveTime)
    })

    monsters.sort((a, b) => {
        return a.spawnTime - b.spawnTime;
    })
}

const createRandomCoordinate  = pixelDistance => {
    return Math.floor(Math.random() * (pixelDistance - 50)) + 25;
}

const randomTime = time => {
    return Math.random() * time;
}

const checkIfMonsterIsAlive = (monster) => {
    if (monster.health < 0) {
        score += monster.points;
        money += monster.money;
        monsters.splice(monsters.indexOf(monster), 1);
    }
}

const setMonsterSpeed = (monster) => {
    if (monster.name === 'speedMonster') {
        monster.currentSpeed = monster.maxHealth / 2 < monster.health ? monster.speed : monster.speed * 2;
    }
    else {
        monster.currentSpeed = monster.speed;
    }
}
