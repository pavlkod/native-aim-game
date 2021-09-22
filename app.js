const $startBtn = document.getElementById("start");
const $timeList = document.getElementById("time-list");
const screens = document.querySelectorAll(".screen");

const clickBtnHandler = e => {
  e.preventDefault();
  screens[0].classList.add("up");
};
$startBtn.addEventListener("click", clickBtnHandler);

let score = 0;
const $board = document.getElementById("board");
const clickBoardHandler = e => {
  const { target } = e;
  if (target.classList.contains("circle")) {
    score++;
    target.remove();
    createRandomCircle();
  }
};
$board.addEventListener("click", clickBoardHandler);

let time = 0;
let interval = null;
const $time = document.getElementById("time");
const startGame = () => {
  interval = setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTimeToHtml();
};
const decreaseTime = () => {
  if (time === 0) {
    finishGame();
  } else {
    --time;
    setTimeToHtml();
  }
};
const finishGame = () => {
  clearInterval(interval);
  $time.parentElement.classList.add("hide");
  $board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;
};
const colors = ["red", "blue", "green", "orange", "purple"];
const createRandomCircle = () => {
  const $circle = document.createElement("div");
  const { width, height } = $board.getBoundingClientRect();
  const size = getRandomNumber(20, 80);
  const [x, y] = [getRandomNumber(0, width - size), getRandomNumber(0, height - size)];
  const color = colors[getRandomNumber(0, colors.length - 1)];

  $circle.classList.add("circle");
  $circle.style.width = `${size}px`;
  $circle.style.height = `${size}px`;
  $circle.style.top = `${y}px`;
  $circle.style.left = `${x}px`;
  $circle.style.background = color;
  $circle.style.boxShadow = `0px 0px 4px ${color}, 0px 0px 6px ${color}`;
  $board.append($circle);
};
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const setTimeToHtml = () => {
  $time.textContent = `00:${time.toString().padStart(2, 0)}`;
};

const clickTimeHandler = e => {
  const { target } = e;
  if (target.classList.contains("time-btn")) {
    time = +target.dataset.time;
    screens[1].classList.add("up");
    startGame();
  }
};
$timeList.addEventListener("click", clickTimeHandler);
