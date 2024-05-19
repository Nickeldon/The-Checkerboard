var isstarted = false;
var ispaused = false;
var islost = false;
var reqlength = 13;
var reqheight = 8;
var tempset;
var casecount = 0;
var moneycount = 0;
var iteration = 0;
var looptime = 10;
var initx = 5;
var inity = 0;
var hover = new Howl({
  src: ["./Addons/musics/move.mp3"],
  volume: 5,
});

var lost = new Howl({
  src: ["./Addons/musics/loose.mp3"],
  volume: 0.4,
});

var bests = {
  map1: 0,
  map2: 0,
  map3: 0,
  map4: 0,
  map5: 0,
  map6: 0,
  map7: 0,
  map8: 0,
};

let mapsBestsObj;
let mapsJSONdata;

if (!localStorage.getItem("best-scores")) {
  localStorage.setItem("best-scores", JSON.stringify(bests));
} else {
  bests = JSON.parse(localStorage.getItem("best-scores"));
  mapsBestsObj = [
    bests.map1,
    bests.map2,
    bests.map3,
    bests.map4,
    bests.map5,
    bests.map6,
    bests.map7,
    bests.map8,
  ];
}

document.getElementById("transition").style.display = "block";
setTimeout(() => {
  document.getElementById("transition").style.opacity = "0%";
  document.getElementById("main").style.transform = "scale(1)";
  setTimeout(() => {
    document.getElementById("transition").style.display = "none";
    isstarted = true;
  }, 1000);
}, 100);

try {
  var data = window.parent.getData();
} catch (e) {
  var data = "Map 1";
}

class block {
  constructor({ position, type }) {
    (this.position = position), (this.type = type);
  }

  draw() {
    if (this.type === "blued") {
      ctx.fillStyle = "#2c71ab";
    } else {
      if (this.type === "blue") {
        ctx.fillStyle = "#2c71ab";
      } else if (this.type === "purple") {
        ctx.fillStyle = "#4d1b36";
      } else if (this.type === "black") {
        ctx.fillStyle = this.type;
      } else if (this.type === "d") {
        ctx.fillStyle = "#4F772D";
      }
    }
    ctx.fillRect(this.position.x + 5, this.position.y, 40, 40);
  }
  update() {
    this.draw();
  }
}

class cursors {
  constructor({ position }) {
    this.position = position;
  }
  update() {}
}

let cursor;
let blockmap = [];
let newheight;
let newlength;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const allowedMaps = [
  "Map 1",
  "Map 2",
  "Map 3",
  "Map 4",
  "Map 5",
  "Map 6",
  "Map 7",
  "Map 8",
];
let mapnumInt = parseInt(data.replace(/^\D+/g, ""));

console.log(mapsJSONdata);

function initMapData() {
  switch (data) {
    case "Map 1":
      {
        /*map = map2;*/ map = mapsJSONdata["map1"];
        document.getElementById("prev-highest").innerHTML = bests.map1;
      }
      break;

    case "Map 2":
      {
        /*map = map5;*/ map = mapsJSONdata["map2"];
        document.getElementById("prev-highest").innerHTML = bests.map2;
      }
      break;

    case "Map 3":
      {
        /*map = map3;*/ map = mapsJSONdata["map3"];
        document.getElementById("prev-highest").innerHTML = bests.map3;
      }
      break;

    case "Map 4":
      {
        /*map = map1;*/ map = mapsJSONdata["map4"];
        document.getElementById("prev-highest").innerHTML = bests.map4;
      }
      break;

    case "Map 5":
      {
        /*map = map; */ map = mapsJSONdata["map5"];
        document.getElementById("prev-highest").innerHTML = bests.map5;
      }
      break;

    case "Map 6":
      {
        /*map = map9;*/ map = mapsJSONdata["map6"];
        document.getElementById("prev-highest").innerHTML = bests.map6;
      }
      break;

    case "Map 7":
      {
        /*map = map10;*/ map = mapsJSONdata["map7"];
        document.getElementById("prev-highest").innerHTML = bests.map7;
      }
      break;

    case "Map 8":
      {
        /*map = map11;*/ map = mapsJSONdata["map8"];
        document.getElementById("prev-highest").innerHTML = bests.map8;
        initx = initx + 10 * 45;
        inity = inity + 11 * 45;
      }
      break;

    default: {
      map = map2;
      map = mapsJSONdata["map1"];
      document.getElementById("prev-highest").innerHTML = bests.map1;
    }
  }

  if (allowedMaps.includes(data)) {
    document.getElementById("prev-highest").innerHTML =
      mapsBestsObj[mapnumInt - 1];
  }

  newheight = map.length;
  newlength = map[0].length;

  document.querySelector("canvas").style.transform = `scale(${
    reqlength / newlength
  })`;
  canvas.width = canvas.width / (reqlength / newlength);
  canvas.height = canvas.height / (reqheight / newheight);

  ctx.fillStyle = "rgb(42, 42, 42)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  document.getElementById("cursor").style.height =
    40 * (reqlength / newlength) + "px";
  document.getElementById("cursor").style.width =
    40 * (reqlength / newlength) + "px";

  cursor = new cursors({
    position: {
      x: initx,
      y: inity,
    },
  });

  map.forEach((row, i) => {
    row.forEach((elem, k) => {
      switch (elem) {
        case "C1":
          {
            blockmap.push(
              new block({
                position: {
                  x: k * 45,
                  y: i * 45,
                },
                type: "blue",
              })
            );
          }
          break;

        case "C2":
          {
            blockmap.push(
              new block({
                position: {
                  x: k * 45,
                  y: i * 45,
                },
                type: "black",
              })
            );
          }
          break;

        case "C3":
          {
            blockmap.push(
              new block({
                position: {
                  x: k * 45,
                  y: i * 45,
                },
                type: "blued",
              })
            );
          }
          break;
      }
    });
  });

  blockmap.forEach((elem) => {
    elem.draw();
  });
}

