"use strict";
import { gsap } from "gsap";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const SOUND = {};
const svgFiles = ["svg/screenUses.svg"];
const svgData = [];

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

  window.location.href = "/uses_www.html";
}

function clickGamesBtn() {
  console.log("clickGamesBtn()");

  window.location.href = "/uses_games.html";
}

function clickHomeofficeBtn() {
  console.log("clickHomeofficeBtn()");

  window.location.href = "/uses_homeoffice.html";
}
