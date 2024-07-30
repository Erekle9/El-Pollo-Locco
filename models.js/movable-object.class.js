class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  bottleAmount = 0;
  coinAmount = 0;
  world;
  ground = 160;

  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  constructor() {
    super();
  }

  /**
   * Applies gravity to the object.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = this.ground;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    return this.y < this.ground;
  }

  /**
   * Plays an animation for the object.
   * @param {Array} images - Array of image paths for the animation.
   */
  async playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {MovableObject} mo - The other movable object.
   * @returns {boolean} True if colliding, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Initiates a jump action for the object.
   */
  jump() {
    this.speedY = 30;
    this.y -= 1;
  }

  /**
   * Handles the event when the object is hit.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is hurt.
   * @returns {boolean} True if hurt, otherwise false.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000; // Difference in sec
    return timePassed < 0.5;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} True if dead, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is on the ground.
   * @returns {boolean} True if on the ground, otherwise false.
   */
  isOnTheGround() {
    return this.speedY == 0;
  }

  /**
   * Checks if the object is jumping up.
   * @returns {boolean} True if jumping up, otherwise false.
   */
  isJumpingUp() {
    return this.speedY > 0;
  }

  /**
   * Checks if the object is walking.
   * @returns {boolean} True if walking, otherwise false.
   */
  isWalking() {
    return this.speed > 0;
  }

  /**
   * Checks if the object is jumping down.
   * @returns {boolean} True if jumping down, otherwise false.
   */
  isJumpingDown() {
    if (this.speedY <= -32) {
      this.speedY = 0;
      this.isOnTheGround;
    } else {
      return this.speedY < 0;
    }
  }

  
}
