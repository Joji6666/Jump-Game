var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var heroImg = new Image();
heroImg.src = "hero2.png";

var hero = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.drawImage(heroImg, this.x, this.y);
  },
};

hero.draw();

var enemyImg = new Image();
enemyImg.src = "enemy2.png";

class Enemy {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.drawImage(enemyImg, this.x, this.y);
  }
}

var timer = 0;
var enemys = [];
var jumpTimer = 0;
var animation;

function frameOn() {
  animation = requestAnimationFrame(frameOn);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (timer % 240 === 0) {
    var enemy = new Enemy();
    enemys.push(enemy);
  }
  enemys.forEach((a, i, o) => {
    if (a.x < 0) {
      o.splice(i, 1);
    }

    충돌(hero, a);
    a.x--;
    a.draw();
  });

  if (jump == true) {
    hero.y -= 3;
    jumpTimer++;
  }
  if (jump === false) {
    if (hero.y < 200) hero.y += 3;
  }
  if (jumpTimer > 30) {
    jump = false;
    jumpTimer = 0;
  }

  hero.draw();
}

frameOn();

//충돌

function 충돌(hero, enemy) {
  var x축 = enemy.x - (hero.x + hero.width);
  var y축 = enemy.y - (hero.y + hero.height);
  if (x축 < 0 && y축 < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
    alert("game over");
  }
}

var jump = false;

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jump = true;
  }
});
