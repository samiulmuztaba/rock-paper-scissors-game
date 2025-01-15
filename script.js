let buttons = document.querySelectorAll(".buttons button");
let resultEL = document.getElementById("winorlose");
let computerScoreEL = document.getElementById("computer-score");
let yourScoreEL = document.getElementById("your-score");
let replayButton = document.getElementById("replay"); // Replay button

let computerScore = 0;
let yourScore = 0;
const winningScore = 5;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (computerScore < winningScore && yourScore < winningScore) {
      const result = playRound(button.id, computerPlay());
      resultEL.textContent = result;

      // Check for a winner
      if (yourScore === winningScore) {
        resultEL.textContent = "🎉 You are the champion! 🏆";
        endGame();
      } else if (computerScore === winningScore) {
        resultEL.textContent = "💻 Computer wins the game! 🤖";
        endGame();
      }
    }
  });
});

// Replay button event listener
replayButton.addEventListener("click", () => {
  resetGame();
});

function computerPlay() {
  const choices = ["rock", "paper", "scissor"];
  const randomChoice = Math.floor(Math.random() * choices.length);
  return choices[randomChoice];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return `It's a tie!`;
  } else if (
    (playerSelection === "rock" && computerSelection === "scissor") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissor" && computerSelection === "paper")
  ) {
    yourScore++;
    yourScoreEL.textContent = yourScore;
    return `You win! ${playerSelection} beats ${computerSelection}`;
  } else {
    computerScore++;
    computerScoreEL.textContent = computerScore;
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  }
}

function endGame() {
  buttons.forEach((button) => {
    button.disabled = true; // Disable all buttons
  });
  replayButton.style.display = "block"; // Show replay button
}

function resetGame() {
  computerScore = 0;
  yourScore = 0;
  computerScoreEL.textContent = computerScore;
  yourScoreEL.textContent = yourScore;
  resultEL.textContent = "Choose your move";
  buttons.forEach((button) => {
    button.disabled = false; // Re-enable buttons
  });
  replayButton.style.display = "none"; // Hide replay button
}
