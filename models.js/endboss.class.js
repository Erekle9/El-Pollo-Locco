class EndBoss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  world;
  energy = 100;
  endBossIsDead = false;
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G13.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Constructs a new EndBoss object.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 4300;
    this.animate();
  }

  animate() {
    setInterval(() => this.playEndBoss(), 300);

    // setInterval(() => {

    //   if (this.alertArea) {
    //     this.alertAnimation();
    //   } else if (this.hadFirstContact()) {
    //     this.moveAnimateEndBoss();
    //     EndBosAreaSound();
    //   }
    //    if (world.character.x > 3900) {
    //     clearInterval(this.alertAnimation())
    //     this.moveAnimateEndBoss();
    //     EndBosAreaSound();
    //   }
      
    // }, 150);
  }

  alertAnimation() {
    this.playAnimation(this.IMAGES_ALERT);
  }

  alertArea() {
    return world.character.x > 3850;
  }

  moveAnimateEndBoss() {
    setInterval(() => this.moveLeft(), 1000 / 60);
    setInterval(() => this.playAnimation(this.IMAGES_WALKING), 300);
  }

  endBossHartAnimation() {
    this.playAnimation(this.IMAGES_HURT);
   setInterval(() => this.playAnimation(this.IMAGES_HURT),300);
  }

  endBossAttackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK);
  }

  /**
   * Handles the event when the end boss is hit.
   */
  endBossIsHit() {
    this.energy -= 8;
    // this.endBossIsHurt = true;
    setTimeout(() => (this.endBossIsHurt = false), 50);
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
      this.endBossHartAnimation();
    }
    // this.setStatusBarEndBoss();
    console.log( "bosis healt is:", this.energy);
  }

  endBossDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  playEndBoss() {
    if (this.isDead) {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        console.log('is dead');
        return;
      } else if (this.endBossIsHurt = true) {
        this.playAnimation(this.IMAGES_HURT);
        this.moveLeft();
      } else if (this.alertArea) {
        this.alertAnimation();
      } else {
        if (this.energy <= 50) {
          this.playAnimation(this.IMAGES_ATTACK);
          this.speed = 0.25;
        }
      }
    }
    }
  

}
