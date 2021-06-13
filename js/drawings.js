const drawBoard = () => {
    ctx.beginPath();
    ctx.fillStyle = bgColor;
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
    drawMonsterPit();
    drawHeatChamber();
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

const drawAllBoards = () => {
    calculateDps();
    calculateShotsPerSecond();
    calculateOneShotDamage();
    drawScoreBoard();
    drawGunStats();
    drawBoard();
}

const drawScoreBoard = () => {
    ctxStats.beginPath();
    ctxStats.fillStyle = bgColor;
    ctxStats.fillRect(0, 0, canvasStatsElement.width, canvasStatsElement.height);
    ctxStats.font = '20px Arial';
    
    ctxStats.fillStyle = textColor;
    ctxStats.fillText(`Level:`, 20, 30);
    ctxStats.fillText(`Score:`, 200, 30);
    ctxStats.fillText(`Highscore:`, 400, 30);
    ctxStats.fillText(`Wave:`, 650, 30);
    ctxStats.font = '20px Arial';

    ctxStats.fillStyle = statColor;
    ctxStats.fillText(`#${level}`, 85, 30);
    ctxStats.fillText(`${score} points`, 270, 30);
    ctxStats.fillText(`${highScore} points`, 505, 30);
    ctxStats.fillText(`#${wave}`, 720, 30);
    ctxStats.closePath();
}

const drawGunStats = () => {
    ctxGuns.beginPath();
    ctxGuns.fillStyle = bgColor;
    ctxGuns.fillRect(0, 0, canvasGunElement.width, canvasGunElement.height);
    ctxGuns.fillStyle = textColor;
    ctxGuns.font = '20px Arial';
    ctxGuns.fillStyle = textColor;
    ctxGuns.fillText(`Money:`, 30, 40);
    ctxGuns.fillText(`Damage per second:`, 250, 40);
    ctxGuns.fillText(`Shots per second:`, 700, 40);
    ctxGuns.fillText(`Combined 1 shot damage:`, 250, 70);
    ctxGuns.fillText(`Arsenal value:`, 700, 70);
    
    ctxGuns.fillStyle = statColor;
    ctxGuns.fillText(`${money} $`, 105, 40);
    ctxGuns.fillText(`${dps} damage`, 500, 40);
    ctxGuns.fillText(`${shotsPerSecond} shots`, 875, 40);
    ctxGuns.fillText(`${oneShotDamage} damage`, 500, 70);
    ctxGuns.fillText(`${oneShotDamage} $`, 875, 70);
    

    ctxGuns.closePath();
}

