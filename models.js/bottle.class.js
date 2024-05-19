class CollectableBottle extends CollectableObjects {

    BOTTLE_LEFT = 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
    BOTTLE_RIGHT = 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    

    offset = {
        top: -15,
        left: 15,
        bottom: -15,
        right: 15,
      };

    constructor() {
        super().loadImage(this.BOTTLE_LEFT);
        this.loadImages(this.IMAGES_BOTTLE);

        this.x = 500 + Math.random() * 2000;
        this.y = 370;
        this.height = 70;
        this.width = 70;
      }

}