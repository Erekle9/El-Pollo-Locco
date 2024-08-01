let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;

/**
 * Adjusts the display of elements on the game screen based on the device type.
 * If the device is mobile, hides certain elements and shows mobile controls.
 */
function shoHideElementsOnGameScreen() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    const gameControls = document.getElementById('mobile-controls');
    const gameInstructions = document.getElementById('game-instructions');
    const gameScreen = document.getElementById('game-screen');
    const canvas = document.getElementById('canvas');
    const gameTitle = document.getElementById('game-title');
    const initialScreen = document.getElementById('initial-screen');

    gameTitle.style.display = 'none';
    gameScreen.classList.add('game-screen-mobile');
    canvas.classList.add('canvas-mobile');
    initialScreen.classList.add('initial-screen-mobile');
    gameControls.style.display = 'flex';
    gameInstructions.style.display = 'none';
  
  } 
}

/**
 * Checks the orientation of the device and adjusts the display accordingly.
 * Shows a rotate device overlay if the device is in portrait mode.
 */
function checkOrientation() {
  const overlay = document.getElementById('rotate-device-overlay');
  const gameScreen = document.getElementById('game-screen');

  if (window.innerHeight > window.innerWidth && window.innerWidth < 500) {
    overlay.style.display = 'flex';
    gameScreen.style.display = 'none';
  } else {
    overlay.style.display = 'none';
    gameScreen.style.display = 'flex';
  }

  if (navigator.userAgent) {
    shoHideElementsOnGameScreen();
  }
}



/**
 * Add event listeners for resize and load events to check orientation
 */
window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);

/**
 * Initializes the game by setting the canvas element.
 */
function init() {
  canvas = document.getElementById("canvas");
}

/**
 * Starts the game by initializing the level and creating a new World instance.
 * Hides the initial screen.
 */
function start() {
  initLevel();
  world = new World(canvas, keyboard);
  const initialScreen = document.getElementById('initial-screen');
  // const gameCredits = document.getElementById('game-credits')
  // gameCredits.style.display = 'none';
  initialScreen.style.display = 'none';
}

/**
 * Restarts the game by hiding the game over screen and resetting the game state.
 */
function restartGame() {
  const gameOverScreen = document.getElementById('game-over-screen');
  gameOverScreen.style.display = 'none';
  gameOverScreen.classList.remove("win")
  gameOverScreen.classList.remove("lose")
  start()
}

/**
 * Handles the start of a key press action.
 * @param {string} action - The action to start (e.g., 'LEFT', 'RIGHT').
 */
function startPress(action) {
  keyboard[action] = true;
}

/**
 * Handles the end of a key press action.
 * @param {string} action - The action to stop (e.g., 'LEFT', 'RIGHT').
 */
function stopPress(action) {
  keyboard[action] = false;
}

/**
 * Toggles the mute state for all sounds in the game.
 * Updates the mute button appearance based on the mute state.
 */
function muteAllSounds() {
  const muteButton = document.getElementById('mute-button');
    isMuted = !isMuted;
    muteButton.classList.toggle('muted', isMuted);
    muteButton.classList.toggle('unmuted', !isMuted); 
    if (isMuted) {
      muteSounds();
    } else {
      unmuteSounds();
    }
}

/**
 * Toggles full screen mode for the game.
 * Adjusts the body's justify-content style based on full screen state.
 */
function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        document.getElementsByTagName('body')[0].style.justifyContent= "center"
      }).catch(err => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
  } else {
      document.exitFullscreen();
       document.getElementsByTagName('body')[0].style.justifyContent= "flex-start"
  }
}


/**
 * Add event listeners for keydown and keyup events to handle keyboard actions
*/
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});
