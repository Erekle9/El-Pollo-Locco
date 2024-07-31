class Coin extends CollectableObjects {
   IMAGES_COINS = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
   ];

   /**
   * Constructs a new Coin object.
   */
   constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COINS);
    this.x = 400 + Math.random() * 2500;
    this.y = 160 + Math.random() * 75;
    this.animate();
  }
    
  /**
   * Initiates the animation for the coin.
   */
  animate() {
    setInterval(() => this.playAnimation(this.IMAGES_COINS), 400);
  }
}