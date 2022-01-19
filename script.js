"using strict";

const setXO = (e, i, j) => {
  if (!matrixo[i][j]) {
    matrixo[i][j] = switchPlayer ? 1 : 10;
    e.style.backgroundImage = `url('res/${switchPlayer ? "o" : "x"}.png')`;
  }
};

const arrCopyConvToNonMatrix = (arr1) => {
  let j = 0;

  for (let i = 0; i < 3; i++) arr1[i] = matrixo[j][i];
  j++;
  for (let i = 0; i < 3; i++) arr1[3 + i] = matrixo[j][i];
  j++;
  for (let i = 0; i < 3; i++) arr1[6 + i] = matrixo[j][i];
};
const switchXO = () => {
  let arr = [];
  arrCopyConvToNonMatrix(arr);
  for (let i = 0; i < arrOfXO.length; i++) {
    if (!arr[i]) {
      if (switchPlayer) {
        arrOfXO[i].classList.add("oBackground");
        arrOfXO[i].classList.remove("xBackground");
      } else {
        arrOfXO[i].classList.add("xBackground");
        arrOfXO[i].classList.remove("oBackground");
      }
    } else {
      arrOfXO[i].classList.remove("oBackground");
      arrOfXO[i].classList.remove("xBackground");
    }
  }
};
const theWinner = (winner) => {
  if (winner === 1 || winner === 2) {
    whoWinText.textContent = `The Winner is Player ${
      winner === 1 ? "one" : "two"
    }`;
    document.querySelector(".won").classList.remove("hidden");
    document.querySelector(".grid-template").style.zIndex = "-1";
  } else if (winner === 0) {
    whoWinText.textContent = `Draaaww !!!`;
    document.querySelector(".won").classList.remove("hidden");
    document.querySelector(".grid-template").style.zIndex = "-1";
  }
};
const whoWin = () => {
  for (let i = 0; i < 3; i++) {
    let sum = 0;
    for (let j = 0; j < 3; j++) {
      sum += !matrixo[i][j] ? 0 : matrixo[i][j];
    }
    if (sum === 3) {
      return 1;
    } else if (sum === 30) {
      return 2;
    }
  }

  for (let j = 0; j < 3; j++) {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      sum += !matrixo[i][j] ? 0 : matrixo[i][j];
    }
    if (sum === 3) {
      return 1;
    } else if (sum === 30) {
      return 2;
    }
  }
  const valueOfNegSlop =
    (!matrixo[0][2] ? 0 : matrixo[0][2]) +
    (!matrixo[1][1] ? 0 : matrixo[1][1]) +
    (!matrixo[2][0] ? 0 : matrixo[2][0]);
  const valueOfSlop =
    (!matrixo[0][0] ? 0 : matrixo[0][0]) +
    (!matrixo[1][1] ? 0 : matrixo[1][1]) +
    (!matrixo[2][2] ? 0 : matrixo[2][2]);
  if (valueOfSlop === 3) {
    return 1;
  }
  if (valueOfSlop === 30) {
    return 2;
  }

  if (valueOfNegSlop === 3) {
    return 1;
  }
  if (valueOfNegSlop === 30) {
    return 2;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!matrixo[i][j]) {
        return undefined;
      }
    }
  }

  return 0;
};

const arrOfXO = document.querySelectorAll(".s");
let switchPlayer = true;
let whoWinText = document.querySelector(".whowin");

let matrixo = [];
matrixo.push([]);
matrixo.push([]);
matrixo.push([]);

switchXO();

document.getElementById("playagain").addEventListener("click", () => {
  window.location.reload();
});

for (let i = 0; i < arrOfXO.length; i++)
  arrOfXO[i].addEventListener("click", function (e) {
    let index = arrOfXO[i].classList.item(1);

    let index1 = Number(index.charAt(4)) - 1;
    let index2 = Number(index.charAt(10)) - 1;

    setXO(arrOfXO[i], index1, index2); //1:o , 2:x.

    switchPlayer = !switchPlayer;
    switchXO();

    theWinner(whoWin());
  });
