"use strict";
import { gsap } from "gsap";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const SOUND = {};
SOUND.typespace = new Audio("sound/typespace.mp3");
SOUND.typekey1 = new Audio("sound/typekey1.mp3");
SOUND.typekey2 = new Audio("sound/typekey2.mp3");
const svgFiles = ["svg/screenZoomed.svg"];
const svgData = [];
const soundDelay = 1800;

async function start() {
  console.log("start()");

  HTML.computer = document.querySelector("#computer");

  // fetch every svg files into svgData[]
  for (let i = 0; i < svgFiles.length; i++) {
    const response = await fetch(svgFiles[i]);
    svgData.push(await response.text());
  }

  // set screenZoomed.svg when it starts
  HTML.computer.innerHTML = svgData[0];

  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");

  // show animation on screenOn path
  HTML.screenOn = document.querySelector("#screenOn");

  gsap.from(HTML.screenOn, { scaleY: 0.4 });
  gsap.to(HTML.screenOn, { scaleY: 1, duration: 0.4 });

  // start game
  startGame();
}

// https://www.tutorialspoint.com/svg/game.htm
function startGame() {
  const svgns = "http://www.w3.org/2000/svg",
    svg = document.createElementNS(svgns, "svg"),
    rectSize = 26,
    matrixSize = 10,
    matrixLimit = matrixSize - 1;
  let speedMs = 250,
    apple = [];
  svg.setAttributeNS(null, "id", "gameScreen");
  svg.setAttributeNS(null, "width", rectSize * matrixSize);
  svg.setAttributeNS(null, "height", rectSize * matrixSize);
  svg.setAttributeNS(
    null,
    "style",
    "border: " + rectSize / 3 + "px solid #ccc;"
  );
  document.querySelector("#game").appendChild(svg);
  let currentX = -1,
    currentY = 0,
    nextMoveX = 1,
    nextMoveY = 0,
    snakeL = 5,
    swipe = 0,
    rectArray = [],
    gameIsOver = false;

  function drawPoint(x, y) {
    let rect = [document.createElementNS(svgns, "rect"), x, y];
    let rectObj = rect[0];
    rectObj.setAttributeNS(null, "x", x * rectSize);
    rectObj.setAttributeNS(null, "y", y * rectSize);
    rectObj.setAttributeNS(null, "height", rectSize);
    rectObj.setAttributeNS(null, "width", rectSize);
    rectObj.setAttributeNS(null, "class", "snake");
    rectArray.push(rect);
    svg.appendChild(rectObj);
    if (rectArray.length > snakeL) {
      svg.removeChild(rectArray[0][0]);
      rectArray.shift();
    }
  }

  function setApple() {
    let appleX = Math.floor(Math.random() * matrixSize),
      appleY = Math.floor(Math.random() * matrixSize);
    apple = [document.createElementNS(svgns, "rect"), appleX, appleY];
    let thisApple = apple[0];
    thisApple.setAttributeNS(null, "x", appleX * rectSize);
    thisApple.setAttributeNS(null, "y", appleY * rectSize);
    thisApple.setAttributeNS(null, "height", rectSize);
    thisApple.setAttributeNS(null, "width", rectSize);
    thisApple.setAttributeNS(null, "class", "apple");
    svg.appendChild(thisApple);
  }

  function gameOver() {
    svg.setAttributeNS(null, "class", "game-over");
    clearInterval(timing);
    // alert("GAME OVER!\nYour result is " + snakeL + "!");
    const gameoverText = document.createElementNS(svgns, "text");
    gameoverText.setAttributeNS(null, "x", 20);
    gameoverText.setAttributeNS(null, "y", 120);
    gameoverText.textContent = "GAME OVER!\nYour result is " + snakeL + "!";
    document.querySelector("#gameScreen").appendChild(gameoverText);
    gameIsOver = true;
    return;
  }

  let timing = setInterval(controllingSnake, speedMs);

  function controllingSnake() {
    let nextX = currentX + nextMoveX,
      nextY = currentY + nextMoveY;
    rectArray.forEach(function(element) {
      if (nextX === element[1] && nextY === element[2]) {
        gameOver();
      }
    });
    if (nextY < 0 || nextY > matrixLimit || nextX < 0 || nextX > matrixLimit) {
      gameOver();
    }
    if (!gameIsOver) {
      if (currentX === apple[1] && currentY === apple[2]) {
        snakeL++;
        svg.removeChild(apple[0]);
        setApple();
      }
      drawPoint(nextX, nextY);
      currentX = nextX;
      currentY = nextY;
    }
  }

  function changeDirection(dirCode) {
    switch (dirCode) {
      case 37:
        if (nextMoveX !== 1) {
          nextMoveX = -1;
          nextMoveY = 0;
        }
        break;
      case 38:
        if (nextMoveY !== 1) {
          nextMoveX = 0;
          nextMoveY = -1;
        }
        break;
      case 39:
        if (nextMoveX !== -1) {
          nextMoveX = 1;
          nextMoveY = 0;
        }
        break;
      case 40:
        if (nextMoveY !== -1) {
          nextMoveX = 0;
          nextMoveY = 1;
        }
    }
  }

  document.onkeydown = checkKey;

  function checkKey(evt) {
    evt = evt || window.event;
    changeDirection(evt.keyCode);
  }

  function is_touch_device() {
    return (
      "ontouchstart" in window ||
      navigator.MaxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  let tStartX = null;
  let tStartY = null;
  function startup() {
    if (true) {
      document.body.addEventListener("touchstart", handleStart, false);
      document.body.addEventListener("touchend", handleEnd, false);
    } else {
      console.log("Is not touch device");
    }
  }

  function handleStart(evt) {
    // evt.preventDefault();
    tStartX = evt.touches[0].screenX;
    tStartY = evt.touches[0].screenY;
  }

  function handleEnd(evt) {
    evt.preventDefault();
    let tEndX = evt.changedTouches[0].screenX,
      tEndY = evt.changedTouches[0].screenY,
      totalX = tStartX - tEndX,
      totalY = tStartY - tEndY;
    if (Math.abs(totalX) > Math.abs(totalY)) {
      swipe = totalX >= 0 ? 37 : 39;
    } else {
      swipe = totalY >= 0 ? 38 : 40;
    }
    changeDirection(swipe);
  }

  setApple();
  startup();
}
