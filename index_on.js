"use strict";
import { gsap } from "gsap";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const SOUND = {};
const svgFiles = ["svg/computer_on_with_menu.svg"];
const svgData = [];
const soundDelay = 1200;
const offDelay = 400;

async function start() {
  console.log("start()");

  HTML.computer = document.querySelector("div#computer");

  // fetch every svg files into svgData[]
  for (let i = 0; i < svgFiles.length; i++) {
    const response = await fetch(svgFiles[i]);
    svgData.push(await response.text());
  }

  // set computer_on_with_menu.svg when it starts
  HTML.computer.innerHTML = svgData[0];

  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");

  // show animation on screenOn path
  clickSound();
  HTML.screenOn = document.querySelector("#screenOn");
  gsap.from(HTML.screenOn, { scaleY: 0.4 });
  gsap.to(HTML.screenOn, { scaleY: 1, duration: 0.4 });

  // set click event on blueBtnOn turned on
  HTML.clickBlueBtnOn = document.querySelector("#blueBtnOn");
  HTML.aboutBtn = document.querySelector("#aboutBtn");
  HTML.usesBtn = document.querySelector("#usesBtn");
  HTML.evolutionBtn = document.querySelector("#evolutionBtn");

  HTML.clickBlueBtnOn.addEventListener("click", clickBlueBtnOn);
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
  gsap.to(HTML.screenOn, { scaleY: 0, duration: 0.5 });

  setTimeout(() => {
    window.location.href = "/index.html";
  }, offDelay);
}

function clickAboutBtn() {
  console.log("clickAboutBtn()");

  selectSound();
  scaleAnimation(HTML.aboutBtn);
  setTimeout(() => {
    window.location.href = "/about.html";
  }, soundDelay);
}

function clickUsesBtn() {
  console.log("clickUsesBtn()");

  selectSound();
  scaleAnimation(HTML.usesBtn);
  setTimeout(() => {
    window.location.href = "/uses.html";
  }, soundDelay);
}

function clickEvolutionBtn() {
  console.log("clickEvolutionBtn()");

  selectSound();
  scaleAnimation(HTML.evolutionBtn);
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

function scaleAnimation(ele) {
  gsap.to(ele, {
    transformOrigin: "center",
    scale: 1.2,
    duration: 1.2
  });
}