window.addEventListener("keydown", (event) => {
  var key;
  if (!islost) {
    if (isstarted) {
      if (event.key.length === 1) {
        key = event.key.toLowerCase();
      } else {
        key = event.key;
      }

      if (!ispaused) {
        switch (key) {
          case "ArrowUp":
            {
              keypressed.w.press = true;
            }
            break;

          case "ArrowDown":
            {
              keypressed.s.press = true;
            }
            break;

          case "ArrowLeft":
            {
              keypressed.a.press = true;
            }
            break;

          case "ArrowRight":
            {
              keypressed.d.press = true;
            }
            break;

          case "Escape":
            {
              console.log("yes");

              if (
                document.getElementById("pause-game").style.display !==
                  "block" ||
                ispaused === false
              ) {
                ispaused = true;
                document.getElementById("pause-game").style.display = "block";

                setTimeout(() => {
                  document.getElementById("pause-game").style.opacity = "80%";
                }, 100);
              } else {
                ispaused = false;
                document.getElementById("pause-game").style.opacity = "0%";
                setTimeout(() => {
                  document.getElementById("pause-game").style.display = "none";
                }, 500);
              }
            }
            break;

          case "p":
            {
              if (
                document.getElementById("pause-game").style.display !==
                  "block" ||
                ispaused === false
              ) {
                ispaused = true;
                document.getElementById("pause-game").style.display = "block";

                setTimeout(() => {
                  document.getElementById("pause-game").style.opacity = "80%";
                }, 100);
              } else {
                ispaused = false;
                document.getElementById("pause-game").style.opacity = "0%";
                setTimeout(() => {
                  document.getElementById("pause-game").style.display = "none";
                }, 500);
              }
            }
            break;

          default: {
            console.log("invalid keypress");
          }
        }
      } else {
        if (key === "Escape" || key === "p") {
          ispaused = false;
          document.getElementById("pause-game").style.opacity = "0%";
          setTimeout(() => {
            document.getElementById("pause-game").style.display = "none";
          }, 500);
        }
      }
    }
  }
});

var keypressed = {
  a: {
    press: false,
  },
  d: {
    press: false,
  },
  w: {
    press: false,
  },
  s: {
    press: false,
  },
};

function getProximityblocks() {
  const cursorpos = cursor.position;
  var cx = cursorpos.x - 5;
  var cy = cursorpos.y;
  var array = [];
  array.length = 0;
  array = [
    {
      top: null,
    },
    {
      left: null,
    },
    {
      right: null,
    },
    {
      down: null,
    },
    {
      inside: null,
    },
    {
      topright: null,
    },
    {
      topleft: null,
    },
    {
      downright: null,
    },
    {
      downleft: null,
    },
  ];
  blockmap.forEach((elem) => {
    var bx = elem.position.x;
    var by = elem.position.y;

    if (cx === bx && by - cy === -45) {
      //console.log('top')
      array[0].top = elem;
    } else if (cx === bx && by - cy === 45) {
      //console.log('down')
      array[3].down = elem;
    } else if (cy === by && bx - cx === 45) {
      //console.log('right')
      array[2].right = elem;
    } else if (cy === by && bx - cx === -45) {
      //console.log('left')
      array[1].left = elem;
    } else if (by - cy === -45 && bx - cx === -45) {
      array[6].topleft = elem;
    } else if (by - cy === -45 && bx - cx === 45) {
      array[5].topright = elem;
    } else if (by - cy === 45 && bx - cx === 45) {
      array[7].downright = elem;
    } else if (by - cy === 45 && bx - cx === -45) {
      array[8].downleft = elem;
    } else if (cx === bx && by === cy) {
      array[4].inside = elem;
    }
  });

  return [
    array[0].top,
    array[1].left,
    array[2].right,
    array[3].down,
    array[4].inside,
    array[5].topright,
    array[6].topleft,
    array[7].downright,
    array[8].downleft,
  ];
}

