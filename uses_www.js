"use strict";
import { gsap } from "gsap";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const SOUND = {};
const svgFiles = ["svg/usesWww_1.svg", "svg/usesWww_2.svg"];
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

  // set usesWww_1.svg when it starts
  HTML.computer.innerHTML = svgData[0];

  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");

  // show animation on screenOn path
  HTML.screenOn = document.querySelector("#screenOn");
  HTML.searchBtn = document.querySelector("#searchBtn");

  gsap.from(HTML.screenOn, { scaleY: 0.4 });
  gsap.to(HTML.screenOn, { scaleY: 1, duration: 0.4 });

  HTML.searchBtn.addEventListener("click", clickSearchBtn);
}

function clickSearchBtn() {
  console.log("clickSearchBtn()");

  HTML.computer.innerHTML = svgData[1];
}

function selectSound() {
  console.log("selectSound()");

  SOUND.selectBtn = new Audio("sound/selectBtn.wav");
  SOUND.selectBtn.play();
}
