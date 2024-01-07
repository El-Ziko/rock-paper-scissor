alert('if you want to use keybord you can type 1 for the rock and 2 for the paper and 3 for the scissors also you can type "a" for the auto play and the "Backspace button" for the rest score enjoy !!');
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losts: 0,
  ties: 0,
};
let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = picComputerMove();
      playGame(playerMove);
    }, 100);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
  if (button.innerHTML === "Auto play") {
    button.innerHTML = "Stop";
  } else {
    button.innerHTML = "Auto play";
  }
}

const button = document.querySelector(".js-auto-button");
button.addEventListener("click", () => {
  autoPlay();
});
document.body.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    autoPlay();
  } else if (event.key === "1") {
    playGame("Rock");
  } else if (event.key === "2") {
    playGame("Paper");
  } else if (event.key === "3") {
    playGame("Scissor");
  }
});
const button2 = document.querySelector(".js-rest-button");
document.body.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    yesOrNo();
    div.innerHTML = html;
  }
});
button2.addEventListener("click", () => {
  score.wins = 0;
  score.losts = 0;
  score.ties = 0;
  updareScoreElement();
  localStorage.setItem('score',JSON.stringify(score))

});
const div = document.querySelector(".div2");
const html = `<p>Are you sure you want to reset the score?</p>
<p><button class='js-button-bottom' onclick="yesOrNo('yes')">Yes</button><button class='js-button-bottom' onclick="yesOrNo('no')">No</button></p>`;
function yesOrNo(param) {
  if (param === "yes") {
    score.wins = 0;
    score.losts = 0;
    score.ties = 0;
    updareScoreElement();
    localStorage.setItem('score',JSON.stringify(score))
    div.innerHTML = "";
  } else {
    div.innerHTML = "";
    updareScoreElement();
  }
}

updareScoreElement();

function playGame(playerMove) {
  const computerMove = picComputerMove();
  let result = "";

  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Scissor") {
      result = "You win.";
    } else {
      result = "You lost.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Rock") {
      result = "You win.";
    } else {
      result = "You lost.";
    }
  } else if (playerMove === "Scissor") {
    if (computerMove === "Scissor") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You win.";
    } else {
      result = "You lost.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lost.") {
    score.losts += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updareScoreElement();
  document.querySelector("#js-result").innerHTML = `${result}`;
  document.querySelector(
    "#js-move"
  ).innerHTML = `<i class="fa-solid fa-computer"></i> Move ==> <img class='img-png'  src="${computerMove}-emoji.png"/><img class='img-png' src="${playerMove}-emoji.png"/> <== Your Move`;
}
function picComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Scissor";
  } else {
    computerMove = "Paper";
  }
  return computerMove;
}
function updareScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${score.wins}, Losts:${score.losts}, Ties:${score.ties}`;
}
