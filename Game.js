let gameSeq = [];
let userSeq = [];
let HighestScore=0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", function () {

  if (!started) {

    console.log("game is started");

    started = true;

    startBtn.style.display = "none";

    levelUp();
  }

});

function gameFlash(btn) {
   if (level != 0) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 500)};
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 500);
}

function levelUp() {
  userSeq = [];
  level++;
 h2.innerHTML = `Level ${level}<br>Highest Score: <b>${HighestScore}</b>`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else if (level!=0) {
    if(level > HighestScore) {
      HighestScore = level;
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Highest Score:<b>${HighestScore}</b> <br> Click Start Game to play again.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 500);
    showRandomFact();
    reset();
  }
}

function btnPress() {

  if (!started) {
    return;
  }

  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
async function showRandomFact() {
    let factElement = document.getElementById("fact");
    factElement.innerHTML = "Loading a random fact...";

    try {
        let response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
        let data = await response.json();

        factElement.innerHTML = `💡 <strong>Random Fact:</strong> ${data.text}`;
    } catch (err) {
        factElement.innerHTML = "Couldn't load a random fact.";
        console.error(err);
    }
}
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;

  startBtn.style.display = "block";
  h2.innerHTML = "Press Start to play the game";
}
