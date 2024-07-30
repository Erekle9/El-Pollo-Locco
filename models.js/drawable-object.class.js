class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    /**
   * Loads an image for the drawable object.
   * @param {string} path - The path to the image.
   */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
   * Draws the drawable object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            // console.error('could not load image,', this.img);
        }
        
    }

    /**
   * Loads multiple images for the drawable object.
   * @param {string[]} arr - An array of paths to the images.
   */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img; 
        });
        
    }

}