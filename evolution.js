"use strict";
import { gsap } from "gsap";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const SOUND = {};
const svgFiles = ["svg/evolution.svg"];
const svgData = [];
let info = {};

async function start() {
  console.log("start()");

  // fetch every svg files into svgData[]
  for (let i = 0; i < svgFiles.length; i++) {
    const response = await fetch(svgFiles[i]);
    svgData.push(await response.text());
  }

  // set evolution.svg when it starts
  document.querySelector("#evolution-container").innerHTML = svgData[0];

  loadJSON();
}

async function loadJSON() {
  console.log("loadJSON()");

  const response = await fetch("json/evolution.json");
  info = await response.json();

  clickable();
}

function clickable() {
  console.log("clickable()");

  // home, back button click event
  document
    .querySelector("#home-button")
    .addEventListener("click", goIndexOnHTML);
  document
    .querySelector("#back-button")
    .addEventListener("click", goIndexOnHTML);

  // select bullets and add click event
  document.querySelectorAll("#bullets circle").forEach((ele, i) =>
    ele.addEventListener("click", function() {
      clickBullet(ele, i);
    })
  );
}

function goIndexOnHTML() {
  window.location.href = "./index_on.html";
}

function clickBullet(ele, i) {
  console.log("clickBullet()");

  // modifying infobox with selected info data
  document.querySelector("#title").innerHTML = info[i].title;
  document.querySelector("#description").innerHTML = info[i].description;
  document.querySelector("#image").href.baseVal = `img/${info[i].image}`;

  // remove .hide from #infobox
  document.querySelector("#infobox").classList.remove("hide");

  // move infoline
  HTML.infoline = document.querySelector("#infoline");
  HTML.infoline.setAttribute("x1", Math.floor(ele.cx.baseVal.value));
  HTML.infoline.setAttribute(
    "y1",
    Math.floor(ele.cy.baseVal.value - ele.r.baseVal.value)
  );
  HTML.infoline.setAttribute("x2", HTML.infoline.x1.baseVal.value);
  HTML.infoline.setAttribute("y2", HTML.infoline.y1.baseVal.value - 40);
}
