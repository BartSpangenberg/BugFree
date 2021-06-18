class HotGun {
    constructor() {
        this.loaded = true;
        this.hotGunX = null;
        this.hotGunY = null;
        this.framesVisible = null;
        this.targetX = undefined;
        this.targetY = undefined;
        this.targetRadius = undefined;
        this.shotDistancePercentage = 0;
        this.shotDistancePercentageOffset = 0.2;
        this.gunAngle = 270;
        this.gunOffSet = 20;
    }

    loadGun() {
        setTimeout(() => {
            this.loaded = true;
        }, this.loadingTime)
    }

    aim(monster) {
        this.targetRadius = monster.radius;
        this.targetX = monster.monsterX;
        this.targetY = monster.monsterY;
        this.framesVisible = this.animationTime;
    }

    shoot(monster) {
        if (this.loaded) {
            if (!monster.invisible) {
                if (this.name === 'sniper') {
                    if (sniperSound.playStatus) {
                        setSoundEffectTimer(sniperSound);
                    }
                }
                else if (this.name === 'lazer') {
                    if (lazerSound.playStatus) {
                        setSoundEffectTimer(lazerSound);
                    }
                }
                else if (this.name === 'bigGun') {
                    if (basicGunSound.playStatus) {
                        setSoundEffectTimer(basicGunSound);
                    }
                }
                else if (this.name === 'doubleGun') {
                    if (quickGunSound.playStatus) {
                        setSoundEffectTimer(quickGunSound);
                    }
                }
                this.aim(monster);
                this.shotDistancePercentage = this.shotDistancePercentageOffset;
                monster.health -= this.damage;
                this.loaded = false;
                this.loadGun();
                checkIfMonsterIsAlive(monster);
            }
        }
    }

    convertDegreesToRadians(degrees)  {  
        return degrees * 0.01745;  
    }  

    drawHotGun() {
        // Draw the platform
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 5;
        ctx.shadowColor = roadShadow;
        ctx.drawImage(this.towerFoundation, this.hotGunX - this.towerFoundation.width / 2, this.hotGunY - this.towerFoundation.height / 2);  
        ctx.closePath()

        // Calculate the rotation
        this.gunAngle = Math.atan( (this.targetY - this.hotGunY ) / (this.targetX - this.hotGunX )) //- Math.PI
        if (this.targetX < this.hotGunX) {
            this.gunAngle -= 0.5 * Math.PI;
        } 
        else {
            this.gunAngle += 0.5 * Math.PI
        }

        // Draw the gun
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.save();  
        ctx.translate(this.hotGunX, this.hotGunY);  
        ctx.rotate(this.gunAngle)
        ctx.translate(-(this.hotGunX + (this.gunImage.width / 2)), -(this.hotGunY + (this.gunImage.height / 2)));  
        ctx.shadowBlur = 5;
        ctx.shadowColor = roadShadow;
        ctx.drawImage(this.gunImage, this.hotGunX, this.hotGunY);  
        ctx.restore();  
        ctx.closePath();
    }
}

class BigGun extends HotGun {
    constructor() {
        super();
        this.name = 'bigGun';
        this.damage = 15;
        this.range = 75; 
        this.loadingTime = 200;
        this.radius = 15;
        this.shotColor = 'red'; 
        this.cost = 100;
        this.animationTime = 20;
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime
        this.towerFoundation = towerFoundationBasic;
        this.gunImage = basicGunImage;
    }

    shotAnimation() {
        if (this.framesVisible > 0) {
            this.framesVisible--; 
            // ctx.beginPath();
            // ctx.globalAlpha = 1;
            // ctx.moveTo(this.hotGunX, this.hotGunY);
            // ctx.lineTo(this.targetX, this.targetY);
            // ctx.strokeStyle = this.shotColor;
            // ctx.setLineDash([0]);
            // ctx.stroke();
            // ctx.closePath();

            // Step 1: calculate distance between gun start point and radius of the monster
            this.shotDistancePercentage += 0.8 / this.animationTime;
            // this.shotDistancePercentage += (0.8 / this.animationTime) + 0.2;
            // console.elol
            let targetDistanceX = this.targetX - this.hotGunX; // - monster.radius - this.gunOffSet 
            let targetDistanceY = this.targetY -  this.hotGunY; // - monster.radius - this.gunOffSet 
            let targetDistance = Math.sqrt(Math.pow(targetDistanceX ,2) + Math.pow(targetDistanceY ,2));
            let bulletX = Math.cos(this.gunAngle - Math.PI * 0.5) * targetDistance * this.shotDistancePercentage;
            let bulletY = Math.sin(this.gunAngle - Math.PI * 0.5) * targetDistance * this.shotDistancePercentage;
                    
            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.save();  
            ctx.translate(bulletX + this.hotGunX, bulletY + this.hotGunY);  
            ctx.rotate(this.gunAngle)
            ctx.translate(-bulletX - this.hotGunX - bullet.width, -bulletY - this.hotGunY );  
            ctx.drawImage(bullet, bulletX  + this.hotGunX , bulletY + this.hotGunY);  
            ctx.restore();  
            ctx.closePath();
        }
    }
}

class QuickGun extends HotGun {
    constructor() {
        super();
        this.name = 'doubleGun';
        this.damage = 10;
        this.range = 100; 
        this.loadingTime = 100;
        this.radius = 20;
        this.shotColor = 'yellow'; 
        this.cost = 300;
        this.animationTime = 1;
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime;
        this.towerFoundation = towerFoundationQuick;
        this.gunImage = quickGunImage;
        this.gunBarrelLength = 32;
    }

