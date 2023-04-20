const Minimax = require('tic-tac-toe-minimax');
const { ComputerMove } = Minimax;

const express = require("express");
const app = express();
const port = 3000;

let board = Array(9);

const winningCombinations = [
  //Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isGameOver() {
  if (
    // Horizontal
    (board[0] === "X" && board[1] === "X" && board[2] === "X") ||
    (board[3] === "X" && board[4] === "X" && board[5] === "X") ||
    (board[6] === "X" && board[7] === "X" && board[8] === "X") ||
    // Vertical
    (board[0] === "X" && board[3] === "X" && board[6] === "X") ||
    (board[1] === "X" && board[4] === "X" && board[7] === "X") ||
    (board[2] === "X" && board[5] === "X" && board[8] === "X") ||
    // Diagonal
    (board[0] === "X" && board[4] === "X" && board[8] === "X") ||
    (board[2] === "X" && board[4] === "X" && board[6] === "X")
  ) {
    console.log("You win!");
    console.log("Reloading board...");
    board.fill(undefined);
  } else if (
    // Horizontal
    (board[0] === "O" && board[1] === "O" && board[2] === "O") ||
    (board[3] === "O" && board[4] === "O" && board[5] === "O") ||
    (board[6] === "O" && board[7] === "O" && board[8] === "O") ||
    // Vertical
    (board[0] === "O" && board[3] === "O" && board[6] === "O") ||
    (board[1] === "O" && board[4] === "O" && board[7] === "O") ||
    (board[2] === "O" && board[5] === "O" && board[8] === "O") ||
    // Diagonal
    (board[0] === "O" && board[4] === "O" && board[8] === "O") ||
    (board[2] === "O" && board[4] === "O" && board[6] === "O")
  ) {
    console.log("You lose!");
    console.log("Reloading board...");
    board.fill(undefined);
  } else{
    console.log("Draw!");
    console.log("Reloading board...");
    board.fill(undefined);
  }
}

function iaPlays() {
  //Comprobar si el tablero esta lleno
  let flag = true;
  for(let i = 0; i < board.length; i++){
    if(board[i] === undefined){
      flag = false;
      break;
    }
  }

  if (flag){
    isGameOver();
  } else {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "X" && board[i+1] === "X" && board[i+2] === undefined) {
        pos = i+2;
        break;
      } else if (board[i] === "X" && board[i+1] === undefined && board[i+2] === "X"){
        pos = i+1;
        break;
      } else if (board[i] === undefined && board[i+1] === "X" && board[i+2] === "X"){
        pos = i;
        break;
      } else {
        pos = Math.floor(Math.random() * 9);
        break;
      }
    }

    if (board[pos] === undefined) {
      board[pos] = "O";
    } else {
      iaPlays();
    }
  }
}

app.get("/status", (req, res) => {
  res.json(board);
});

app.post("/move/:pos", (req, res) => {
  if (board[req.params.pos] === undefined) {
    res.json("Moved position: " + req.params.pos);
    board[req.params.pos] = "X";
    iaPlays();
  } else {
    res.json("Position already taken");
  }
});

app.delete("/status", (req, res) => {
  res.json("status deleted");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
