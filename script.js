const ruleCancelDiv = document.getElementById("hideRulesBtn");
const showRuleBtn = document.getElementById("showRulesBtn");
const header = document.getElementById("header");
const userCount = document.getElementById("userCount");
const computerCount = document.getElementById("computerCount");
const firstScreen = document.getElementById("firstScreen");
const resultContainer = document.getElementById("resultContainer");
const userSelectOuter = document.getElementById("userSelectOuter");
const userSelectInner = document.getElementById("userSelectInner");
const pcSelectOuter = document.getElementById("pcSelectOuter");
const pcSelectInner = document.getElementById("pcSelectInner");
const resultHeading = document.getElementById("resultHeading");
const againText = document.getElementById("againText");
const playAgainBtn = document.getElementById("playAgainBtn");
const playAgain2 = document.getElementById("playAgain2");
const nextBtn = document.getElementById("nextBtn");
const winnerContainer = document.getElementById("winnerTemplate");
const resultContainer2 = document.getElementById("content1");

showRuleBtn.addEventListener("click", () => {
  document.getElementById("gameRuleContainerParent").style.display = "block";
});
ruleCancelDiv.addEventListener("click", () => {
  console.log("dfssgs");

  document.getElementById("gameRuleContainerParent").style.display = "none";
});

function chooseOne(id) {
  let randNum = randomNum();
  console.log({ id, randNum });

  if (id === randNum) {
    console.log(randNum);

    updateWinnerScreen(id, randNum, "tie");
    console.log("game is tied");
  } else if (
    (id === 1 && randNum === 2) ||
    (id == 2 && randNum === 3) ||
    (id == 3 && randNum === 1)
  ) {
    console.log({ id, randNum });

    updateWinnerScreen(id, randNum, "user");
    console.log("user won");
  } else if (
    (id === 1 && randNum === 3) ||
    (id == 2 && randNum === 1) ||
    (id == 3 && randNum === 2)
  ) {
    updateWinnerScreen(id, randNum, "pc");
    console.log("pc won");
  }

  if (id === 1) {
    console.log("you choose Rock");
  } else if (id === 2) {
    console.log("you choose Scissors");
  } else {
    console.log("you choose Paper");
  }
}

const outerLayer = {
  1: "./IMG/blueCircle.svg",
  2: "./IMG/violetCircle.svg",
  3: "./IMG/yellowCircle.svg",
};
const innerObject = {
  1: "./IMG/rock.svg",
  2: "./IMG/scissor.svg",
  3: "./IMG/paper.svg",
};

function updateScoreScreen() {
  let getScore = JSON.parse(localStorage.getItem("gameScore"));
  console.log(getScore.user);
  userCount.innerText = getScore.user;
  computerCount.innerText = getScore.pc;
}

function updateWinnerScreen(id, randNum, winner) {
  console.log("inside", { id, randNum, winner });
  firstScreen.classList.remove("displayBlock");
  firstScreen.classList.add("displayNone");
  resultContainer.classList.remove("displayNone");
  resultContainer.classList.add("displayBlock");
  if (winner === "tie") {
    resultHeading.innerText = "TIE UP";
    againText.style.display = "none";
    userSelectOuter.src = outerLayer[id];
    pcSelectOuter.src = outerLayer[randNum];
    userSelectInner.src = innerObject[id];
    pcSelectInner.src = innerObject[randNum];
    updateScore("tie");
    updateScoreScreen();

  } else if (winner === "user") {
    // update score
    resultHeading.innerText = "USER WON";
    // againText.style.display = "none";
    againText.style.innerText = "AGAINST PC";
    userSelectOuter.src = outerLayer[id];
    pcSelectOuter.src = outerLayer[randNum];
    userSelectInner.src = innerObject[id];
    pcSelectInner.src = innerObject[randNum];
    console.log(userSelectOuter.parentElement);

    userSelectOuter.parentElement.classList.add("winnneranimation");
    nextBtn.style.display = "block";

    updateScore("user");
    updateScoreScreen();

  } else if (winner === "pc") {
    resultHeading.innerText = "YOU LOST";
    // againText.style.display = "none";
    againText.style.innerText = "AGAINST PC";
    userSelectOuter.src = outerLayer[id];
    pcSelectOuter.src = outerLayer[randNum];
    userSelectInner.src = innerObject[id];
    pcSelectInner.src = innerObject[randNum];
    pcSelectOuter.parentElement.classList.add("winnneranimation");
    updateScore("pc");
    updateScoreScreen();

  }
}
function PlayAgain() {
  firstScreen.classList.remove("displayNone");
  resultContainer.classList.remove("displayBlock");
  firstScreen.classList.add("displayBlock");
  winnerContainer.classList.remove("displayBlock");
  winnerContainer.classList.add("displayNone");
  resultContainer.classList.add("displayNone");
  resultContainer2.style.display = "block";
  header.style.display = "block";
  againText.style.display = "block";
  resultHeading.innerText = "";
  userSelectOuter.parentElement.classList.remove("winnneranimation");
  pcSelectOuter.parentElement.classList.remove("winnneranimation");
  nextBtn.style.display = "none";
}

nextBtn.addEventListener("click", () => {
  winnerContainer.classList.remove("displayNone");
  document.getElementById("gameRuleContainerParent").style.display = "none";
  resultContainer.classList.remove("diplayBlock");
  resultContainer.classList.add("displayNone");
  header.style.display = "none";
  resultContainer2.style.display = "none";
  nextBtn.style.display = "none";
});
function randomNum() {
  return Math.floor(Math.random() * 3 + 1);
}

//localstorage
function updateScore(val) {
  let getScore = JSON.parse(localStorage.getItem("gameScore")) || {
    user: 0,
    pc: 0,
  };
  let userScore = getScore.user ?? 0;
  let pcScore = getScore.pc ?? 0;

  if (val === "user") {
    userScore += 1;
  } else if (val === "pc") {
    pcScore += 1;
  } else if (val === "tie") {
    userScore += 1;
    pcScore += 1;
  }
  let gameScores = {
    user: userScore,
    pc: pcScore,
  };

  localStorage.setItem("gameScore", JSON.stringify(gameScores));
}


window.onload = function () {
  updateScore();
  updateScoreScreen();
};