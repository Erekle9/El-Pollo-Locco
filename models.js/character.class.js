class Character extends MovableObject {
  height = 280;
  width = 150;
  y = 60;
  speed = 10;

  offset = {
    left: 20,
    top: 110,
    right: 25,
    bottom: 10,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  world;

  /**
   * Constructs a new Character object.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * Initiates animations for the character.
   */
  animate() {
    setInterval(() => this.moveCharacter(), 1000 / 60);
    setInterval(() => this.playCharacter(), 100);
  }

  /**
   * Moves the character based on keyboard inputs.
   */
  moveCharacter() {
    pauseWalkingSound();
    if (this.canMoveRight()) {
      this.moveRight();
    }
    if (this.canMoveLeft()) {
      this.moveLeft();
    }
    if (this.canJump()) {
      this.jump();
      jumpSound();
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks if the character can move to the right.
   * @returns {boolean} True if the character can move right, otherwise false.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Checks if the character can move to the left.
   * @returns {boolean} True if the character can move left, otherwise false.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Moves the character to the right.
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    playWalkingSound();
  }

  /**
   * Moves the character to the left.
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    playWalkingSound();
  }

  /**
   * Checks if the character can jump.
   * @returns {boolean} True if the character can jump, otherwise false.
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Method to play character animations based on different conditions.
   */
  playCharacter() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      //jump animation
      this.playAnimation(this.IMAGES_JUMPING);
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        // walk animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }
}
