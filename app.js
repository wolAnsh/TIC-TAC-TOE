document.addEventListener("DOMContentLoaded", () => {
  let boxes = document.querySelectorAll(".box");
  let reset = document.querySelector(".restart");
  let start = document.querySelector(".new");
  let msgContainer = document.querySelector(".msg-container");
  let msg = document.querySelector("#msg");
  let turnx = true;
  let count = 0;

  const win = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const resetGame = () => {
    turnx = true;
    count = 0;
    enableBoxes();
  };

  const gameDraw = () => {
    msg.innerText = "AWWWW  it is a Draw.";
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

  const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };

  const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };


  const showWinner = (winner) => {
    console.log("Winner:", winner);
    msg.innerText = `Hurray!!!, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

  const checkWinner = () => {
    for (let pattern of win) {
      let pos1val = boxes[pattern[0]].innerText;
      let pos2val = boxes[pattern[1]].innerText;
      let pos3val = boxes[pattern[2]].innerText;
      console.log(`Positions: ${pos1val} - ${pos2val} - ${pos3val}`);
      if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
        if (pos1val === pos2val && pos2val === pos3val) {
          showWinner(pos1val);
          return true;
        }
      }
    }
  };

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnx) {
        box.innerText = "X";
        turnx = false;
      } else {
        box.innerText = "O";
        turnx = true;
      }
      box.disabled = true;
      count++;
      let isWinner = checkWinner();

      if (count == 9 && !isWinner) {
        gameDraw();
      }
    });
  });

  start.addEventListener("click", resetGame);
  reset.addEventListener("click", resetGame);
});
