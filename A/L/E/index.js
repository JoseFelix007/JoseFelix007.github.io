const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_XLINK = "http://www.w3.org/1999/xlink";
let rid = null;
let gon = 8;// 3,4,5,6....

const colors = [
  "#ebca10",
  "#d3bd40",
  "#dbd2b0",
  "#fdfada",
  "#ffffb0",
  "#fff647",
  "#cac080",
  "#e9e8d8"
];

let m = { x: 0, y: 0 };
let previous = { x: 0, y: 0 };
let scale = 1;
let bool = false;

class Flower {
  constructor(n, pos, scale, parent) {
    this.n = n;
    this.scale = scale;
    this.pos = pos;
    this.width = 30;
    this.height = 30;
    this.color = colors[~~(Math.random() * colors.length)];
    this.parent = parent;

    this.markup();
  }

  markup() {
    this.G = document.createElementNS(SVG_NS, "g");
    this.G.setAttribute("style", `--scale:${this.scale};`);
    let rot = ~~(Math.random() * 180);
    this.G.setAttributeNS(
      null,
      "transform",
      `translate(${this.pos.x},${this.pos.y}) rotate(${rot})`
    );
    this.G.setAttributeNS(null, "fill", this.color);
    let ga = document.createElementNS(SVG_NS, "g");
    ga.setAttribute("class", "a");

    for (let i = 0; i < 2; i++) {
      // left, right
      let g = document.createElementNS(SVG_NS, "g");
      for (let j = 0; j < this.n; j++) {
        let use = document.createElementNS(SVG_NS, "use");
        use.setAttributeNS(SVG_XLINK, "xlink:href", `#petal${this.n}`);
        use.setAttributeNS(null, "width", this.width);
        use.setAttributeNS(null, "height", this.height);

        g.appendChild(use);
      }
      ga.appendChild(g);
    }
    this.G.appendChild(ga);

    this.parent.appendChild(this.G);
  }
}


svg.addEventListener("mousedown", e => {
  // clear the canvas
  while (svg.lastChild) {
    svg.removeChild(svg.lastChild);
  }
  // if bool == true I can draw
  bool = true;
});

svg.addEventListener("mouseup", e => {
  bool = false;
  previous = {};
});

svg.addEventListener("mousemove", e => {
  if (bool) {
    m = oMousePosSVG(e);
    // number of petals
    let n = 2 + ~~(Math.random() * 4);
    // set the scale
    if (previous.x) {
      let d = dist(m, previous);
      scale = d / 30;
    } else {
      scale = 1;
    }

    let flower = new Flower(n, { x: m.x, y: m.y }, scale, svg);
    setTimeout(() => {
      flower.G.setAttribute("class", `_${flower.n}`);
    }, 50);

    previous.x = m.x;
    previous.y = m.y;
  } //if bool
});

function oMousePosSVG(e) {
  var p = svg.createSVGPoint();
  p.x = e.clientX;
  p.y = e.clientY;
  var ctm = svg.getScreenCTM().inverse();
  var p = p.matrixTransform(ctm);
  return p;
}

function dist(p1, p2) {
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

///////// Initial polygon //////////////

function algorithmPoly(gon, R) {
  let points = [];
  for (let a = 0; a < 2 * Math.PI; a += 0.1) {
    let r =
      R *
      Math.cos(Math.PI / gon) /
      Math.cos(a % (2 * Math.PI / gon) - Math.PI / gon);

    let x = 5000 + r * Math.cos(a);
    let y = 5000 + r * Math.sin(a);
    points.push({ x: x, y: y, r: 5 });
  }
  return points;
}

function algorithmHeart(gon, R) {
    let points = [];
    for (let a = 0; a < 2 * Math.PI; a += 0.1) {
      let r =
        R *
        Math.cos(Math.PI / gon) /
        Math.cos(a % (2 * Math.PI / gon) - Math.PI / gon);
  
      let x = 5000 + r * (Math.sqrt(2) * Math.pow(Math.sin(a), 3));
      let y = 4000 - r * (- Math.pow(Math.cos(a), 3) - Math.pow(Math.cos(a), 2) + 2 * Math.cos(a));
      points.push({ x: x, y: y, r: 5 });
    }
    return points;
  }

let points = algorithmHeart(gon, 1300);

let frames = 0;
function Frame() {
  rid = window.requestAnimationFrame(Frame);

  if (frames >= points.length) {
    window.cancelAnimationFrame(rid);
    rid = null;
  }
  m = points[frames];
  if (m) {
    let n = 2 + ~~(Math.random() * 4);
    scale = ~~(Math.random() * 12) + 3;
  
    let flower = new Flower(n, { x: m.x, y: m.y }, scale, svg);
    setTimeout(() => {
      flower.G.setAttribute("class", `_${flower.n}`);
    }, 50);
  }

  frames++;
}

Frame();

function drawFlowers() {
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }
    frames = 0;
    Frame();
}

