class ThrowableObject extends MovableObject {
  speedX = 10;
  hasHit = false;
  direction;
  splash = false;
  bottleRefill = false;
  world;

  IMAGE_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGE_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
  ];

  /**
   * Constructs a new ThrowableObject object.
   * @param {number} x - The x coordinate of the throwable object.
   * @param {number} y - The y coordinate of the throwable object.
   */
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGE_BOTTLE_ROTATION);
    this.loadImages(this.IMAGE_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.ground = 380;
    this.rotationAnimate();
  }

  /**
   * Initiates the animation for the throwable object.
   */
  rotationAnimate() {
    setInterval(() => {
      this.throwingBottle();
    }, 50);
  }

   /**
   * Animates the throwing bottle.
   */
  throwingBottle() {
    if (this.isAboveGround()) {
      this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
    }
  }

  /**
   * Animates the splashing bottle.
   */
  splashingBottle() {
    splashingBottleSound();
    this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
  }

  /**
   * Throws the throwable object.
   * @param {boolean} otherDirection - Indicates whether to throw in the opposite direction.
   */
  throw(otherDirection) {
    this.speedY = 20;
    this.applyGravity();
    throwingBottleSound();

    if (world) {
      setInterval(() => {
        if (this.isAboveGround()) {
          if (otherDirection) {
            this.x -= this.speedX;
          } else {
            this.x += this.speedX;
          }
        }
      }, 35);
    }
  }
}
