let level1;

function initLevel() {
  level1 = new Level(createEnemies(), createEndBoss(), createClouds(), createBackgroundObjects(), createBottles(), createCoins());
}

/**
 * Creates an array of enemies for the level, including normal chickens & small chickens.
 *
 * @return {Array} Array of enemy objects for the level
 */
function createEnemies() {
  return [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
  ];
}

/**
   * Creates the end boss for the level.
   * @returns {Array} An array containing the end boss object.
   */
function createEndBoss() {
  return [new EndBoss()];
}

/**
 * Create level clouds.
 *
 * @return {Array} Array of Cloud objects
 */
function createClouds() {
  return [new cloud()];
}

/**
 * Creates an array of BackgroundObject instances for the level backgrounds.
 *
 * @return {Array} An array of BackgroundObject instances for the level backgrounds.
 */
function createBackgroundObjects() {
  return [
    new backgroundObject("img/5_background/layers/air.png", -719),
    new backgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new backgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new backgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new backgroundObject("img/5_background/layers/air.png", 0),
    new backgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new backgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new backgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    new backgroundObject("img/5_background/layers/air.png", 719),
    new backgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new backgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new backgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new backgroundObject("img/5_background/layers/air.png", 719 * 2),
    new backgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
    new backgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
    new backgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
    new backgroundObject("img/5_background/layers/air.png", 719 * 3),
    new backgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
    new backgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
    new backgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),

    new backgroundObject("img/5_background/layers/air.png", 719 * 4),
    new backgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
    new backgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
    new backgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 4),
    new backgroundObject("img/5_background/layers/air.png", 719 * 5),
    new backgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 5),
    new backgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 5),
    new backgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 5),

    new backgroundObject("img/5_background/layers/air.png", 719 * 6),
    new backgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 6),
    new backgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 6),
    new backgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 6),
  ];
}

/**
   * Creates collectable objects for the level.
   * @returns {Array} An array of collectable object instances.
   */
function createBottles() {
  return [
    new CollectableBottle(),
    new CollectableBottle(),
    new CollectableBottle(),
    new CollectableBottle(),
    new CollectableBottle(),
    
  ];
}

function createCoins() {
  return [
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin()
  ];
}

