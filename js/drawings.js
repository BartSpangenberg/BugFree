const drawRoadElement = roadElement => {
    ctx.beginPath();
    ctx.fillStyle = roadElement.color;
    ctx.fillRect(roadElement.startX, roadElement.startY, roadElement.width, roadElement.heigth);
    ctx.closePath();
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