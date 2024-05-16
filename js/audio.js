let mute = false;


let audioData = [
    new Audio('audio/chicken-is-dead.mp3'),
    new Audio('audio/collect-bottle.mp3'),
    new Audio('audio/jump.mp3'),
    new Audio('audio/throwing_bottle.mp3'),
    new Audio('audio/walking.mp3'),
    new Audio('audio/throw.mp3'),
    new Audio('audio/win.mp3'),
    

];

function chickenIsDeadSound() {
    audioData[0].play();
}

function takeBottleSound() {
    audioData[1].play();
}

function jumpSound() {
    audioData[2].play();
}

function throwingBottleSound() {
    audioData[3].play(); 
}

function playWalkingSound() {
    audioData[4].play();
}

function pauseWalkingSound() {
    audioData[4].pause();
}

function throwSound() {
    audioData[5].play();
}

function winSound() {
    
}