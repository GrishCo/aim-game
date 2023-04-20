const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "#ffcc00",
  "#9966cc",
  "#ff3366",
  "#0099ff",
  "#33ff66",
  "#ff6666",
  "#3399ff",
  "#ff33cc",
  "#66ff00",
  "#66ff33",
  "#9933ff",
  "#663399",
  "#ff0066",
  "#ff3399",
  "#ff0099",
  "#ff66ff",
  "#33ff33",
  "#ff9966",
  "#66ff66",
];
let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

// функция начала игры;
function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

// функция отсчет времени;
function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = color;
  circle.style.boxShadow = `0 0 3px ${color}, 0 0 20px ${color}`;

  board.append(circle);
}

// получаем случайный размер в диапозоне min - max;
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// получаем случайный цвет;
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
