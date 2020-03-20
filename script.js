"use strict";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const svgFiles = ["svg/computer_off.svg", "svg/computer_on.svg"];
const svgData = [];

async function start() {
  HTML.section = document.querySelector("section");

  for (let i = 0; i < svgFiles.length; i++) {
    const response = await fetch(svgFiles[i]);
    svgData.push(await response.text());
  }

  HTML.section.innerHTML = svgData[0];

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
  HTML.section.innerHTML = svgData[1];

  HTML.screen_on = document.querySelector("#screen_on");

  HTML.screen_on.addEventListener("click", selectMenu);
}

function selectMenu() {
  console.log("selected menu");

  HTML.screen_on.classList.add("zoom");
  // HTML.section.innerHTML = "";
  // HTML.section.style.backgroundColor = "#0D5D5A";
}
