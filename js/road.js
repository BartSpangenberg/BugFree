class RoadPart {
    constructor(startX, startY, width, height, collisionSide, directionChangeX, directionChangeY, color) {
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
        this.collisionSide = collisionSide;
        this.directionChangeX = directionChangeX;
        this.directionChangeY = directionChangeY;
        this.color = color;
        this.collisionX = null;
        this.collisionY = null;
        this.collisionSideSize = null;
    }

    createCollisionRectangle() {
        if (this.collisionSide === 'right') {
            this.collisionX = this.startX + this.width - collisionOffSet - ( this.height - 2 * collisionOffSet );
            this.collisionY = this.startY + collisionOffSet;
            this.collisionSideSize = this.height - 2 * collisionOffSet;
        }
        if (this.collisionSide === 'left') {
            this.collisionX = this.startX + collisionOffSet;
            this.collisionY = this.startY + collisionOffSet;
            this.collisionSideSize = this.height - 2 * collisionOffSet;
        }
        if (this.collisionSide === 'top') {
            this.collisionX = this.startX + collisionOffSet;
            this.collisionY = this.startY + collisionOffSet;
            this.collisionSideSize = this.width - 2 * collisionOffSet;
        }
        if (this.collisionSide === 'bottom') {
            this.collisionX = this.startX + collisionOffSet;
            this.collisionY = this.startY + this.height - ( this.width - 2 * collisionOffSet ) - collisionOffSet;
            this.collisionSideSize = this.width - 2 * collisionOffSet;
        }
    }
}

const createRoad = () => {    
    roadLevels[level -  1].forEach(roadPart => {
        roadParts.push(new RoadPart(roadPart.startX, roadPart.startY, roadPart.width, roadPart.height, roadPart.collisionSide, roadPart.directionChangeX, roadPart.directionChangeY, roadPart.color))
    })

    roadParts.forEach(roadPart => {
        roadPart.createCollisionRectangle();
    })
}

const drawMonsterPit = () => {

    ctx.beginPath();
    ctx.setLineDash([0]);
    ctx.strokeStyle = '#cf1020';
    ctx.arc(levelStartX + 25, levelStartY + 25, 24, 0, 2 * Math.PI);
    ctx.globalAlpha = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(levelStartX + 25, levelStartY + 25, 19, 0, 2 * Math.PI);
    ctx.globalAlpha = 0.8;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(levelStartX + 25, levelStartY + 25, 14, 0, 2 * Math.PI);
    ctx.globalAlpha = 0.7;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(levelStartX + 25, levelStartY + 25, 10, 0, 2 * Math.PI);
    ctx.globalAlpha = 0.6;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(levelStartX + 25, levelStartY + 25, 8, 0, 2 * Math.PI);
    ctx.globalAlpha = 0.4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(levelStartX + 25, levelStartY + 25, 7, 0, 2 * Math.PI);
    ctx.globalAlpha = 0.3;
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle =  "red";
    ctx.globalAlpha = 0.3;
    ctx.arc(levelStartX + 25, levelStartY + 25, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

}

const drawHeatChamber = () => {
}

