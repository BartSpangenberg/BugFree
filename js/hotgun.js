class HotGun {
    constructor() {
        this.name = 'basicGun';
        this.damage = 20;
        this.range = 100; 
        this.loadingTime = 200;
        this.radius = 15;
        this.shotColor = 'red'; 
        this.cost = 100;
        this.loaded = true;
        this.hotGunX = null;
        this.hotGunY = null;
        this.framesVisible = null;
        this.targetX = undefined;
        this.targetY = undefined;
        this.dps = 1000 / this.loadingTime * this.damage;
        this.shotsPerSecond = 1000 / this.loadingTime;
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
}

class BigGun extends HotGun {
    constructor() {
        super();
        this.name = 'basicGun';
        this.damage = 20;
        this.range = 75; 
        this.loadingTime = 200;
        this.radius = 15;
        this.shotColor = 'red'; 
        this.cost = 100;
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

class DoubleGun extends HotGun {
    constructor() {
        super();
        this.name = 'doubleGun';
        this.damage = 20;
        this.range = 100; 
        this.loadingTime = 200;
        this.radius = 20;
        this.shotColor = 'yellow'; 
        this.cost = 250;
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
        this.cost = 400;
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

class Slower extends HotGun {
    constructor() {
        super();
        this.name = 'slower';
        this.damage = 0;
        this.range = 125; 
        this.loadingTime = 0;
        this.radius = 22;
        this.shotColor = 'transparent'; 
        this.cost = 750;
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
    console.log(newHotGun)
    if (newHotGun.cost <= money) {
        money -= newHotGun.cost;
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


// // Functions that apply to all guns
// const checkHotGunSpaceAvailable = (centerX, centerY, selectedHotGun) => {

//     // ?? How to get access to the selectedHotGun radius without having to create a new object first or giving it in manually?
//     // Current solution: Make if condition for every possible gun --> very inefficient
//     let corners = [];
//     let output = true;
//     // Create array for for points
//     if (selectedHotGun === 'basicGun') {
//         let radius = 15;
//         corners.push({
//             X: centerX - radius,
//             Y: centerY - radius // 25 is the radius of the basicGun
//         })    
//         corners.push({
//             X: centerX + radius,
//             Y: centerY - radius // 25 is the radius of the basicGun
//         })    
//         corners.push({
//             X: centerX + radius,
//             Y: centerY + radius // 25 is the radius of the basicGun
//         })    
//         corners.push({
//             X: centerX - radius,
//             Y: centerY + radius // 25 is the radius of the basicGun
//         })    
//     }

//     corners.forEach(corner => {
//         // check all road parts
//         roadParts.forEach(roadPart => {
//             if ( roadPart.startX <= corner.X && corner.X <= roadPart.startX + roadPart.width) {
//                 if (roadPart.startY <= corner.Y && corner.Y <= roadPart.startY + roadPart.height) {                   
//                     output = false;
//                 }
//             }
//         })
        
//         // check other guns
//         hotGuns.forEach(hotGun => {
//             if ( hotGun.hotGunX - hotGun.radius <= corner.X && corner.X <= hotGun.hotGunX + hotGun.radius) {
//                 if (hotGun.hotGunY - hotGun.radius <= corner.Y && corner.Y <= hotGun.hotGunY + hotGun.radius) {                   
//                     output = false;
//                 }
//             }
//         })

//         // WRITER CODE CHECK IF CORRNERS ARE INSIDE OF THE CANVAS
//     })
    
//     if ( corners[0].X < 0 || canvas.width < corners[1].X || corners[0].Y < 0 || canvas.height < corners[3].Y ) {
//         output = false;
//     }
//     return output;
// }

// const placeGun = (x, y, selectedGunObject) => {
//     // If there multiple hotguns, write logic to create a different hotGun based on the string value (selectedHotGun)
//     let newHotGun = null;
    
//     // sick!
//     instanceOfAllHotGuns.forEach(hotGun => {
//         if (hotGun.name === selectedGunObject) {
//             newHotGun = new hotGun.constructor();            
//         }
//     })

//     console.log(newHotGun)
//     if (newHotGun.cost <= money) {
//         money -= newHotGun.cost;
//         newHotGun.hotGunX = x;
//         newHotGun.hotGunY = y;
//         hotGuns.push(newHotGun);
//         selectedHotGun = null;
//         hotGunImage.style.display = "none";     
//     }
// }




