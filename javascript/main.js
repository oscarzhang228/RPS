const userName = sessionStorage.getItem("username");
sessionStorage.clear();
const text = document.getElementById("text");
const mobPortrait = document.getElementById("goblin");
const mobHp = document.getElementById("mob-health");
let playerHp = 5;
let playerMaxHp = 5;
let coins = 0;
let progress = 0;
let damage = 1;
let damageCost = 1;
let critChanceCost = 1;
let hpCost = 1;
let critChance = 0;
//stage 1: scout 2:commander 3: royal guard 4: lord
let currentStage = 1;

function addMobHp(monsterHp) {
  while(mobHp.hasChildNodes()) {
    mobHp.removeChild(mobHp.firstChild);
  }
  for(let i = 0; i < monsterHp; i++) {
    const monsterHpBar = document.createElement("div");
    monsterHpBar.classList.add("health");
    mobHp.appendChild(monsterHpBar);
  }
}
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
    if(progress != 0) {progress -= 1;
    document.querySelector(`#progress-bar :nth-child(${progress + 1})`).style.opacity = "0";}
    text.innerText =
        "You have died and been resurrected. Your progress has decreased.";
    playerHp = playerMaxHp;
    if (currentStage == 1) {
        addMobHp(5);
    } else {
      currentStage--;
      if (currentStage === 1) {
        mobPortrait.src = "../images/goblin-scout.png";
        document.getElementById("mob-name").innerText = "Goblin Scout";
        addMobHp(5);
      } else if (currentStage === 2) {
        mobPortrait.src = "../images/goblin-commander.png";
        document.getElementById("mob-name").innerText = "Goblin Commander";
        addMobHp(10);
      } else {
        mobPortrait.src = "../images/goblin-royal-guard.png";
        document.getElementById("mob-name") = "Goblin Royal Guard";
        addMobHp(20);
      }
    }
  } else {
    text.innerText = "You lost. You have been dealt 1 damage.";
  }
  
  setScreenHp();
}

function playerWin() {
  const chance = Math.floor(Math.random() * 100) + 1;
  const didCrit = chance <= critChance ? 2:1;
  if(didCrit === 2) {
    document.getElementById("crit-bubble").classList.toggle("show-bubble");
    window.setTimeout(() => {
      document.getElementById("crit-bubble").classList.toggle("show-bubble");
    }, 3000);
  }
  
  for(let i = 0; i < damage * didCrit && mobHp.hasChildNodes(); i++) {
    mobHp.removeChild(mobHp.firstChild);
  }
  if(!mobHp.hasChildNodes()) {
    coins += Math.pow(10, currentStage-1);
    document.getElementById("gold").innerText = coins;
    progress++;
    if(currentStage === 4) {
      text.innerText = "You have saved the world... for now. The Goblin Lord vows to return again, next time with a different game. Press Restart to play again."
      return;
    }
    if(progress > 4) {
      progress = 0;
      currentStage++;
      if(currentStage === 2) {
        mobPortrait.src = "../images/goblin-commander.png";
        document.getElementById("mob-name").innerText = "Goblin Commander";
        text.innerText = "The Goblin Commander wishes to battle.";
      } else if(currentStage === 3) {
        mobPortrait.src = "../images/goblin-royal-guard.png";
        document.getElementById("mob-name").innerText = "Goblin Royal Guard";
        text.innerText = "The Goblin Lord's strongest fighters, the Goblin Royal Guard, have appeared.";
        addMobHp(20);
      } else {
        mobPortrait.src = "../images/goblin-lord.png";
        addMobHp(40);
        document.getElementById("mob-name").innerText = "Goblin Lord";
        text.innerText = "You now face the Goblin Lord!"
      }
    } else {
      text.innerText = "You are one step closer to the Goblin Lord.";
    }
    if(currentStage === 1) {
      addMobHp(5);
    } else if(currentStage === 2) {
      addMobHp(10);
    } else {
      addMobHp(20);
    }
    setScreenProgress();
    
  } else {
    text.innerText = `You did ${damage} damage.`;
  }
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


//shop stuff

document.getElementById("hp").addEventListener("click", () => {
  if(coins >= hpCost) {
    playerMaxHp++;
    playerHp = playerMaxHp;
    setScreenHp();
    coins -= hpCost;
    hpCost *= 2; 
    document.getElementById("gold").innerText = coins;
    document.getElementById("hp-cost").innerText = hpCost;
    text.innerText = "You have increased your maximum hp by 1";
  } else {
    text.innerText = "You do not have enough coins.";
  }

});
document.getElementById("damage").addEventListener("click", () => {
  if(coins >= damageCost) {
    damage++;
    coins -= damageCost;
    damageCost *= 2;
    document.getElementById("gold").innerText = coins;
    document.getElementById("dmg-cost").innerText = damageCost;
    text.innerText = "You have increased your damage by 1";
  } else {
    text.innerText = "You do not have enough coins.";
  }
});
document.getElementById("luck").addEventListener("click", () => {
    if(luck === 100) {
      text.innerText = "Luck is maxed out.";
    } else if(coins >= critChanceCost) {
      critChance++;
      coins -= critChanceCost;
      critChanceCost *= 2;
      document.getElementById("gold").innerText = coins;
      document.getElementById("luck-cost").innerText = critChanceCost;
      text.innerText = "You have increased your luck by 1";
    } else {
      text.innerText = "You do not have enough coins.";
    }
});
/* 
to-do list



restart button

shop buttons


*/
