class SmallChicken extends MovableObject {

    y = 390;
    height = 60;
    width = 70;
    chickenIsDead = false;

    offset = {
        top: -30,
        right: 0,
        bottom: -30,
        left: 0,
    };

    IMAGES_WALKING = [
       'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
       'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
       'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

     /**
   * Constructs a new ChickenSmall object.
   */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 600;
        this.speed = 1 + Math.random() * 2;
        this.animate();
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
      smallChickenIsDeadSound();
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
