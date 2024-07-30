class EndBoss extends MovableObject {
  moveInterval;
  walkInterval;
  endBossStateInterval;
  visible = false; 
  isDead = false;
  endBossHealthStatus
  height = 400;
  width = 250;
  y = 55;
  world;
  energy = 100;
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
    this.endBossHealthStatus = new StatusBarEndBoss()
    
  }

  /**
   * Initiates the animation of the end boss.
   */
  animate() {
   this.endBossStateInterval = setInterval(() => {
      this.checkEndBossState();
    }, 150);
  }

  /**
   * Manage the end boss's state based on its energy level and alert area
   */
  checkEndBossState() {
    if (this.energy <= 0) {
      clearInterval(this.moveInterval);
      clearInterval(this.walkInterval);
      this.endBossDeadAnimation();
      this.isDead = true;
      
    } else if (this.alertArea()) {
      if (!this.visible) {
        this.visible = true;
        this.startEndBoss();
      }
      if (this.energy <= 50 && this.energy > 0) {
        this.endBossAttackAnimation();
        this.speed = 0.25;
      }
    }
  }

  /**
   * Plays the alert animation of the end boss.
   */
  alertAnimation() {
    this.playAnimation(this.IMAGES_ALERT);
  }

  /**
   * Checks if the character is in alert Area.
   * @returns {boolean} True if character is in alert Area, otherwise false.
   */
  alertArea() {
    return world.character.x > 3850;
  }
 
  /**
   * Moves the end boss to the left.
   */
  startEndBoss() {
    if (!this.moveInterval) {
      this.moveAnimateEndBoss();
      pauseBackgroundSound()
      EndBosAreaSound();
    }
  }

  /**
   * initiates walking animation.
   */
  moveAnimateEndBoss() {
    this.moveInterval = setInterval(() => this.moveLeft(), 1000 / 60);
    this.walkInterval = setInterval(() => this.playAnimation(this.IMAGES_WALKING), 300);
  }

  /**
   * initiates Hurt animation.
   */
  endBossHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * initiates Attack animation.
   */
  endBossAttackAnimation() {
    this.playAnimation(this.IMAGES_ATTACK);
  }

  /**
   * Handles the event when the end boss is hit.
   */
 endBossIsHit() {
    this.energy -= 20; // Example damage value
    this.endBossHealthStatus.setPercentage(this.energy)
    if (this.energy < 0) {
        this.energy = 0; // Prevent negative health
    }
    if (this.energy <= 0) {
        
    } else {
        this.endBossHurtAnimation();
    }
}

  async endBossDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  

}
