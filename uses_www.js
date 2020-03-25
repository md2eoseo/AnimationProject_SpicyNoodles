"use strict";
import { gsap } from "gsap";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const SOUND = {};
SOUND.typespace = new Audio("sound/typespace.mp3");
SOUND.typekey1 = new Audio("sound/typekey1.mp3");
SOUND.typekey2 = new Audio("sound/typekey2.mp3");
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
  HTML.googlescreen = document.querySelector("#googlescreen");
  HTML.searchBtn = document.querySelector("#searchBtn");
  HTML.searchkey = document.querySelector("#searchkey");

  gsap.from(HTML.googlescreen, { scaleY: 0.4 });
  gsap.to(HTML.googlescreen, { scaleY: 1, duration: 0.4 });

  HTML.searchBtn.addEventListener("click", clickSearchBtn);

  typingSearchkey();
}

function clickSearchBtn() {
  console.log("clickSearchBtn()");

  HTML.computer.innerHTML = svgData[1];
}

function typingSearchkey() {
  console.log("typingSearchkey()");

  let i = 0,
    cursor = false;
  const searchkey = HTML.searchkey.textContent;
  HTML.searchkey.textContent = "";
  typing();

  // https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
  function typing() {
    if (i < searchkey.length) {
      typingSound(searchkey[i]);
      HTML.searchkey.textContent = searchkey.slice(0, i++);
      setTimeout(function() {
        typing();
      }, 100);
    } else {
      if (!cursor) {
        HTML.searchkey.textContent = searchkey.slice(0);
        cursor = true;
      } else {
        HTML.searchkey.textContent = searchkey.slice(0, -true);
        cursor = false;
      }
      setTimeout(function() {
        typing();
      }, 800);
    }
  }
}

function typingSound(char) {
  console.log("typingSound()");

  if (char === " ") SOUND.typespace.play();
  else if (char.charCodeAt(0) % 2 === 0) SOUND.typekey1.play();
  else if (char.charCodeAt(0) % 2 === 1) SOUND.typekey2.play();
}