function handleFinish(blocks, money, data, moves) {
  var passed = handleWin(money, data, moves);
  var cnt = 0;
  blocks.forEach((elem) => {
    if (!elem || elem.type === "black") {
      cnt++;
    } else {
      cnt = 0;
    }
  });

  if (!passed) {
    if (cnt === 8) {
      document.getElementById("cursor").style.animation =
        "tilt-shaking .1s infinite";
      document.getElementById("cursor").style.backgroundColor =
        "rgb(133, 11, 11)";
      islost = true;
      lost.play();
      document.getElementById("game-over").style.display = "block";
      setTimeout(() => {
        document.getElementById("game-over").style.opacity = "80%";
        setTimeout(() => {
          document.getElementById("cursor").style.animation =
            "blink .5s alternate infinite";
        }, 200);
      }, 400);
    }
  }
}

function handleWin(moneycnt, mapnum, moves) {
  let allowedMapIDs = [1, 2, 3, 4, 5, 6, 7, 8];

  var condition;
  var prevbest;
  var newscore = false;

  const conditions = [6, 10, 13, 12, 16, 40, 35, 33];
  const mapsBestsObj = [
    bests.map1,
    bests.map2,
    bests.map3,
    bests.map4,
    bests.map5,
    bests.map6,
    bests.map7,
    bests.map8,
  ];

  if (allowedMapIDs.includes(mapnum)) {
    condition = conditions[mapnumInt - 1];
    prevbest = mapsBestsObj[mapnumInt - 1];
  }

  if (moneycnt >= condition) {
    if (moves < prevbest || prevbest === 0) {
      if (allowedMapIDs.includes(mapnum)) {
        newscore = true;
        mapsBestsObj[mapnumInt - 1] = moves;
      }

      localStorage.setItem("best-scores", JSON.stringify(bests));
    }

    document.getElementById("moves").innerHTML = moves;
    document.getElementById("cursor").style.animation =
      "tilt-shaking .1s infinite";
    document.getElementById("cursor").style.backgroundColor =
      "rgb(122, 231, 122)";
    islost = true;
    document.getElementById("win-game").style.display = "block";
    setTimeout(() => {
      document.getElementById("win-game").style.opacity = "80%";
      setTimeout(() => {
        document.getElementById("cursor").style.animation =
          "blink .5s alternate infinite";
      }, 200);
    }, 400);
    return true;
  }

  return false;
}

