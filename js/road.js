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
    roadParts.push(new RoadPart(50, 0, 50, 200, 'bottom', 1, 0, 'red'));
    roadParts.push(new RoadPart(100, 150, 250, 50, 'right', 0, -1, 'green'));
    roadParts.push(new RoadPart(300, 50, 50, 100, 'top', 1, 0, 'yellow'));
    roadParts.push(new RoadPart(350, 50, 600, 50, 'right', 0, 1, 'blue'));
    roadParts.push(new RoadPart(900, 100, 50, 350, 'bottom', -1, 0, 'purple'));
    roadParts.push(new RoadPart(650, 400, 250, 50, 'left', 0, -1, 'orange'));
    roadParts.push(new RoadPart(650, 200, 50, 200, 'top', -1, 0, 'red'));
    roadParts.push(new RoadPart(500, 200, 150, 50, 'left', 0, 1, 'yellow'));
    roadParts.push(new RoadPart(500, 250, 50, 200, 'bottom', -1, 0, 'red'));
    roadParts.push(new RoadPart(300, 400, 200, 50, 'left', 0, -1, 'yellow'));
    roadParts.push(new RoadPart(300, 300, 50, 100, 'top', -1, 0, 'red'));
    roadParts.push(new RoadPart(50, 300, 250, 50, 'left', 0, 1, 'yellow'));
    roadParts.push(new RoadPart(50, 350, 50, 150, 'bottom', 0, 1, 'red'));

    roadParts.forEach(roadPart => {
        roadPart.drawCollisionRectangle();
    })
}