const blocks = document.querySelectorAll(".content-block");
const scoreboard = document.getElementById("scoreboard");
const restartButton = document.getElementById("restart-btn");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let playerXScore = 0;
let playerOScore = 0;

function checkWin() {
  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningPositions) {
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return gameBoard[a];
    }
  }

  return null;
}

function handleResult(winner) {
  if (winner) {
    const winnerClass = `winner-${winner}`;
    scoreboard.innerText = `${winner} Parabéns, você venceu!`;
    scoreboard.classList.add(winnerClass);

    if (winner === "X") {
      playerXScore++;
    } else if (winner === "O") {
      playerOScore++;
    }

    updateScoreboard();
    gameOver = true;
  } else {
    scoreboard.innerText = "Empate!";
    gameOver = true;
  }
}
function handleResult(winner) {
  if (winner) {
    const winnerClass = `winner-${winner}`;
    //scoreboard.innerText = `${winner} Parabéns, você venceu!`;
    scoreboard.classList.add(winnerClass, "winner-animation");

    if (winner === "X") {
      playerXScore++;
    } else if (winner === "O") {
      playerOScore++;
    }

    updateScoreboard();
    gameOver = true;

    setTimeout(() => {
      scoreboard.classList.remove("winner-animation");
    }, 1000); // Aguarda 1 segundo (tempo da animação) antes de remover a classe
  } else {
    scoreboard.innerText = "Empate!";
    gameOver = true;
  }
}

function updateScoreboard() {
  scoreboard.innerText = `Placar: X ${playerXScore} - ${playerOScore} O`;
}

function handleRestartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  blocks.forEach((block) => (block.innerText = ""));
  scoreboard.classList.remove("winner-X", "winner-O");
  gameOver = false;
  currentPlayer = "X";
}

function handleClick(index) {
  if (!gameBoard[index] && !gameOver) {
    gameBoard[index] = currentPlayer;
    blocks[index].innerText = currentPlayer;

    const winner = checkWin();
    if (winner) {
      handleResult(winner);
      return;
    }

    if (gameBoard.every((block) => block !== "")) {
      handleResult(null);
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

restartButton.addEventListener("click", handleRestartGame);