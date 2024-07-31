/**
 * Represents a collectible bottle object in the game.
 * @extends MovableObject
 */
class CollectableBottle extends CollectableObjects {
  BOTTLE_LEFT = "img/6_salsa_bottle/1_salsa_bottle_on_ground.png";
  BOTTLE_RIGHT = "img/6_salsa_bottle/2_salsa_bottle_on_ground.png";
  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  offset = {
    top: -15,
    left: 15,
    bottom: -15,
    right: 15,
  };

  /**
   * Constructs a new salsa bottle with initial image, position and size
   */
  constructor() {
    super().loadImage(this.BOTTLE_LEFT);
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 600 + Math.random() * 3400;
    this.y = 370;
    this.height = 70;
    this.width = 70;
  }
}
