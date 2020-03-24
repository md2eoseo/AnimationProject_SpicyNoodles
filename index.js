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
const soundDelay = 1800;
const offDelay = 400;

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

  document.querySelector("#blueBtn").addEventListener("click", clickBlueBtn);
}

function clickBlueBtn() {
  console.log("clickBlueBtn()");

  // audio effect
  clickSound();

  // set computer_on.svg when clicks blue button on computer_off.svg
  HTML.computer.innerHTML = svgData[1];

  // set click event on blueBtn turned on
  document
    .querySelector("#blueBtnOn")
    .addEventListener("click", clickBlueBtnOn);

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

function clickBlueBtnOn() {
  console.log("clickBlueBtnOn()");

  // audio effect
  clickSound();

  // show animation on screenOn path
  gsap.from(HTML.screenOn, { scaleY: 1 });
  gsap.to(HTML.screenOn, { scaleY: 0, duration: 0.4 });

  setTimeout(() => {
    // set computer_on.svg when clicks blue button on computer_off.svg
    HTML.computer.innerHTML = svgData[0];

    // set click event on blueBtn turned off
    document.querySelector("#blueBtn").addEventListener("click", clickBlueBtn);
  }, offDelay);
}

function clickAboutBtn() {
  console.log("clickAboutBtn()");

  selectSound();
  setTimeout(() => {
    window.location.href = "/about.html";
  }, soundDelay);
}

function clickUsesBtn() {
  console.log("clickUsesBtn()");

  selectSound();
  setTimeout(() => {
    window.location.href = "/uses.html";
  }, soundDelay);
}

function clickEvolutionBtn() {
  console.log("clickEvolutionBtn()");

  selectSound();
  setTimeout(() => {
    window.location.href = "/evolution.html";
  }, soundDelay);
}

function clickSound() {
  console.log("clickSound()");

  SOUND.blueBtn = new Audio("sound/blueBtn.wav");
  SOUND.blueBtn.play();
}

function selectSound() {
  console.log("selectSound()");

  SOUND.selectBtn = new Audio("sound/selectBtn.wav");
  SOUND.selectBtn.play();
}

function selectMenu() {
  console.log("selectMenu()");

  // set screen_zoomed.svg fully in div#computer
  HTML.computer.style.width = "60vw";
  HTML.computer.innerHTML = svgData[2];
}
