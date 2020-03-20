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
  HTML.blue_button = document.querySelector("#blue_button");

  HTML.blue_button.addEventListener("click", function() {
    console.log("clicked blue button");
    HTML.section.innerHTML = svgData[1];
  });

  // HTML.colors.forEach(ele =>
  //   ele.addEventListener("click", function(e) {
  //     console.log("colors!!");
  //     color = ele.getAttribute("fill");
  //   })
  // );
  // HTML.shapes.forEach(ele =>
  //   ele.addEventListener("click", function(e) {
  //     console.log("shapes!!");
  //     ele.style.fill = color;
  //   })
  // );
}
