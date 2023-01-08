// const cells = document.querySelectorAll(".cell");
// const winningMessageElement = document.getElementById("winningMessage");
// const restartBtn = document.getElementById("restartButton");
// const winningMessageText = document.querySelector(
//   "[data-winning-message-text]"
// );
// class Game {
//   mark = "O";
//   allMoves = ["", "", "", "", "", "", "", "", ""];
//   moves2D = [];
//   count = 0;
//   addMark(i) {
//     this.mark === "O" ? (this.mark = "X") : (this.mark = "O");
//     this.allMoves[i] = this.mark;
//   }

//   display(e) {
//     e.target.innerText = this.mark;
//   }

//   destructArr(arr) {
//     const temp = [];
//     for (let i = 0; i < 3; i++) {
//       temp.push(arr.splice(0, 3));
//     }
//     this.moves2D = temp;
//   }

//   destructVertical() {
//     const tmp = [];
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         tmp.push(this.moves2D[j][i]);
//       }
//     }
//     this.destructArr(tmp);
//   }

//   evaluate() {
//     this.count++;
//     this.destructArr(this.allMoves.slice());
//     const winnerArr = () =>
//       this.moves2D.filter((arr) => {
//         if (arr.every((el) => el === "O")) return true;
//         if (arr.every((el) => el === "X")) return true;
//       });
//     let wArr = winnerArr();

//     if (wArr[0]) {
//       return this.displayResult(`${wArr[0][0]} is the winner.`);
//     } else if (
//       (this.moves2D[0][0] === this.moves2D[1][1] &&
//         this.moves2D[1][1] === this.moves2D[2][2]) ||
//       (this.moves2D[0][2] === this.moves2D[1][1] &&
//         this.moves2D[1][1] === this.moves2D[2][0])
//     ) {
//       if (this.moves2D[1][1] !== "")
//         return this.displayResult(`${this.moves2D[1][1]} is the winner.`);
//     } else {
//       this.destructVertical();
//       wArr = winnerArr();
//       if (wArr[0]) return this.displayResult(`${wArr[0][0]} is the winner.`);
//     }
//     this.count === 9 ? this.displayResult("Draw") : "";
//   }

//   displayResult(text) {
//     winningMessageElement.classList.add("show");
//     winningMessageText.innerText = text;
//   }

//   clear() {
//     this.mark = "O";
//     this.allMoves = ["", "", "", "", "", "", "", "", ""];
//     this.moves2D = [];
//     this.count = 0;
//     cells.forEach((el) => (el.innerText = ""));
//     winningMessageElement.classList.remove("show");
//     winningMessageText.innerText = "";
//   }
// }

// const g = new Game();

// cells.forEach((el, i) => {
//   el.addEventListener(
//     "click",
//     function (e) {
//       //   if (g.allMoves[i] !== "") return;
//       g.addMark(i);
//       g.display(e);
//       g.evaluate();
//     },
//     { once: true }
//   );
// });

// restartBtn.addEventListener("click", () => {
//   g.clear();
// });

// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1

// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1

// 1
// 11
// 1
// 1
// 1
// 1
// 1
// 1
// 1

// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1
// 1

// 1
// 1

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
