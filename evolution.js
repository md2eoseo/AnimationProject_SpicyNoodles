"use strict";
import { gsap } from "gsap";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};
const SOUND = {};
const svgFiles = ["svg/final-timeline.svg", "svg/infobox.svg"];
const svgData = [];
let info = {};

async function start() {
  console.log("start()");

  HTML.timeline = document.querySelector("div#timeline-container");
  HTML.infobox = document.querySelector("div#infobox-container");

  // fetch every svg files into svgData[]
  for (let i = 0; i < svgFiles.length; i++) {
    const response = await fetch(svgFiles[i]);
    svgData.push(await response.text());
  }

  // set final_timeline.svg and infobox.svg when it starts
  HTML.timeline.innerHTML = svgData[0];
  HTML.infobox.innerHTML = svgData[1];

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

  // select bullets and add click event
  document.querySelectorAll(".st1").forEach((ele, i) =>
    ele.addEventListener("click", e => {
      // modifying infobox with selected info data
      document.querySelector("text#title").innerHTML = info[i].title;
      document.querySelector("text#year").innerHTML = info[i].year;
      document.querySelector("text#description").innerHTML =
        info[i].description;
      document.querySelector(
        "image#image"
      ).href.baseVal = `img/${info[i].image}`;

      // move infoline
      HTML.infoline = document.querySelector("#timeline-container #infoline");
      HTML.infoline.setAttribute("x1", Math.floor(ele.cx.baseVal.value));
      HTML.infoline.setAttribute(
        "y1",
        Math.floor(ele.cy.baseVal.value - 13.91)
      );
      HTML.infoline.setAttribute("x2", HTML.infoline.x1.baseVal.value);
      HTML.infoline.setAttribute("y2", HTML.infoline.y1.baseVal.value - 80);

      // move infobox
      // https://stackoverflow.com/questions/479591/svg-positioning
      //   HTML.infobox.setAttribute(
      //     "transform",
      //     `translate(${HTML.line.x2.baseVal.value - 25},${HTML.line.y2.baseVal
      //       .value + 327})`
      //   );
    })
  );
}
