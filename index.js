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

function clickBlueBtn() {
  console.log("clickBlueBtn()");

  // audio effect
  SOUND.blueBtn = new Audio("sound/blueBtn.wav");
  SOUND.blueBtn.play();

  // set computer_on.svg when clicks blue button on computer_off.svg
  HTML.computer.innerHTML = svgData[1];

  // show animation on screenOn path
  HTML.screenOn = document.querySelector("#screenOn");
  HTML.aboutBtn = document.querySelector("#aboutBtn");
  HTML.usesBtn = document.querySelector("#usesBtn");
  HTML.evolutionBtn = document.querySelector("#evolutionBtn");

  gsap.from(HTML.screenOn, { scaleY: 0.4 });
  gsap.to(HTML.screenOn, { scaleY: 1, duration: 0.4 });

  HTML.aboutBtn.addEventListener("click", clickAboutBtn);
  HTML.usesBtn.addEventListener("click", clickUsesBtn);
  HTML.evolutionBtn.addEventListener("click", clickEvolutionBtn);
}

function clickAboutBtn() {
  console.log("clickAboutBtn()");

  window.location.href = "/about.html";
}

function clickUsesBtn() {
  console.log("clickUsesBtn()");

  window.location.href = "/uses.html";
}

function clickEvolutionBtn() {
  console.log("clickEvolutionBtn()");

  window.location.href = "/evolution.html";
}

function selectMenu() {
  console.log("selectMenu()");

  // set screen_zoomed.svg fully in div#computer
  HTML.computer.style.width = "60vw";
  HTML.computer.innerHTML = svgData[2];
}
