class RoadPart {
    constructor(startX, startY, width, height, collisionSide, directionChangeX, directionChangeY, color) {
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.heigth = height;
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
            this.collisionX = this.startX + this.width - collisionOffSet - ( height + 2 * collisionOffSet );
            this.collisionY = this.startY + collisionOffSet;
            this.collisionSideSize = height - 2 * collisionOffSet;
        }
        if (this.collisionSide === 'left') {
            this.collisionX = this.startX + collisionOffSet;
            this.collisionY = this.startY + collisionOffSet;
            this.collisionSideSize = height - 2 * collisionOffSet;
        }
        if (this.collisionSide === 'top') {
            this.collisionX = this.startX + collisionOffSet;
            this.collisionY = this.startY + collisionOffSet;
            this.collisionSideSize = width - 2 * collisionOffSet;
        }
        if (this.collisionSide === 'bottom') {
            this.collisionX = this.startX + collisionOffSet;
            this.collisionY = this.startY + this.height - collisionOffSet - ( width + 2 * collisionOffSet );
            this.collisionSideSize = width - 2 * collisionOffSet;
        }
    }
}



// xx **road.js**
// class RoadPart 
// Variables: startX, startY, width, height, collisionSide, directionChangeX, directionChangeY, collisionX, collisionY, width, height
// // Every Roadpart will have collision X, Y, width, height (which is calculated by the function)
// drawPartRoad()
// drawCollisionRectangle()