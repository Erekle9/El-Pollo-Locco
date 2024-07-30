class StatusBarEndBoss extends DrawableObject {
    
    IMAGES = [
        "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "img/7_statusbars/2_statusbar_endboss/blue/blue100.png"
    ];

    /**
   * Percentage of end boss life.
   * @type {number}
   */
    percentage = 100;

     /**
   * Constructs a new StatusBarEndboss object.
   */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 450;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
   * Sets the percentage of end boss life and updates the status bar image.
   * @param {number} percentage - The percentage of end boss life.
   */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.visible = this.percentage < 100;
    }

    /**
   * Resolves the index of the image in IMAGES_LIFE_ENDBOSS array based on the percentage of end boss life.
   * @returns {number} The index of the image.
   */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if(this.percentage > 80) {
            return 4;
        } else if(this.percentage > 60) {
            return 3;
        } else if(this.percentage > 40) {
            return 2;
        } else if(this.percentage > 20) {
            return 1;
        } else {
            return 0;
        } 
    }

}