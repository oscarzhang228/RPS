const userName = sessionStorage.getItem("username");
sessionStorage.clear();
const text = document.getElementById("text");
const mobPortrait = document.getElementById("goblin");
let playerHp = 5;
let coins = 0;
let progress = 0;
let damage = 1;
let critChance = 0;
//stage 1: scout 2:commander 3: royal guard 4: lord
let currentStage = 1;

function setScreenHp() {
  document.getElementById("lives").innerText = playerHp;
}

function setScreenProgress() {
  if ((progress === 0)) {
    Array.from(document.getElementById("progress-bar").children).forEach(
      (bar) => {
        bar.style.opacity = "0";
      }
    );
  } else {
    document.querySelector(`#progress-bar :nth-child(${progress})`).style.opacity = "1";
    
  }
}

function computerWin() {
  playerHp--;
  if (playerHp == 0) {
    progress = 0;
    setScreenProgress();
    playerHp = 5;
    if (currentStage == 1) {
      text.innerText =
        "You have died and been resurrected at the start of the stage";
    } else {
      currentStage--;
      if (currentStage === 1) {
        mobPortrait.src = "../images/goblin-scout.png";
        document.getElementById("mob-name").innerText = "Goblin Scout";
      } else if (currentStage === 2) {
        mobPortrait.src = "../images/goblin-commander.png";
        document.getElementById("mob-name").innerText = "Goblin Commander";
      } else {
        mobPortrait.src = "../images/goblin-royal-guard.png";
        document.getElementById("mob-name") = "Goblin Royal Guard";
      }
      text.innerText =
        "You have died and been resurrected at the start of the previous stage";
    }
  } else {
    text.innerText = "You lost. You have been dealt 1 damage.";
  }
  setScreenHp();
}

function playerWin() {
  text.innerText = "Win";
}

function determineWinner(playerChoice) {
  let computerMove = Math.floor(Math.random() * 3);
  if (computerMove === playerChoice) {
    text.innerText = "Draw";
  } else {
    switch (playerChoice) {
      case 0:
        if (computerMove === 1) computerWin();
        else playerWin();
        break;
      case 1:
        if (computerMove === 2) computerWin();
        else playerWin();
        break;
      case 2:
        if (computerMove === 0) computerWin();
        else playerWin();
        break;
      default:
        break;
    }
  }
}

//event listeners for click
const rockIcon = document.getElementById("rock-icon");
const paperIcon = document.getElementById("paper-icon");
const scissorsIcon = document.getElementById("scissors-icon");

rockIcon.addEventListener("click", () => {
  determineWinner(0);
});
paperIcon.addEventListener("click", () => {
  determineWinner(1);
});
scissorsIcon.addEventListener("click", () => {
  determineWinner(1);
});

/* 
to-do list
what to do if you win and what to do if you lose

variables for hearts and coins and progress as well as damage level and luck level

restart button

shop buttons



features to be added
make it work for mobile screens

for the actual gameplay,
goblin scouts with 5 hp 1 gold each then
goblin commander 10 hp 5 gold
then goblin royal guard 20 hp 10 gold
then goblin lord 40hp (ends game)

when you lose you demote back to the previous tier and if you lose to the scouts just revert back to the first scout 
kill 5 of each to progress until the goblin lord 
*/
