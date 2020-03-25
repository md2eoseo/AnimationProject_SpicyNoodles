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
let clickedSearchBtn = false;

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

  // TODO: start game
}
