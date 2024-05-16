class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthStatus = new StatusBarHealth();
    bottleStatus = new StatusBarBottle();
    coinStatus = new StatusbarCoin();
    throwableObjects = [];
    bottleAmount = 0;
    coinAmount = 0;

    constructor (canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisionsWithEnemy();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x +100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthStatus.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionWithObject() {
        this.level.CollectableObjects.forEach((object, index) => {

        });
    }

    collectingBottle(CollectableObjects) {
        return CollectableObjects instanceof CollectableBottle;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // back
        this.addToMap(this.healthStatus);
        this.addToMap(this.bottleStatus);
        this.addToMap(this.coinStatus);
        this.ctx.translate(this.camera_x, 0); // forwards
        
        this.addObjectsToMap(this.level.items);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}