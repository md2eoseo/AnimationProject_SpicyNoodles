"use strict";
import { gsap } from "gsap";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const SOUND = {};
const svgFiles = ["svg/screenUses.svg"];
const svgData = [];
const soundDelay = 1200;

async function start() {
  console.log("start()");

  HTML.computer = document.querySelector("#computer");

  // fetch every svg files into svgData[]
  for (let i = 0; i < svgFiles.length; i++) {
    const response = await fetch(svgFiles[i]);
    svgData.push(await response.text());
  }

  // set computer_off.svg when it starts
  HTML.computer.innerHTML = svgData[0];

  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");

  // show animation on screenOn path
  HTML.screenOn = document.querySelector("#screenOn");
  HTML.wwwBtn = document.querySelector("#wwwBtn");
  HTML.gamesBtn = document.querySelector("#gamesBtn");
  HTML.homeofficeBtn = document.querySelector("#homeofficeBtn");

  gsap.from(HTML.screenOn, { scaleY: 0.4 });
  gsap.to(HTML.screenOn, { scaleY: 1, duration: 0.4 });

  HTML.wwwBtn.addEventListener("click", clickWwwBtn);
  HTML.gamesBtn.addEventListener("click", clickGamesBtn);
  HTML.homeofficeBtn.addEventListener("click", clickHomeofficeBtn);
}

function clickWwwBtn() {
  console.log("clickWwwBtn()");

  selectSound();
  scaleAnimation(HTML.wwwBtn);
  setTimeout(() => {
    window.location.href = "/uses_www.html";
  }, soundDelay);
}

function clickGamesBtn() {
  console.log("clickGamesBtn()");

  selectSound();
  scaleAnimation(HTML.gamesBtn);
  setTimeout(() => {
    window.location.href = "/uses_games.html";
  }, soundDelay);
}

function clickHomeofficeBtn() {
  console.log("clickHomeofficeBtn()");

  selectSound();
  scaleAnimation(HTML.homeofficeBtn);
  setTimeout(() => {
    window.location.href = "/call.html";
  }, soundDelay);
}

function selectSound() {
  console.log("selectSound()");

  SOUND.selectBtn = new Audio("sound/selectBtn.wav");
  SOUND.selectBtn.play();
}

function scaleAnimation(ele) {
  gsap.to(ele, {
    transformOrigin: "center",
    scale: 1.2,
    duration: 1.2
  });
}
