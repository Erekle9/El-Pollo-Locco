class StatusbarCoin extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    percentageCoins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentageCoins();
    }

    setPercentageCoins(percentageCoins) {
        this.percentageCoins = percentageCoins;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentageCoins == 10) {
            return 5;
        } else if(this.percentageCoins > 8) {
            return 4;
        } else if(this.percentageCoins > 6) {
            return 3;
        } else if(this.percentageCoins > 4) {
            return 2;
        } else if(this.percentageCoins > 2) {
            return 1;
        } else {
            return 0;
        } 
    }

}