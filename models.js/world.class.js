class World {
  character = new Character();
  characterIsDead = false;
  level = level1;
  endBoss = level1.endBoss;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  allowNewBottleThrow = true;
  healthStatus = new StatusBarHealth();
  bottleStatus = new StatusBarBottle();
  coinStatus = new StatusbarCoin();
  throwableObjects = [];
  bottleAmount = 0;
  coinAmount = 0;
  hasWonTheGame = false;

  /**
   * Class representing the game world.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.world = this;
  }

  /**
   * Sets the world property of the character.
   */
  setWorld() {
    this.character.world = this;
    this.endBoss.forEach(boss => boss.world = this);
  }

  /**
   * Starts the game loop.
   */
  run() {
    this.gameInterval = setInterval(() => {
      this.checkEnemyCollisions();
      this.checkCollisionWithObject();
      this.checkCollisionWithCoins();
      this.checkThrowObjects();
      this.checkThrowCollisions();
      this.checkGameOver()
    }, 150);
    this.jumpInterval = setInterval(() => {
      this.jumpOnChicken();
    
    }, 10);
    this.endBoss.forEach(boss => boss.animate());
    playBackgroundSound()
  }

  /**
   * Asynchronous function 'wait' that returns a Promise resolving after a specified number of milliseconds ('ms') using setTimeout
   */
  async wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * Asynchronous function 'checkGameOver' that checks if the game is over based on character energy or end boss status, waits 300ms, and then ends the game or sets the win status accordingly
   */
  async checkGameOver(){

    if(this.character.energy <= 0){
      await this.wait(300)
      this.endGame();
    } else if (this.endBoss.every((boss) => boss.isDead)){
      await this.wait(300)
      this.hasWonTheGame = true;
      
      this.endGame();
    }
  }

/**
   * Function 'endGame' that clears all intervals related to the end boss, character, and game, sets gameOver to true, and displays the game over screen
   */
  endGame() {
    clearInterval(this.endBoss.forEach(boss => boss.endBossStateInterval));
    clearInterval(this.endBoss.forEach(boss => boss.walkInterval));
    clearInterval(this.endBoss.forEach(boss => boss.moveInterval));
    clearInterval(this.character.moveInterval)
    clearInterval(this.character.playInterval)
    clearInterval(this.gameInterval);
    clearInterval(this.jumpInterval);
    this.gameOver = true;
    this.displayGameOverScreen();
  }

  /**
   * Displays the game over screen.
   */
  displayGameOverScreen() {
    const gameOverScreen = document.getElementById('game-over-screen');
    gameOverScreen.style.display = 'flex';
    gameOverScreen.classList.add(this.hasWonTheGame ? 'win': 'lose');
    pauseEndbossAreaSound()
    pauseBackgroundSound()
    if(this.hasWonTheGame){
      winSound();
    } else {
      lostSound()
    }
  }

  /**
   * Checks for throwable objects and throws them if conditions are met.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottleAmount > 0 && this.allowNewBottleThrow) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      bottle.throw(this.character.otherDirection);
      this.throwableObjects.push(bottle);
      this.character.bottleAmount--;
      this.bottleStatus.setPercentageBottles(this.character.bottleAmount);
      this.allowNewBottleThrow = false; // Disable throwing
      setTimeout(() => {
        this.allowNewBottleThrow = true; // Enable throwing after 2 seconds
      }, 2000);
    }
  }

  /**
   * Checks collisions of thrown objects with enemies and ground.
   */
  checkThrowCollisions() {
    this.throwableObjects.forEach((ThrowableObject) => {
      if (this.bottleHitsGround(ThrowableObject)) this.bottleTouchGround(ThrowableObject, this.allowNewBottleThrow);

      this.level.enemies.forEach((enemy) => {
        if (this.bottleHitChicken(enemy, ThrowableObject)) this.bottleHittingChicken(enemy, ThrowableObject, this.allowNewBottleThrow);
      });

      this.level.endBoss.forEach((endBoss) => {
        if (this.bottleHitEndBoss(endBoss, ThrowableObject)) this.bottleHittingEndBoss(endBoss, ThrowableObject, this.allowNewBottleThrow);
      });
    });
  }

  /**
   * Checks if the thrown bottle hits the ground.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @returns {boolean} - True if bottle hits ground, otherwise false.
   */
  bottleHitsGround(ThrowableObject) {
    return !ThrowableObject.isAboveGround();
  }

  /**
   * Handles the situation when a thrown bottle hits the ground.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @param {boolean} allowNewBottleThrow - Indicates if throwing a new bottle is allowed.
   */
  bottleTouchGround(ThrowableObject) {
    ThrowableObject.splashingBottle();
    this.removeThrownBottle(ThrowableObject);
  }

  /**
   * Checks if the thrown bottle hits a chicken enemy.
   * @param {Enemy} enemy - The chicken enemy.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @returns {boolean} - True if bottle hits chicken, otherwise false.
   */
  bottleHitChicken(enemy, ThrowableObject) {
    return enemy.isColliding(ThrowableObject);
  }

  /**
   * Handles the situation when a thrown bottle hits a chicken enemy.
   * @param {Enemy} enemy - The chicken enemy.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @param {boolean} allowNewBottleThrow - Indicates if throwing a new bottle is allowed.
   */
  bottleHittingChicken(enemy, ThrowableObject, allowNewBottleThrow) {
    ThrowableObject.splashingBottle(ThrowableObject);
    enemy.deadChickenAnimation();
    this.killChicken(enemy);
    this.removeDeadChicken(enemy);

  }

  /**
   * Checks if the thrown bottle hits the end boss.
   * @param {EndBoss} endBoss - The end boss.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @returns {boolean} - True if bottle hits end boss, otherwise false.
   */
  bottleHitEndBoss(endBoss, ThrowableObject) {
    return endBoss.isColliding(ThrowableObject);
  }

  /**
   * Handles the situation when a thrown bottle hits the end boss.
   * @param {EndBoss} endBoss - The end boss.
   * @param {ThrowableObject} ThrowableObject - The thrown object.
   * @param {boolean}  - Indicates if throwing a new bottle is allowed.
   */
  bottleHittingEndBoss(endBoss, ThrowableObject, allowNewBottleThrow) {
    if (ThrowableObject.hasHit) return; // Prevent multiple hits
    ThrowableObject.hasHit = true; // Mark the bottle as having hit

    if(allowNewBottleThrow){
      return
    }
    ThrowableObject.splashingBottle();
    this.removeThrownBottle(ThrowableObject);
    
    endBoss.endBossIsHit();
    ThrowableObject.speedY = 0;
    ThrowableObject.speedX = 0;
  }

  /**
   * Removes a thrown bottle from the list of throwable objects after a delay.
   * @param {ThrowableObject} ThrowableObject - The thrown object to be removed.
   */
  removeThrownBottle(ThrowableObject) {
    setTimeout(() => {
      let index = this.throwableObjects.indexOf(ThrowableObject);
      if (index !== -1) this.throwableObjects.splice(index, 1);
    }, 150);
  }

  /**
   * Checks for the collection of bottles by the character.
   */
  checkCollisionWithObject() {
    this.level.bottles.forEach((bottles, index) => {
      if (this.character.isColliding(bottles)) {
        this.character.bottleAmount++;
        this.bottleStatus.setPercentageBottles(this.character.bottleAmount);
        this.removeCollectedObject(index);
      }
    });
  }

   /**
   * Checks for the collection of coins by the character.
   */
  checkCollisionWithCoins() {
      this.level.coins.forEach((coins, index) => {
        if (this.character.isColliding(coins)) {
          this.character.coinAmount++;
          this.coinStatus.setPercentageCoins(this.character.coinAmount);
          this.removeCollectedCoins(index);
        }
      });
  }

  /**
   * Removes the collected bottle from the level.
   * @param {number} index - The index of the collected object.
   */
  removeCollectedObject(index) {
    this.level.bottles.splice(index, 1);
    takeBottleSound();
  }

  /**
   * Removes the collected coin from the level.
   * @param {number} index - The index of the collected object.
   */
  removeCollectedCoins(index) {
    this.level.coins.splice(index, 1);
    takeCoinSound();
  }

  /**
   * Checks collisions between the character and enemies.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.characterCollidingWithEnemy(enemy)) this.checkCollisionsWithEnemy();
    });
    this.level.endBoss.forEach((endBoss) => {
      if (this.characterCollidingWithEndBoss(endBoss)) this.checkCollisionsWithEnemy();
    });
  }

  /**
   * Checks if the character is colliding with an enemy.
   * @param {Enemy} enemy - The enemy to check collision with.
   * @returns {boolean} - True if collision detected, otherwise false.
   */
  characterCollidingWithEnemy(enemy) {
    return (
      this.character.isColliding(enemy) && !enemy.chickenIsDead && ((!this.character.isAboveGround() && this.character.energy > 0) || this.character.isJumpingUp() || !this.character.isWalking())
    );
  }

  /**
   * Handles character collision with enemy.
   */
  checkCollisionsWithEnemy() {  // characterCollidedWithEnemy()
    this.character.hit();
   if( this.character.energy <=0){
         return this.endGame()
   }
    this.healthStatus.setPercentage(this.character.energy);
  }

  /**
   * Handles character collision with endBoss.
   */
  characterCollidingWithEndBoss(endBoss) {
    return this.character.isColliding(endBoss) && !endBoss.isDead;
  }

  /**
   * Checks if the character jumped on a chicken enemy.
   */
  jumpOnChicken() {
    this.level.enemies.forEach((enemy) => {
      if (this.characterJumpingOnChicken(enemy)) this.characterJumpedOnChicken(enemy);
      else if (this.characterLandingOnGround()) this.characterIsOnGround();
    });
  }

  /**
   * Checks if the character jumped on a specific chicken enemy.
   * @param {Enemy} enemy - The chicken enemy to check.
   * @returns {boolean} - True if character jumped on the chicken, otherwise false.
   */
  characterJumpingOnChicken(enemy) {
    return this.character.isColliding(enemy) && this.character.isJumpingDown() && !this.character.isHurt() && !enemy.chickenIsDead;
  }

  /**
   * Handles character jumping on a chicken enemy.
   * @param {Enemy} enemy - The chicken enemy.
   */
  characterJumpedOnChicken(enemy) {
    this.killChicken(enemy);
    this.character.jump();
    this.removeDeadChicken(enemy);
  }

  /**
   * Checks if the character has landed on the ground.
   * @returns {boolean} - True if character is on the ground, otherwise false.
   */
  characterLandingOnGround() {
    return this.character.y >= 160;
  }

  /**
   * Handles character landing on the ground.
   */
  characterIsOnGround() {
    this.character.speedY = 0;
    this.character.y = 160;
  }

  /**
   * Kills the chicken enemy.
   * @param {Enemy} enemy - The chicken enemy to be killed.
   */
  killChicken(enemy) {
    enemy.chickenIsDead = true;
    enemy.deadChickenAnimation();
  }

  /**
   * Removes the dead chicken enemy from the level after a delay.
   * @param {Enemy} enemy - The dead chicken enemy to be removed.
   */
  removeDeadChicken(enemy) {
    setTimeout(() => {
      const index = this.world.level.enemies.indexOf(enemy);
      if (index > -1) this.world.level.enemies.splice(index, 1);
    }, 1000);
  }

  /**
   * Draws all elements on the canvas including movable and fixed objects.
   */
  draw() {
    if(this.gameOver) {
      this.displayGameOverScreen(); 
    } else {

    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addMovableObjectsToMap();
    this.ctx.translate(-this.camera_x, 0); // back
    this.addStatusBarstoMap();
    this.ctx.translate(this.camera_x, 0); // forwards
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
  }

  /**
   * Adds to the map health, coin, and bottle status bars.
   */
  addStatusBarstoMap() {
    this.addToMap(this.healthStatus);
    this.addToMap(this.bottleStatus);
    this.addToMap(this.coinStatus);
    this.endBoss.forEach(boss => {
      if(boss.visible){
        this.addToMap(boss.endBossHealthStatus)
      }
    });
  }

  /**
   * Adds movable objects to the map such as background objects, enemies, endBosses, clouds, and collectible objects.
   */
  addMovableObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endBoss);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
  }

  /**
   * Adds objects to the map by iterating through the provided array.
   * @param {Array} objects - Array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map and flips its image if needed.
   * @param {Object} mo - Object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image of an object horizontally for drawing purposes.
   * @param {Object} mo - Object whose image is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the original orientation of the object's image after flipping.
   * @param {Object} mo - Object whose image orientation is to be restored.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
