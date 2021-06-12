const drawBoard = () => {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.closePath();
}

const drawRoadElement = roadElement => {
    ctx.beginPath();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = roadElement.color;
    ctx.fillRect(roadElement.startX, roadElement.startY, roadElement.width, roadElement.height)
    ctx.closePath();
}

const drawRoadElementCollison = roadElement => {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(roadElement.collisionX, roadElement.collisionY, roadElement.collisionSideSize, roadElement.collisionSideSize);
    ctx.closePath();
    // console.log( roadElement.collisionX, roadElement.collisionY, roadElement.collisionSideSize, roadElement.collisionSideSize )
}

const drawFullRoad = () => {
    roadParts.forEach(roadPart => {
        drawRoadElement(roadPart);
    })
}

const drawHotGuns = () => {
    hotGuns.forEach(hotGun => {
        hotGun.drawHotGun();
        hotGun.shotAnimation();
    })

};

const drawHotGunRange = (hotGun) => {
    hotGuns.forEach(hotGun => {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.globalAlpha = 0.4;
        ctx.setLineDash([5, 20]);
        ctx.strokeRect(hotGun.hotGunX - hotGun.range, hotGun.hotGunY - hotGun.range, hotGun.range * 2, hotGun.range * 2);
        ctx.closePath();
    })
}

const drawGunShots = () => {
    gunShots.forEach(gunShot => {
        if (gunShot.framesVisible > 0) {
            gunShot.animation();
            gunShot.framesVisible--; 
        }
    })
}
