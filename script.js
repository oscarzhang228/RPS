//rock paper scissors game
//create the computer function using random
//prompt the user for a choice of rock paper or scissors

function computer() {
  choice = Math.floor(Math.random() * 3) + 1;

  if (choice === 1) choice = "Rock";
  else if (choice == 2) choice = "Scissors";
  else choice = "Paper";

  return choice.ToLowercase;
}

function player() {
  pChoice = prompt("RPS?").toLowerCase();

  while (pChoice != "rock" && pChoice != "paper" && pChoice != "scissors") {
    pChoice = prompt("Please pick rock, paper, or scissors?").toLowerCase();
  }

  return pChoice;
}

function playRound(player, computer) {
  //returns if player won
  if (player == computer) return "tied";
  else if (player == "rock") {
    if (computer == "paper") return "lost";
    else return "won";
  } else if (player == "scissors") {
    if (computer == "paper") return "won";
    else return "lost";
  } else {
    if (computer == "scissors") return "lost";
    else return "won";
  }
}

function game() {
  playerWins = 0;

  for (i = 0; i < 5; i++) {
    computerMove = computer();
    playerMove = player();
    if (playRound(playerMove, computerMove) == "won") playerWins++;
  }
  if (playerWins >= 3) return "Player wins";
  else return "Player loses";
}

console.log(game());
