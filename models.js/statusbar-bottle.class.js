class StatusBarBottle extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percentageBottle = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentageBottles();
    }

    setPercentageBottles(percentageBottle) {
        this.percentageBottle = percentageBottle;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentageBottle >= 5) {
            return 5;
        } else if(this.percentageBottle >= 4) {
            return 4;
        } else if(this.percentageBottle >= 3) {
            return 3;
        } else if(this.percentageBottle >= 2) {
            return 2;
        } else if(this.percentageBottle >= 1) {
            return 1;
        } else {
            return 0;
        } 
    }
}

