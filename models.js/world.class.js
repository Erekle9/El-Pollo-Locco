class World {
  character = new Character();
  level = level1;
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
  }

  /**
   * Starts the game loop.
   */
  run() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkCollisionWithObject();
      this.checkThrowObjects();
      this.checkThrowCollisions();
      this.jumpOnChicken();
    }, 200);
  }

  /**
   * Checks for throwable objects and throws them if conditions are met.
   */
  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      bottle.throw(this.character.otherDirection);
      this.throwableObjects.push(bottle);
    }
  }

  /**
   * Checks collisions of thrown objects with enemies and ground.
   */
  checkThrowCollisions() {
    this.throwableObjects.forEach((ThrowableObject) => {
      this.allowNewBottleThrow = false;
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
    this.allowNewBottleThrow = true;
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
    ThrowableObject.splashingBottle();
    this.removeThrownBottle(ThrowableObject);
    endBoss.endBossIsHit(allowNewBottleThrow);
    ThrowableObject.speedY = 0;
    ThrowableObject.speedX = 0;
    setTimeout(() => (this.allowNewBottleThrow = true), 1000);
  }

  /**
   * Removes a thrown bottle from the list of throwable objects after a delay.
   * @param {ThrowableObject} ThrowableObject - The thrown object to be removed.
   */
  removeThrownBottle(ThrowableObject) {
    setTimeout(() => {
      let index = this.throwableObjects.indexOf(ThrowableObject);
      if (index !== -1) this.throwableObjects.splice(index, 1);
    }, 250);
  }

  /**
   * Checks for the collection of items by the character.
   */
  checkCollisionWithObject() {
    this.level.items.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        this.character.bottleAmount++;
        this.bottleStatus.setPercentageBottles(this.character.bottleAmount);
        this.removeCollectedObject(index);
      }
      if (this.character.isColliding(item)) {
        this.character.coinAmount++;
        this.coinStatus.setPercentageCoins(this.character.coinAmount);
        this.removeCollectedObject(index);
      }
    });
  }

  /**
   * Removes the collected object from the level.
   * @param {number} index - The index of the collected object.
   */
  removeCollectedObject(index) {
    this.level.items.splice(index, 1);
    takeBottleSound();
  }

  /**
   * Checks collisions between the character and enemies.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.characterCollidingWithEnemy(enemy))
        this.checkCollisionsWithEnemy();
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
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && this.character.isWalking()) {
        this.character.hit();
        this.healthStatus.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Handles character collision with endBoss.
   */
  characterCollidingWithEndBoss(endBoss) {
    return this.character.isColliding(endBoss) && !endBoss.endBossIsDead;
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
    setTimeout(() => this.character.jump(), 100);
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

//=======================================

  /**
   * Checks if the character is dead.
   * @returns {boolean} - True if character is dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }


  /**
   * Draws all elements on the canvas including movable and fixed objects.
   */
  draw() {
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

  /**
   * Adds to the map health, coin, and bottle status bars.
   */
  addStatusBarstoMap() {
    this.addToMap(this.healthStatus);
    this.addToMap(this.bottleStatus);
    this.addToMap(this.coinStatus);
  }

  /**
   * Adds movable objects to the map such as background objects, enemies, endBosses, clouds, and collectible objects.
   */
  addMovableObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endBoss);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.items);
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
    mo.drawFrame(this.ctx);

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
