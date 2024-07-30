class cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    
    /**
   * Constructs a new Cloud object.
   */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
   * Initiates the animation for the cloud.
   */
    animate() {
        this.moveLeft();
    }
}