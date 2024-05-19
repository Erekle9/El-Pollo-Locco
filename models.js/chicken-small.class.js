class SmallChicken extends MovableObject {

    y = 390;
    height = 60;
    width = 70;

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

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 600;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 300)
    }

}