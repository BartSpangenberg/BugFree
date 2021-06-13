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

    drawCollisionRectangle() {
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
    roadParts.push(new RoadPart(50, 0, 50, 200, 'bottom', 1, 0, 'blue'));
    roadParts.push(new RoadPart(100, 150, 250, 50, 'right', 0, -1, '#5D12FC'));
    roadParts.push(new RoadPart(300, 50, 50, 100, 'top', 1, 0, 'blue'));
    roadParts.push(new RoadPart(350, 50, 600, 50, 'right', 0, 1, '#5D12FC'));
    roadParts.push(new RoadPart(900, 100, 50, 350, 'bottom', -1, 0, 'blue'));
    roadParts.push(new RoadPart(650, 400, 250, 50, 'left', 0, -1, '#5D12FC'));
    roadParts.push(new RoadPart(650, 200, 50, 200, 'top', -1, 0, 'blue'));
    roadParts.push(new RoadPart(500, 200, 150, 50, 'left', 0, 1, '#5D12FC'));
    roadParts.push(new RoadPart(500, 250, 50, 200, 'bottom', -1, 0, 'blue'));
    roadParts.push(new RoadPart(300, 400, 200, 50, 'left', 0, -1, '#5D12FC'));
    roadParts.push(new RoadPart(300, 300, 50, 100, 'top', -1, 0, 'blue'));
    roadParts.push(new RoadPart(50, 300, 250, 50, 'left', 0, 1, '#5D12FC'));
    roadParts.push(new RoadPart(50, 350, 50, 150, 'bottom', 0, 1, 'blue'));

    roadParts.forEach(roadPart => {
        roadPart.drawCollisionRectangle();
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

