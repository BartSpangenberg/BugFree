const drawBoard = () => {
    ctx.beginPath();
    ctx.fillStyle = bgColor;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.closePath();
}

// changes made
const drawRoadElementBackground = roadElement => {
    ctx.beginPath();
    // ctx.setLineDash([0]);
    ctx.shadowBlur = 2;
    ctx.shadowColor = roadShadow;
    ctx.stroke();
    ctx.lineWidth = 10;
    ctx.strokeStyle = roadEdgeColor;
    ctx.strokeRect(roadElement.startX, roadElement.startY, roadElement.width, roadElement.height)
    ctx.fillRect(roadElement.startX, roadElement.startY, roadElement.width, roadElement.height)
    ctx.closePath();
    // ctx.shadowBlur = 0;
}



const drawRoadElement = roadElement => {
    ctx.beginPath();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.fillStyle = roadColor;
    ctx.fillRect(roadElement.startX, roadElement.startY, roadElement.width, roadElement.height)
    ctx.closePath();
}

const drawRoadElementCollison = roadElement => {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(roadElement.collisionX, roadElement.collisionY, roadElement.collisionSideSize, roadElement.collisionSideSize);
    ctx.closePath();
}

const drawFullRoad = () => {
    roadParts.forEach(roadPart => {
        drawRoadElementBackground(roadPart);
    })
    roadParts.forEach(roadPart => {
        drawRoadElement(roadPart);
    })
    // drawMonsterPit();
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

const clearBoard = () => {
    ctxStats.clearRect(0, 0, canvasStatsElement.width, canvasStatsElement.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctxGuns.clearRect(0, 0, canvasGunElement.width, canvasGunElement.height)
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
    ctxStats.fillStyle = textColor;
    ctxStats.font = 'bold 30px Gugi';
    ctxStats.fillText(`Level:`, 20, 30);
    ctxStats.fillStyle = statColor;
    ctxStats.fillText(`#${level}`, 115, 30);

    ctxStats.fillStyle = textColor;
    ctxStats.font = 'bold 20px Gugi';
    ctxStats.fillText(`Score:`, 200, 30);
    ctxStats.fillText(`Highscore:`, 410, 30);
    ctxStats.fillText(`Wave:`, 660, 30);
    ctxStats.font = 'bold20px Gugi';

    ctxStats.fillStyle = statColor;
    ctxStats.fillText(`${score}`, 270, 30);
    ctxStats.fillText(`${highScore}`, 520, 30);
    ctxStats.fillText(`#${wave}`, 730, 30);
    ctxStats.closePath();
}

const drawGunStats = () => {
    ctxGuns.beginPath();
    ctxGuns.fillStyle = bgColor;
    ctxGuns.fillRect(0, 0, canvasGunElement.width, canvasGunElement.height);
    ctxGuns.fillStyle = textColor;
    ctxGuns.font = 'bold 30px Gugi';
    ctxGuns.fillStyle = textColor;
    ctxGuns.fillText(`Money:`, 40, 40);
    ctxGuns.fillStyle = statColor;
    ctxGuns.fillText(`${money} $`, 38, 80);

    ctxGuns.font = 'bold 20px Gugi';
    ctxGuns.fillStyle = textColor;
    ctxGuns.fillText(`Damage per second:`, 220, 40);
    ctxGuns.fillText(`Shots per second:`, 650, 40);
    ctxGuns.fillText(`Combined 1 shot damage:`, 220, 70);
    ctxGuns.fillText(`Arsenal value:`, 650, 70);
    
    ctxGuns.fillStyle = statColor;
    ctxGuns.fillText(`${Math.round(dps)} dmg`, 480, 40);
    ctxGuns.fillText(`${Math.ceil(shotsPerSecond)} shots`, 835, 40);
    ctxGuns.fillText(`${oneShotDamage} dmg`, 480, 70);
    ctxGuns.fillText(`${arsenalValue} $`, 835, 70);
    
    ctxGuns.closePath();
}

