"use strict";
require("@babel/polyfill");

window.addEventListener("DOMContentLoaded", start);

const HTML = {};

async function start() {
  const response = await fetch("svg/computer_off.svg");
  const svgData = await response.text();
  document.querySelector("section").innerHTML = svgData;
  startManipulatingTheSvg();
}

function startManipulatingTheSvg() {
  console.log("startManipulatingTheSvg()");
  // HTML.colors = document.querySelectorAll(".st2, .st3, .st4");
  // HTML.shapes = document.querySelectorAll(".st5");

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
