const drawRoadElement = roadElement => {
    ctx.beginPath();
    ctx.fillStyle = roadElement.color;
    ctx.fillRect(roadElement.startX, roadElement.startY, roadElement.width, roadElement.height)
    ctx.closePath();
}

// Work on this
const drawRoadElementCollison = roadElement => {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(roadElement.collisionX, roadElement.collisionY, roadElement.collisionSideSize, roadElement.collisionSideSize);
    ctx.closePath();
    // console.log( roadElement.collisionX, roadElement.collisionY, roadElement.collisionSideSize, roadElement.collisionSideSize )
}

const drawFullRoad = () => {
    roadParts.forEach(roadPart => {
        drawRoadElement(roadPart);
    })
}

const drawMonsters = () => {

}

const drawHotGuns = () => {

};

const drawShootAnimation = () => {
    // Optional, first make the game work
}