class Level {
    enemies;
    endBoss;
    clouds;
    backgroundObjects;
    items;
    level_end_x = 4200;

    /**
   * Creates a new instance of the level class
   * @param {Array} enemies - An array of enemies (containing normal and small chicken) in the level
   * @param {Array} endBoss - an array of endBoss in the level
   * @param {Array} clouds - An array of clouds in the level
   * @param {Array} collectableObjects - An Array of collectableObjects (containing bottles and coins) in the level
   * @param {Array} backgroundObjects - An array of background objects in the level
   */
    constructor(enemies, endBoss, clouds, backgroundObjects, items) {
        this.enemies = enemies;
        this.endBoss = endBoss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.items = items;
    }

}