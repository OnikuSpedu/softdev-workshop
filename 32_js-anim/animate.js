const c = document.getElementById("slate");
const dotButton = document.getElementById("dotButton");
const stopButton = document.getElementById("stopButton");
const saverButton = document.getElementById("saverButton");

const ctx = c.getContext("2d");
ctx.fillStyle = "red";

var mode;

var requestID;

var clear = (e) => ctx.clearRect(0,0,c.width, c.height);

const IMG_WIDTH = 150;
const IMG_HEIGHT = 100;

var img = new Image();
img.src = 'logo_dvd.jpg';

var radius = 0;
var growing = true;

var x = 0;
var y = 0;

var Vx = 1;
var Vy = 1;

var drawDot = function () {
  if (requestID) {
      window.cancelAnimationFrame(requestID);
  }

  if (growing && radius >= c.width / 2) {
    growing = false;
  }

  if (!growing && radius <= 0) {
    growing = true;
  }

  if (growing) {
    radius++;
  } else {
    radius--;
  }

  clear();

  ctx.beginPath();
  ctx.arc(c.width / 2, c.height / 2, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  requestID = window.requestAnimationFrame(drawDot);
};


function drawImage() {
  clear();

  if (requestID) {
      window.cancelAnimationFrame(requestID);
  }

  x += Vx;
  y += Vy;

  ctx.drawImage(img, x, y, IMG_WIDTH, IMG_HEIGHT);

  requestID = window.requestAnimationFrame(drawImage);
}

function drawInitialImage() {
  clear();

  if (requestID) {
      window.cancelAnimationFrame(requestID);
  }

  x = Math.floor(Math.random() * (c.width - IMG_WIDTH)) 
  y = Math.floor(Math.random() * (c.height - IMG_HEIGHT)) 

  ctx.drawImage(img, x, y, IMG_WIDTH, IMG_HEIGHT);

  requestID = window.requestAnimationFrame(drawImage);
}

var stopIt = () => {
    console.log("stopIy invoked..");
    console.log(requestID);

    window.cancelAnimationFrame(requestID);
}

dotButton.addEventListener("click", drawDot);
saverButton.addEventListener("click", drawInitialImage);
stopButton.addEventListener("click", stopIt);