function animate() {
  setTimeout(() => {
    if (!islost) {
      window.requestAnimationFrame(animate);
    }
  }, looptime);

  var press;

  if (keypressed.d.press && keypressed.s.press) {
    press = "down-right";
  } else if (keypressed.w.press && keypressed.d.press) {
    press = "up-right";
  } else if (keypressed.w.press && keypressed.a.press) {
    press = "up-left";
  } else if (keypressed.s.press && keypressed.a.press) {
    press = "down-left";
  } else {
    if (keypressed.a.press) press = "a";
    else if (keypressed.d.press) press = "d";
    else if (keypressed.w.press) press = "w";
    else if (keypressed.s.press) press = "s";
  }

  const proxblocks = getProximityblocks();
  //console.log(proxblocks)
  try {
    if (tempset[4] && tempset[4] !== proxblocks[4]) {
      switch (proxblocks[4].type) {
        case "blue":
          {
            //console.log(blockmap[blockmap.indexOf(proxblocks[4])])
            blockmap[blockmap.indexOf(proxblocks[4])].type = "purple";
          }
          break;

        case "blued":
          {
            blockmap[blockmap.indexOf(proxblocks[4])].type = "d";
          }
          break;

        case "d":
          {
            moneycount++;
            blockmap[blockmap.indexOf(proxblocks[4])].type = "purple";
          }
          break;

        case "purple":
          {
            blockmap[blockmap.indexOf(proxblocks[4])].type = "black";
          }
          break;
      }
    } else {
      if (iteration === 1) {
        console.log("passed");
        switch (proxblocks[4].type) {
          case "blue":
            {
              blockmap[blockmap.indexOf(proxblocks[4])].type = "purple";
            }
            break;

          case "blued":
            {
              blockmap[blockmap.indexOf(proxblocks[4])].type = "d";
            }
            break;

          case "d":
            {
              moneycount++;
              blockmap[blockmap.indexOf(proxblocks[4])].type = "purple";
            }
            break;

          case "purple":
            {
              blockmap[blockmap.indexOf(proxblocks[4])].type = "black";
            }
            break;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  //console.log(proxblocks)

  switch (press) {
    case "w":
      {
        if (proxblocks[0]) {
          if (
            proxblocks[0].type === "blue" ||
            proxblocks[0].type === "purple" ||
            proxblocks[0].type === "d" ||
            proxblocks[0].type === "blued"
          ) {
            iteration = 0;
            cursor.position.y -= 45;
            hover.play();
            casecount++;
          }
        }
        keypressed.w.press = false;
      }
      break;

    case "d":
      {
        if (proxblocks[2]) {
          if (
            proxblocks[2].type === "blue" ||
            proxblocks[2].type === "purple" ||
            proxblocks[2].type === "d" ||
            proxblocks[2].type === "blued"
          ) {
            iteration = 0;
            cursor.position.x += 45;
            hover.play();
            casecount++;
          }
        }
        keypressed.d.press = false;
      }
      break;

    case "a":
      {
        if (proxblocks[1]) {
          if (
            proxblocks[1].type === "blue" ||
            proxblocks[1].type === "purple" ||
            proxblocks[1].type === "d" ||
            proxblocks[1].type === "blued"
          ) {
            iteration = 0;
            cursor.position.x -= 45;
            hover.play();
            casecount++;
          }
        }
        keypressed.a.press = false;
      }
      break;

    case "s":
      {
        if (proxblocks[3]) {
          if (
            proxblocks[3].type === "blue" ||
            proxblocks[3].type === "purple" ||
            proxblocks[3].type === "d" ||
            proxblocks[3].type === "blued"
          ) {
            iteration = 0;
            cursor.position.y += 45;
            hover.play();
            casecount++;
          }
        }
        keypressed.s.press = false;
      }
      break;

    case "up-left":
      {
        if (proxblocks[6]) {
          if (
            proxblocks[6].type === "blue" ||
            proxblocks[6].type === "purple" ||
            proxblocks[6].type === "d" ||
            proxblocks[6].type === "blued"
          ) {
            iteration = 0;
            cursor.position.y -= 45;
            cursor.position.x -= 45;
            hover.play();
            casecount++;
          }
        }
        keypressed.w.press = false;
        keypressed.a.press = false;
      }
      break;

    case "up-right":
      {
        if (proxblocks[5]) {
          if (
            proxblocks[5].type === "blue" ||
            proxblocks[5].type === "purple" ||
            proxblocks[5].type === "d" ||
            proxblocks[5].type === "blued"
          ) {
            iteration = 0;
            cursor.position.y -= 45;
            cursor.position.x += 45;
            hover.play();
            casecount++;
          }
        }
        keypressed.w.press = false;
        keypressed.d.press = false;
      }
      break;

    case "down-left":
      {
        if (proxblocks[8]) {
          if (
            proxblocks[8].type === "blue" ||
            proxblocks[8].type === "purple" ||
            proxblocks[8].type === "d" ||
            proxblocks[8].type === "blued"
          ) {
            iteration = 0;
            cursor.position.y += 45;
            cursor.position.x -= 45;
            hover.play();
            casecount++;
          }
        }
        keypressed.s.press = false;
        keypressed.a.press = false;
      }
      break;

    case "down-right":
      {
        if (proxblocks[7]) {
          if (
            proxblocks[7].type === "blue" ||
            proxblocks[7].type === "purple" ||
            proxblocks[7].type === "d" ||
            proxblocks[7].type === "blued"
          ) {
            iteration = 0;
            cursor.position.y += 45;
            cursor.position.x += 45;
            hover.play();
            casecount++;
          }
        }
        keypressed.s.press = false;
        keypressed.d.press = false;
      }
      break;
  }

  blockmap.forEach((elem) => {
    elem.update();
  });
  iteration++;
  tempset = proxblocks;

  document.getElementById("Num-case").innerText = casecount;
  document.getElementById("Money-case").innerText = moneycount;

  handleFinish(
    [
      proxblocks[0],
      proxblocks[1],
      proxblocks[2],
      proxblocks[3],
      proxblocks[5],
      proxblocks[6],
      proxblocks[7],
      proxblocks[8],
    ],
    moneycount,
    Number(data.charAt(4)),
    casecount
  );

  cursor.update();
  //console.log(cursor.position.x)
  document.getElementById("cursor").style.top =
    cursor.position.y * (reqlength / newlength) + "px";
  document.getElementById("cursor").style.left =
    cursor.position.x * (reqlength / newlength) + "px";
}

fetch("./maps.json")
  .then((res) => res.json())
  .then((res) => {
    mapsJSONdata = res;
    initMapData();
    animate();
  });
