class HotGun {
    constructor() {
        this.loaded = true;
        this.hotGunX = null;
        this.hotGunY = null;
        this.framesVisible = null;
        this.targetX = undefined;
        this.targetY = undefined;
    }

    loadGun() {
        setTimeout(() => {
            this.loaded = true;
        }, this.loadingTime)
    }

    aim(monster) {
        this.targetX = monster.monsterX;
        this.targetY = monster.monsterY;
        this.framesVisible = this.animationTime;
    }

    shoot(monster) {
        if (this.loaded) {
            if (!monster.invisible) {
                this.aim(monster);
                monster.health -= this.damage;
                this.loaded = false;
                this.loadGun();
                checkIfMonsterIsAlive(monster);
            }
        }
    }
}

class BigGun extends HotGun {
    constructor() {
        super();
        this.name = 'bigGun';
        this.damage = 10;
        this.range = 75; 
        this.loadingTime = 300;
        this.radius = 15;
        this.shotColor = 'red'; 
        this.cost = 100;
        this.animationTime = 20;
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime
    }

    drawHotGun() {
        ctx.beginPath();
        ctx.fillStyle = '#39FF14';
        ctx.globalAlpha = 0.9;
        ctx.arc(this.hotGunX, this.hotGunY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    shotAnimation() {
        if (this.framesVisible > 0) {
            this.framesVisible--; 
            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.moveTo(this.hotGunX, this.hotGunY);
            ctx.lineTo(this.targetX, this.targetY);
            ctx.strokeStyle = this.shotColor;
            ctx.setLineDash([0]);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

class QuickGun extends HotGun {
    constructor() {
        super();
        this.name = 'doubleGun';
        this.damage = 5;
        this.range = 100; 
        this.loadingTime = 100;
        this.radius = 20;
        this.shotColor = 'yellow'; 
        this.cost = 250;
        this.animationTime = 1;
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime
    }

    drawHotGun() {
        ctx.beginPath();
        ctx.fillStyle = '#C132FC';
        ctx.globalAlpha = 0.9;
        ctx.arc(this.hotGunX, this.hotGunY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }  

    shotAnimation() {
        if (this.framesVisible > 0) {
            this.framesVisible--; 
            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.moveTo(this.hotGunX, this.hotGunY);
            ctx.lineTo(this.targetX, this.targetY);
            ctx.strokeStyle = this.shotColor;
            ctx.setLineDash([0]);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

class Sniper extends HotGun {
    constructor() {
        super();
        this.name = 'sniper';
        this.damage = 500;
        this.range = 200; 
        this.loadingTime = 1000;
        this.radius = 10;
        this.shotColor = 'red'; 
        this.cost = 25;
        this.animationTime = 30;
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime
    }

    drawHotGun() {
        ctx.beginPath();
        ctx.fillStyle = '#FAD51F';
        ctx.globalAlpha = 0.9;
        ctx.arc(this.hotGunX, this.hotGunY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }  

    shotAnimation() {
        if (this.framesVisible > 0) {
            this.framesVisible--; 
            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.moveTo(this.hotGunX, this.hotGunY);
            ctx.lineTo(this.targetX, this.targetY);
            ctx.strokeStyle = this.shotColor;
            ctx.setLineDash([0]);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

class Gandalf extends HotGun {
    constructor() {
        super();
        this.name = 'gandalf';
        this.damage = 0;
        this.range = 75; 
        this.loadingTime = 500;
        this.radius = 22;
        this.shotColor = 'transparent'; 
        this.cost = 100;
        this.animationTime = 10;  // does nothing, since shotColor is invisible
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime
    }

    drawHotGun() {
        ctx.beginPath();
        ctx.fillStyle = '#20FAF0';
        ctx.globalAlpha = 0.9;
        ctx.arc(this.hotGunX, this.hotGunY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    shotAnimation() {
        if (this.framesVisible > 0) {
            this.framesVisible--; 
            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.moveTo(this.hotGunX, this.hotGunY);
            ctx.lineTo(this.targetX, this.targetY);
            ctx.strokeStyle = this.shotColor;
            ctx.setLineDash([0]);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

class Bazooka extends HotGun {
    constructor() {
        super();
        this.name = 'bazooka';
        this.damage = 500;
        this.surroundingPercentage = 0.2;
        this.range = 125; 
        this.loadingTime = 3000;
        this.radius = 22;
        this.shotColor = 'red'; 
        this.cost = 100;
        this.animationTime = 30;  // does nothing, since shotColor is invisible
        this.splashRange = 100;
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime
    }

    drawHotGun() {
        ctx.beginPath();
        ctx.fillStyle = '#20FAF0';
        ctx.globalAlpha = 0.9;
        ctx.arc(this.hotGunX, this.hotGunY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }  

    shoot(monster) {
        if (this.loaded) {
            if (!monster.invisible) {
                // Check if other monsters are in range of this monster
                // IF there are monsters in range, reduce the health of those monsters
                monsters.forEach(fellowMonster => {
                    if ( monster.monsterX - this.splashRange < fellowMonster.monsterX  && fellowMonster.monsterX < monster.monsterX + this.splashRange ) {
                        if ( monster.monsterY - this.splashRange < fellowMonster.monsterY  && fellowMonster.monsterY < monster.monsterY + this.splashRange ) {
                                fellowMonster.health -= this.damage * this.surroundingPercentage;
                                checkIfMonsterIsAlive(fellowMonster);
                        }
                    }
                })
    
                this.aim(monster);
                monster.health -= this.damage;
                this.loaded = false;
                this.loadGun();
                checkIfMonsterIsAlive(monster);
            }
        }
    }

    shotAnimation() {
        if (this.framesVisible > 0) {
            this.framesVisible--; 
            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.moveTo(this.hotGunX, this.hotGunY);
            ctx.lineTo(this.targetX, this.targetY);
            ctx.strokeStyle = this.shotColor;
            ctx.setLineDash([0]);
            ctx.stroke();
            ctx.closePath();
            // splash damage
            ctx.beginPath();
            ctx.arc(this.targetX, this.targetY, this.splashRange, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255, 99, 71, 0.3)";
            ctx.fill();
            ctx.closePath();
            ctx.globalAlpha = 1;
        }
    }
}

class Lazer extends HotGun {
    constructor() {
        super();
        this.name = 'lazer';
        this.damage = 5;
        this.range = 125; 
        this.loadingTime = 5;
        this.radius = 22;
        this.shotColor = 'red'; 
        this.cost = 100;
        this.animationTime = 10;  
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime
    }

    drawHotGun() {
        ctx.beginPath();
        ctx.fillStyle = '#20FAF0';
        ctx.globalAlpha = 0.9;
        ctx.arc(this.hotGunX, this.hotGunY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }  

    shotAnimation() {
        if (this.framesVisible > 0) {
            this.framesVisible--; 
            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.moveTo(this.hotGunX, this.hotGunY);
            ctx.lineTo(this.targetX, this.targetY);
            ctx.strokeStyle = this.shotColor;
            ctx.lineWidth = 3;
            ctx.setLineDash([0]);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.closePath();
        }
    }
}




// Functions that apply to all guns
const createTemporaryHotGunObject = () => {
    let temporaryHotGun = null;
    
    // sick!
    instanceOfAllHotGuns.forEach(hotGun => {
        if (hotGun.name === selectedHotGun) {
            temporaryHotGun = new hotGun.constructor();            
        }
    })
    return temporaryHotGun
}


const checkHotGunSpaceAvailable = (centerX, centerY, temporaryHotGun) => {
    let corners = [];
    let output = true;

    corners.push({
        X: centerX - temporaryHotGun.radius,
        Y: centerY - temporaryHotGun.radius 
    })
    corners.push({
        X: centerX + temporaryHotGun.radius,
        Y: centerY - temporaryHotGun.radius 
    })    
    corners.push({
        X: centerX + temporaryHotGun.radius,
        Y: centerY + temporaryHotGun.radius 
    })    
    corners.push({
        X: centerX - temporaryHotGun.radius,
        Y: centerY + temporaryHotGun.radius 
    })    

    corners.forEach(corner => {
        // check all road parts
        roadParts.forEach(roadPart => {
            if ( roadPart.startX <= corner.X && corner.X <= roadPart.startX + roadPart.width) {
                if (roadPart.startY <= corner.Y && corner.Y <= roadPart.startY + roadPart.height) {                   
                    output = false;
                }
            }
        })
        
        // check other guns
        hotGuns.forEach(hotGun => {
            if ( hotGun.hotGunX - hotGun.radius <= corner.X && corner.X <= hotGun.hotGunX + hotGun.radius) {
                if (hotGun.hotGunY - hotGun.radius <= corner.Y && corner.Y <= hotGun.hotGunY + hotGun.radius) {                   
                    output = false;
                }
            }
        })
    })
    
    // Check corners canvas
    if ( corners[0].X < 0 || canvas.width < corners[1].X || corners[0].Y < 0 || canvas.height < corners[3].Y ) {
        output = false;
    }
    return output;
}

const placeGun = (x, y, newHotGun) => {
    if (newHotGun.cost <= money) {
        money -= newHotGun.cost;
        arsenalValue += newHotGun.cost;
        newHotGun.hotGunX = x;
        newHotGun.hotGunY = y;
        hotGuns.push(newHotGun);
        userIsPlacingGun = false;
        hotGunImage.style.display = "none";     
    }
}

const checkRange = () => {
    let output = false;
    monsters.forEach(monster => {
        
        setMonsterSpeed(monster);

        hotGuns.forEach(hotGun => {
            if ( hotGun.hotGunX - hotGun.range < monster.monsterX && monster.monsterX < hotGun.hotGunX + hotGun.range ) {
                if ( hotGun.hotGunY - hotGun.range < monster.monsterY && monster.monsterY < hotGun.hotGunY + hotGun.range ) {
                    if (hotGun.name === 'gandalf') {
                        monster.currentSpeed = monster.speed * 0.2;
                    }
                    else {
                        hotGun.shoot(monster);
                    }
                }
            }
        })
    })
    return output
}
