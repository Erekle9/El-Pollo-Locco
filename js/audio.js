let mute = false;

let audioData = [
  new Audio("audio/chicken-is-dead.mp3"),
  new Audio("audio/small-chicken-is-dead.mp3"),
  new Audio("audio/collect-bottle.mp3"),
  new Audio("audio/jump.mp3"),
  new Audio("audio/hurt-character.mp3"),
  new Audio("audio/splashing_bottle.mp3"),
  new Audio("audio/walking.mp3"),
  new Audio("audio/throwing_bottle.mp3"),
  new Audio("audio/endBossAlert.mp3"),
  new Audio("audio/hurt-end-boss.mp3"),
  new Audio("audio/win.mp3"),
];

function chickenIsDeadSound() {
  audioData[0].play();
}

function smallChickenIsDeadSound() {
  audioData[1].play();
}

function takeBottleSound() {
  audioData[2].play();
}

function jumpSound() {
  audioData[3].play();
}

function characterIsHurtSound() {
  audioData[4].play();
}

function splashingBottleSound() {
  audioData[5].play();
}

function playWalkingSound() {
  audioData[6].play();
}

function pauseWalkingSound() {
  audioData[6].pause();
}

function throwingBottleSound() {
  audioData[7].play();
}

function EndBosAreaSound() {
  audioData[8].play();
}

function endBossIsHurtSound() {
  audioData[9].play();
}

function winSound() {
  audioData[10].play();
}
