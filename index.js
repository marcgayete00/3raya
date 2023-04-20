const express = require("express");
const app = express();
const port = 3000;

let board = Array(9);

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
    board.fill(undefined);
  }
}

function iaPlays() {
  let pos = Math.floor(Math.random() * 9);
  if (board[pos] === undefined) {
    board[pos] = "O";
  } else {
    iaPlays();
  }
  isGameOver();
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
