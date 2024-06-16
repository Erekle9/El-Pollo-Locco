class Chicken extends MovableObject {
  y = 372;
  height = 70;
  width = 80;
  chickenIsDead = false;
  world;

  offset = {
    left: 20,
    top: 20,
    right: 20,
    bottom: 10,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
  ];

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * 6000;
    this.speed = 0.5 + Math.random() * 2.5;
    this.animate();
    this.deadChickenAnimation();
  }

  /**
   * Initiates various animations for the chicken.
   */
  animate() {
    this.moveLeftInterval = setInterval(() => this.moveLeft(), 1000 / 60);
    this.walkAnimationInterval = setInterval(() => this.playAnimation(this.IMAGES_WALKING),300);
  }

  /**
   * Animates the dead chicken.
   * & Plays the sound for defeated chicken.
   */
  deadChickenAnimation() {
    if (this.chickenIsDead) {
      this.loadImage(this.IMAGE_DEAD);
      this.removeDeadChickenInterval();
      chickenIsDeadSound();
    }
  }

  /**
   * Removes intervals associated with dead chicken animation.
   */
  removeDeadChickenInterval() {
    clearInterval(this.moveLeftInterval);
    clearInterval(this.walkAnimationInterval);
  }
}
