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

