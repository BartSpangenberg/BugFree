class Hotgun {
    constructor() {
        this.name = 'Basic hotGun';
        this.damage = 100;
        this.range = 100; 
        this.loadingTime = 200;
        this.loaded = true;
        this.hotGunX = null;
        this.hotGunY = null;
        this.radius = 15;
        this.shotColor = 'red'; 
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
        this.framesVisible = 10;
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

const checkHotGunSpaceAvailable = (centerX, centerY, selectedHotGun) => {
    // ?? How to get access to the selectedHotGun radius without having to create a new object first or giving it in manually?
    // Current solution: Make if condition for every possible gun --> very inefficient
    let corners = [];
    let output = true;
    // Create array for for points
    if (selectedHotGun === 'basicGun') {
        let radius = 15;
        corners.push({
            X: centerX - radius,
            Y: centerY - radius // 25 is the radius of the basicGun
        })    
        corners.push({
            X: centerX + radius,
            Y: centerY - radius // 25 is the radius of the basicGun
        })    
        corners.push({
            X: centerX + radius,
            Y: centerY + radius // 25 is the radius of the basicGun
        })    
        corners.push({
            X: centerX - radius,
            Y: centerY + radius // 25 is the radius of the basicGun
        })    
    }

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
    return output;
}

const placeGun = (x, y, selectedHotGun) => {
    // If there multiple hotguns, write logic to create a different hotGun based on the string value (selectedHotGun)
    let hotGun = null;
    if (selectedHotGun === 'basicGun') {
        hotGun = new Hotgun; // can I put the arguments name in the location of HotGun somehow? or do I need to create conditions for all of them
    }
    hotGun.hotGunX = x;
    hotGun.hotGunY = y;
    hotGuns.push(hotGun);
}

const checkRange = () => {
    let output = false;
    monsters.forEach(monster => {
        hotGuns.forEach(hotGun => {
            if ( hotGun.hotGunX - hotGun.range < monster.monsterX && monster.monsterX < hotGun.hotGunX + hotGun.range ) {
                if ( hotGun.hotGunY - hotGun.range < monster.monsterY && monster.monsterY < hotGun.hotGunY + hotGun.range ) {
                    shootBullet(monster, hotGun);
                }
            }
        })
    })
    return output
}

const shootBullet = (monster, hotGun) => {

    if (hotGun.loaded) {
        // Change values
        monster.health -= hotGun.damage;
        hotGun.loaded = false;
        // console.log('Gun Fired', monster.health)
        hotGun.loadGun();
        checkIfMonsterIsAlive(monster);
        hotGun.aim(monster);
    }
}


