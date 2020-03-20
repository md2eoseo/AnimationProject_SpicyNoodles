"use strict";
import { gsap } from "gsap";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const svgFiles = ["svg/computer_off.svg", "svg/computer_on.svg"];
const svgData = [];

async function start() {
  HTML.computer = document.querySelector("div#computer");

  for (let i = 0; i < svgFiles.length; i++) {
    const response = await fetch(svgFiles[i]);
    svgData.push(await response.text());
  }

  HTML.computer.innerHTML = svgData[0];

  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");
  HTML.computer_off = document.querySelector("#computer_off");
  HTML.blueBtn = document.querySelector("#blue_button");

  HTML.blueBtn.addEventListener("click", clickBlueBtn);
}

function clickBlueBtn() {
  console.log("clicked blue button");
  HTML.computer.innerHTML = svgData[1];

  HTML.screen_on = document.querySelector("#screen_on");
  gsap.from(HTML.screen_on, { scaleY: 0.4 });
  gsap.to(HTML.screen_on, { scaleY: 1, duration: 0.4 });

  HTML.screen_on.addEventListener("click", selectMenu);
}

function selectMenu() {
  console.log("selected menu");
  HTML.computer_on = document.querySelector("#computer_on");

  gsap.to(HTML.computer_on, { scale: 2, duration: 2 });

  // HTML.computer_on.addEventListener("animationend", function() {
  //   HTML.computer.innerHTML = "";
  //   HTML.computer.style.backgroundColor = "#0D5D5A";
  // });
}
