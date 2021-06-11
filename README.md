# Mans-Not-HotGun
[Link Deploy](http://github.com)

## Description
General description: 
In Mans Not HotGun players have to defeat a multiplicity of different monsters that try to make it to the end of the path.
Players place towers which shoot projectiles that remove the monsters.
When an object reaches the end of the road the players loses health points. 
When no health points are left the player is defeated.
When the player passes the round it can move on to the next round. (post-mvp)
For every character that is defeated the user gets a certain amount of points. (post-mvp)
The points can be spend on new guns. (post-mvp)

## MVP
MVP definition, deliverables.
- There is 1 set path (hardcoded)
- 1 type of monster moves across the path
- User can place a set amount of hotGuns
- There is only type of hotGun
- hotGun fires when monster is in range of hotGun (range can be a square in beginning)
- When a hotGun fires a animation runs the hotGun to the monster (in a thin straight line))
- hotGun always hits, no collission event between a bullet and Moster
- Monsters are removed when hitpoitns reach 0
- If all monsters are removed user wins
- If a monster makes it to the other side the user loses

## Backlog
**Extention 1: Multiple levels**
- User can go on to the next round
- An in-between screen is shown

**Extention 2: Various monsters hotGuns**
- When the user reaches a new level a new monster is introduced
- This monster is shown to the user in an in-between screen
- The monsters vary in various variables (name, description, hitpoints, appearance, shooting animation)

**Extention 3: Multiple hotGuns**
- User get starting points
- For killing monsters user get more points
- User can buy various hotGuns with various variables (name, description, damage, range)
- User can select which gun to place on the map 
- All hotguns have the same width, height but different appearance


## Data structure
**index.js**
Global variables 
Collision radius // ?? Is this available in every file?
monsters [{}]
roadPart [{}]
hotGuns [{}]
xxboardGrid [[]] --> array with arrays filled with booleans // ?? How to create boolean values for the road pieces
health = 100;

xx drawFullRoad() { drawRoadPart(), push to roadPart[] }
xx drawHotguns()
xx drawMonsters() --> if monsterSpawnTime > gameTime --> start moving the monster
xx shootBullet() { loop over monsters, loop over guns, if loades is true && within range --> decrease health ( if health monster 0 --> delte monster), set loaded to false, xx shootAnimation() }
xx deleteMonster() --> splice(); // Check if it works or not

xx gameOver() { empty all arrays, reset health }

xxcreateMonsterWave() --> variables: monsterName, amount, amountOfTimeAllMonstersSpawnIn // loops over amount, creates monsterName object, with random amountOfTimeAllMonstersSpawnIn, then pushes monster to the monsterArr[{}]
randomSpawnTime(amountOfTimeAllMonstersSpawnIn)

xxstartGame() 
xxgameInterval() -->  Runs gameInterval function that tracks gameTime

xx animate() {
  drawFullRoad()
  drawHotguns()
  drawMonsters()
  shootBullet()
}

xx eventlistener - window {
  createMonsterWave();
  startGame()
  
  eventlistener - click (for placing the hotGuns)  // How does this work? 
      checkGunSpaceAvailable()
      placeGun() --> adds the gun to gunArray
}

xx **road.js**
class RoadPart 
Variables: startX, startY, width, height, collisionSide, directionChangeX, directionChangeY, collisionX, collisionY, width, height
// Every Roadpart will have collision X, Y, width, height (which is calculated by the function)
drawPartRoad()
drawCollisionRectangle()

xx **monsters.js**
Class Monster()
drawMonster()
checkDirectionChange(this); // Where to place this object
// Brainstorm on monsterWave
// Set interval for monsters 

xx **hotguns.js**
Class HotGun()
variables: damage, range, loadingTime
checkGunSpaceAvailable() 
placeGun()
startGun() { setInterval loaded,  } // low damage
shootAnimation()


## States y States Transitions
Definition of the different states and their transition (transition functions)

**splashScreen**
Conists of game instructions
- If time left make instruction tutorial flow

**gameScreen**
The canvas + the hotGuns on the bottom
Maybe some cool images

**Between level screen**
If I have time left:
- Button to continue to next level
- New Monster that is coming in

**gameoverScreen**
Something funny

**winScreen**
Something funny


## Task
- Draw board
- Create monsterWave, Monster
- Create hotGuns
- Create shooting logic and point system
- Iterate on the Monsters, guns and animations


## Additional Links


### Trello
https://trello.com/b/fhNUvbtK/board-1


### Slides
[Link Slides.com](http://slides.com)