    shotAnimation() {
        if (this.framesVisible > 0) {
            this.framesVisible--; 
            ctx.beginPath();
            ctx.globalAlpha = 1;
            let gunBarrelX = Math.cos(this.gunAngle - Math.PI * 0.5) * this.gunBarrelLength;
            let gunBarrelY = Math.sin(this.gunAngle - Math.PI * 0.5) * this.gunBarrelLength;
            ctx.moveTo(this.hotGunX + gunBarrelX, this.hotGunY + gunBarrelY);
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
        this.damage = 300;
        this.range = 175; 
        this.loadingTime = 2500;
        this.radius = 13;
        this.shotColor = 'red'; 
        this.cost = 500;
        this.animationTime = 10;
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime;
        this.towerFoundation = towerFoundationSniper;
        this.gunImage = sniperGunImage;
        this.gunBarrelLength = 20;
    }

    shotAnimation() {
        if (this.framesVisible > 0) {
            this.framesVisible--; 
            ctx.beginPath();
            ctx.globalAlpha = 1;
            let gunBarrelX = Math.cos(this.gunAngle - Math.PI * 0.5) * this.gunBarrelLength;
            let gunBarrelY = Math.sin(this.gunAngle - Math.PI * 0.5) * this.gunBarrelLength;
            ctx.moveTo(this.hotGunX + gunBarrelX, this.hotGunY + gunBarrelY);
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
        this.cost = 1000;
        this.animationTime = 10;  // does nothing, since shotColor is invisible
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime
        this.gunImage = gandalfImage;
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

    drawHotGun() {
        // Calculate the rotation
        this.gunAngle = Math.atan( (this.targetY - this.hotGunY ) / (this.targetX - this.hotGunX )) //- Math.PI
        if (this.targetX < this.hotGunX) {
            this.gunAngle -= 0.5 * Math.PI;
        } 
        else {
            this.gunAngle += 0.5 * Math.PI
        }

        // Draw the gun
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.save();  
        ctx.translate(this.hotGunX, this.hotGunY);  
        ctx.rotate(this.gunAngle)
        ctx.translate(-(this.hotGunX + (this.gunImage.width / 2)), -(this.hotGunY + (this.gunImage.height / 2)));  
        ctx.drawImage(this.gunImage, this.hotGunX, this.hotGunY);  
        ctx.restore();  
        ctx.closePath()
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
        this.radius = 27;
        this.shotColor = 'black'; 
        this.cost = 500;
        this.animationTime = 20;  // does nothing, since shotColor is invisible
        this.splashRange = 100;
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime;
        this.towerFoundation = towerFoundationBazooka;
        this.gunImage = bazookaGunImage;
        this.gunBarrelLength = 22;
    }

    shoot(monster) {
        if (this.loaded) {
            if (!monster.invisible) {
                // Check if other monsters are in range of this monster
                // If there are monsters in range, reduce the health of those monsters
                monsters.forEach(fellowMonster => {
                    if ( monster.monsterX - this.splashRange < fellowMonster.monsterX  && fellowMonster.monsterX < monster.monsterX + this.splashRange ) {
                        if ( monster.monsterY - this.splashRange < fellowMonster.monsterY  && fellowMonster.monsterY < monster.monsterY + this.splashRange ) {
                                fellowMonster.health -= this.damage * this.surroundingPercentage;
                                checkIfMonsterIsAlive(fellowMonster);
                        }
                    }
                })
                if (bazookaSound.playStatus) {
                    setSoundEffectTimer(bazookaSound);
                }
    
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
            let gunBarrelX = Math.cos(this.gunAngle - Math.PI * 0.5) * this.gunBarrelLength;
            let gunBarrelY = Math.sin(this.gunAngle - Math.PI * 0.5) * this.gunBarrelLength;
            ctx.moveTo(this.hotGunX + gunBarrelX, this.hotGunY + gunBarrelY);
            ctx.lineTo(this.targetX, this.targetY);
            ctx.strokeStyle = this.shotColor;
            ctx.lineCap = 'round'
            ctx.lineWidth = 4;
            ctx.setLineDash([10, 15])
            ctx.stroke();
            ctx.setLineDash([0]);
            ctx.lineWidth = 1;
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
        this.cost = 750;
        this.animationTime = 10;  
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime;
        this.towerFoundation = towerFoundationLazer;
        this.gunImage = lazerGunImage;
        this.gunBarrelLength = 23;
    }

    shotAnimation() {
        if (this.framesVisible > 0) {
            this.framesVisible--; 
            ctx.beginPath();
            ctx.globalAlpha = 1;
            let gunBarrelX = Math.cos(this.gunAngle - Math.PI * 0.5) * this.gunBarrelLength;
            let gunBarrelY = Math.sin(this.gunAngle - Math.PI * 0.5) * this.gunBarrelLength;
            ctx.moveTo(this.hotGunX + gunBarrelX, this.hotGunY + gunBarrelY);
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
        if (temporaryHotGun.name !== 'gandalf') {
            roadParts.forEach(roadPart => {
                if ( roadPart.startX <= corner.X && corner.X <= roadPart.startX + roadPart.width) {
                    if (roadPart.startY <= corner.Y && corner.Y <= roadPart.startY + roadPart.height) {                   
                        output = false;
                    }
                }
            })
        }
        
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
        if (newHotGun.name === 'gandalf') {
            if (gandalfPlaced) {
                alert('There is only 1 Gandalf!')
                return 0;
            }
            else {
                gandalfPlaced = true;
            }
        }
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
                        monster.currentSpeed = monster.speed * speedChangeGandalf;
                        if (gandalfSound.playStatus) {
                            setSoundEffectTimer(gandalfSound)
                        }
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
