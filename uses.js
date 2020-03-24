"use strict";
import { gsap } from "gsap";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const SOUND = {};
const svgFiles = [
  "svg/computer_off.svg",
  "svg/computer_on_with_menu.svg",
  "svg/screen_zoomed.svg"
];
const svgData = [];

async function start() {
  console.log("start()");

  HTML.computer = document.querySelector("div#computer");

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

  HTML.blueBtn = document.querySelector("#blueBtn");
  HTML.blueBtn.addEventListener("click", clickBlueBtn);
}
