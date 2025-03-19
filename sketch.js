/*
In this game, you are in a tank trying to destroy the reinforced crates of a top secret bacterium that are was accidently released near your island. Fortunately, the water surrounding your island is filled with a bacteriophage that specifically targets and destroys the bacteria. Your job is to destroy the crates in the water before they can reach your island. If they reach the land, you will slowly get sick and die. When you get to certain levels, your tank will automatically upgrade. Try to get them all. Good luck, have fun.


///////////CONTROLS///////////
WASD to move
Mouse to aim and shoot

try to beat my score of 131699


*/


//display variables
var scaleMod;
var displayCut;
var trueMouseX = 0;
var trueMouseY = 0;


var dead = false;
var playerX = 300;
var playerY = 300;
var playerRot = 0;
var playerXp = 0;
var playerLvl = 0;
var tankType = 1;
var playerhp = 100;
var playerMaxHp = 100;
var tankSpeed = 0;
var score = 0;
var dx;
var dy;
var theta;
var recoil = 0;
var bulletSpeed = 30;
var dmg = 5;
var reload = 10;
var reloadTimer = reload;
//size of the tank from the center of it
var tankSize = 0;



//creates the canvas
function setup() {
  angleMode(DEGREES);

  createCanvas(windowWidth, windowHeight);
  scaleMod = height / 600;
  displayCut = (width - (height)) / 2;

  // createCanvas(600, 600);
}



//key values and other thingys
var keysDown = [];
var W = 87;
var A = 65;
var S = 83;
var D = 68;
var twoKeyPressed = false;



//if a key is pressed
function keyPressed() {
  //add that key to the keydown array
  keysDown[keyCode] = true;
}



//if a key is released
function keyReleased() {
  //remove that key that was released from the keydown array
  keysDown[keyCode] = false;
}



//tank movement
var movement = function() {
  //diagnal rotations for the tank
  if (keysDown[A] && keysDown[S]) {
    playerRot = 225;
    twoKeyPressed = true;
  } else if (keysDown[A] && keysDown[W]) {
    playerRot = -45;
    twoKeyPressed = true;
  } else if (keysDown[D] && keysDown[S]) {
    playerRot = -225;
    twoKeyPressed = true;
  } else if (keysDown[W] && keysDown[D]) {
    playerRot = 45;
    twoKeyPressed = true;
  } else {
    twoKeyPressed = false;
  }



  //movement for the tank
  if (keysDown[A]) {
    playerX -= tankSpeed;
  } else if (keysDown[D]) {
    playerX += tankSpeed;
  }

  if (keysDown[W]) {
    playerY -= tankSpeed;
  } else if (keysDown[S]) {
    playerY += tankSpeed;
  }



  //normal rotations for the tank
  if (keysDown[A] && twoKeyPressed === false) {
    playerRot = -90;
  } else if (keysDown[D] && twoKeyPressed === false) {
    playerRot = 90;
  }

  if (keysDown[W] && twoKeyPressed === false) {
    playerRot = 0;
  } else if (keysDown[S] && twoKeyPressed === false) {
    playerRot = 180;
  }



  //stops the player from going out of the boundaries
  if (playerX < 0 + tankSize) {
    playerX = tankSize;
  }
  if (playerX > 600 - tankSize) {
    playerX = 600 - tankSize;
  }
  if (playerY < 300 + tankSize) {
    playerY = 300 + tankSize;
  }
  if (playerY > 600 - tankSize) {
    playerY = 600 - tankSize;
  }
}



//graphics for tank #1
var tankBody1 = function() {
  tankSize = 25;
  tankSpeed = 2;
  playerMaxHp = 100;
  dmg = 5;
  reload = 20;
  push();
  translate(playerX, playerY);
  rectMode(CENTER);
  rotate(playerRot);



  //tread cases
  fill(100, 100, 100);
  stroke(70, 70, 70);
  strokeWeight(1);
  rect(-15, 0, 10, 50, 1);
  rect(15, 0, 10, 50, 1);



  //body
  strokeWeight(2);
  rect(0, 0, 30, 50, 10);
  fill(138, 138, 138);
  rect(0, 15, 15, 6, 3);
  pop();
};
var tankCap1 = function() {
  push();
  translate(playerX, playerY);

  stroke(110, 110, 110);
  strokeWeight(2);
  fill(130, 130, 130);
  rotate(theta);
  translate(-recoil, 0);
  rectMode(CORNER);
  rect(0, -2, 30, 5, 0);
  rectMode(CENTER);
  rect(0, 0, 20, 20, 5);
  pop();
};



//graphics for tank#2
var tankBody2 = function() {
  tankSize = 30;
  tankSpeed = 3;
  playerMaxHp = 200;
  dmg = 20;
  reload = 5;
  push();
  translate(playerX, playerY);
  rectMode(CENTER);
  rotate(playerRot);



  //body of the tank
  noStroke();
  fill(108, 103, 87);
  rect(0, -1, 35, 48);
  fill(128, 123, 107);
  rect(0, -5, 20, 40);
  quad(-15, -20, 15, -20, 10, -15, -10, -15);
  for (var y = 0; y < 5; y++) {
    fill(88, 83, 67);
    rect(-6 + y * 3, 12, 2, 5);
  }



  //left tread case
  fill(133, 129, 87);
  beginShape();
  vertex(-20, -30);
  vertex(-20, 25);
  vertex(-10, 25);
  vertex(-10, 20);
  vertex(-15, 20);
  vertex(-15, -20);
  vertex(-10, -20);
  vertex(-10, -30);
  endShape(CLOSE);
  fill(180);
  rect(-17.5, -8, 5, 15);



  //right tread case
  fill(133, 129, 87);
  beginShape();
  vertex(20, -30);
  vertex(20, 25);
  vertex(10, 25);
  vertex(10, 20);
  vertex(15, 20);
  vertex(15, -20);
  vertex(10, -20);
  vertex(10, -30);
  endShape(CLOSE);
  fill(180);
  rect(17.5, -8, 5, 15);
  pop();
};
var tankCap2 = function() {
  push();
  translate(playerX, playerY);
  rotate(theta);
  strokeWeight(2);
  stroke(78, 83, 57);
  translate(-recoil, 0);
  rectMode(CORNER);



  //barrel
  stroke(117, 111, 82);
  strokeWeight(1);
  fill(168, 159, 119);
  beginShape();
  vertex(0, -2);
  vertex(0, 2);
  vertex(45, 1);
  vertex(45, -1);
  endShape(CLOSE);
  rect(45, -2, 4, 4);



  //cap
  fill(98, 93, 77);
  beginShape();
  vertex(15, -4);
  vertex(15, 4);
  vertex(0, 10);
  vertex(-10, 4);
  vertex(-10, -4);
  vertex(0, -10);
  endShape(CLOSE);
  noStroke();
  fill(181);
  beginShape();
  vertex(-7, -3);
  vertex(-7, 3);
  vertex(-2, 7);
  vertex(7, 4);
  vertex(7, -4);
  vertex(-2, -7);
  endShape(CLOSE);
  fill(161, 153, 108);
  ellipse(0, -3, 5, 5);
  pop();

};



//graphics for tank#3
var tankBody3 = function() {
  tankSize = 35;
  tankSpeed = 4;
  playerMaxHp = 400;
  dmg = 100 + playerLvl / 5;
  reload = 30 - playerLvl / 2;
  push();
  translate(playerX, playerY);
  rectMode(CENTER);
  rotate(playerRot);



  //main body
  fill(87);
  rect(0, 0, 30, 50);
  for (var x = 0; x < 3; x++) {
    fill(25);
    noStroke();
    rect(-7, -20 + x * 3, 5, 2);
    rect(7, -20 + x * 3, 5, 2);


  }



  //treads



  //right tread
  noStroke();
  fill(76);
  rect(20, -20, 14, 30, 3);



  //track indents
  for (var f = 0; f < 8; f++) {
    stroke(0);
    strokeWeight(2);
    line(16, -6 - f * 4, 20, -4 - f * 4);
    line(20, -4 - f * 4, 24, -6 - f * 4);
  }



  //case around the treads
  fill(100, 100, 100);
  stroke(100);
  strokeWeight(1);
  beginShape();
  vertex(13, -30);
  vertex(13, 35);
  vertex(28, 35);
  vertex(28, -30);
  vertex(26, -30);
  vertex(26, -10);
  vertex(23, -10);
  vertex(22, -5);
  vertex(19, -5);
  vertex(18, -10);
  vertex(15, -10);
  vertex(15, -30);
  endShape(CLOSE);



  //stuff on the tread case
  noStroke();
  fill(70);
  rect(21, 15, 3, 39);
  fill(40);
  rect(16, 27, 4, 7);



  //the blue lights
  stroke(0, 255, 255);
  strokeWeight(2);
  line(25, -3, 25, 2);
  line(25, 5, 25, 6);
  point(25, 9);



  //left tread
  noStroke();
  fill(76);
  rect(-20, -20, 14, 30, 3);



  //track indents
  for (var q = 0; q < 8; q++) {
    stroke(0);
    strokeWeight(2);
    line(-16, -6 - q * 4, -20, -4 - q * 4);
    line(-20, -4 - q * 4, -24, -6 - q * 4);
  }



  //case around the treads
  fill(100, 100, 100);
  stroke(100);
  strokeWeight(1);
  beginShape();
  vertex(-13, -30);
  vertex(-13, 35);
  vertex(-28, 35);
  vertex(-28, -30);
  vertex(-26, -30);
  vertex(-26, -10);
  vertex(-23, -10);
  vertex(-22, -5);
  vertex(-19, -5);
  vertex(-18, -10);
  vertex(-15, -10);
  vertex(-15, -30);
  endShape(CLOSE);



  //stuff on the tread case
  noStroke();
  fill(70);
  rect(-21, 15, 3, 39);
  fill(40);
  rect(-16, 27, 4, 7);



  //the blue lights
  stroke(0, 255, 255);
  strokeWeight(2);
  line(-25, -3, -25, 2);
  line(-25, 5, -25, 6);
  point(-25, 9);
  pop();



};
var tankCap3 = function() {
  push();
  translate(playerX, playerY);
  rotate(theta);
  translate(-recoil, 0);
  rectMode(CORNER);



  //barrel
  noStroke();
  fill(110);
  rect(13, -3, 40, 6);
  fill(0, 255, 255);
  rect(0, -1, 50, 2);
  fill(60);
  rect(40, -4, 10, 8);



  //body of cap
  fill(0, 255, 255);
  quad(-17, -2, -17, 2, 0, 12, 0, -12);
  fill(120);
  beginShape();
  vertex(15, -5);
  vertex(15, 5);
  vertex(10, 15);
  vertex(0, 15);
  vertex(-5, 5);
  vertex(-20, 2);
  vertex(-20, -2);
  vertex(-5, -5);
  vertex(0, -15);
  vertex(10, -15);
  endShape(CLOSE);
  fill(0);
  rect(-15, -1, 17, 2);
  fill(60);
  rect(-5, -3, 15, 6);
  fill(170);
  rect(0, 5, 5, 5);
  rect(0, -10, 5, 5);
  pop();
};



//stuff for the waves



//array to hold all of the waves
var waves = [];



//each new waves position and speed
var Wave = function() {
  this.x = 0;
  this.y = 0;
  this.speed = 0;
  this.back = false;

};



//adds a new wave to the array
var makeWave = function() {
  var w = new Wave();
  w.x = random(0, 600);
  w.y = -100;
  w.speed = random(1, 2);
  w.back = false;
  waves.push(w);
};



//graphics and movement of the waves
var drawWave = function() {



  var k;



  //splicing array
  var toKill = [];
  rectMode(CENTER);



  for (k = 0; k < waves.length; k++) {
    //wave graphics
    push();
    translate(waves[k].x, waves[k].y);
    noStroke();
    for (var sl = 0; sl < 10; sl++) {
      if (waves[k].back === false) {
        fill(0, 196, 255, sl * 10 - waves[k].y / 5);
      } else {
        fill(0, 196, 255, waves[k].y - 200 - sl * 10);
      }
      rect(0, sl * 10, 200, 10);
    }
    pop();



    //movement
    waves[k].y += waves[k].speed;
    if (waves[k].y > 250 && waves[k].back === false) {
      waves[k].back = true;
      waves[k].y = 280;
    }
    if (waves[k].back === true) {
      waves[k].speed = -0.5;
    }
    //puts the waves that are done the animation into the kill list
    if (waves[k].y < 150 && waves[k].back === true) {
      toKill.push(k);
    }

  }
  //deletes the wave from the array
  for (k = 0; k < toKill.length; k++) {
    waves.splice(toKill[k], 1);
  }

};



//timer to spawn the waves
var waveTimer = 0;


//bullet stuff



//array that stores the bullets
var bullets = [];



//each bullets variables
var bullet = function() {
  this.x = 0;
  this.y = 0;
  this.hspeed = 0;
  this.vspeed = 0;
};

var makeBullet = function() {
  var bu = new bullet();



  //trigonometry
  var theta2 = atan2(playerY - trueMouseY, playerX - trueMouseX);



  //sets the position to start at the player
  bu.x = playerX;
  bu.y = playerY;

  //the direction the bullet will go
  bu.hspeed = sin(theta2 - 90) * bulletSpeed;
  bu.vspeed = -cos(theta2 - 90) * bulletSpeed;

  //adds a bullet to the array
  bullets.push(bu);
};



var drawBullet = function() {
  var db;
  var toKillBullet = [];



  for (db = 0; db < bullets.length; db++) {
    //graphics for the bullet
    push();
    translate(bullets[db].x, bullets[db].y);
    fill(0, 255, 255);
    noStroke();
    rotate(theta);
    ellipse(0, 0, 10, 10);
    pop();



    //Update the position
    bullets[db].x += bullets[db].hspeed;
    bullets[db].y += bullets[db].vspeed;

    //if the bullet goes outside canvas
    if (bullets[db].x > 650) {
      toKillBullet.push(db);
    } else if (bullets[db].x < -50) {
      toKillBullet.push(db);
    }
    if (bullets[db].y > 650) {
      toKillBullet.push(db);
    } else if (bullets[db].y < -50) {
      toKillBullet.push(db);
    }
  }

  //destroys the bullets in the kill array
  for (db = 0; db < toKillBullet.length; db++) {
    bullets.splice(toKillBullet[db], 1);
  }
};









//enemyStuff (the box)



//the places where the bullet holes will spawn
var bulletHole = [];


//array for the enemys
var enemys = [];



var sp;

//the enemy
var enemy = function() {
  this.x = 0;
  this.y = 0;
  this.speed = 0;
  this.enemyHpMax = 10;
  this.enemyHp = this.enemyHpMax;
  this.rot = 0;

  this.enemyGraphics = function() {
    //graphics
    var sineWave = sin(this.y * 5) * 5;
    push();
    translate(this.x, this.y);
    scale(1 + (sineWave / 50));
    rotate(this.rot);



    //box
    rectMode(CENTER);
    noStroke();
    fill(0, 50, 255, 20);
    ellipse(0, 0, 50, 50);
    stroke(97, 58, 0);
    strokeWeight(2);
    fill(143, 92, 21);
    rect(0, 0, 30, 30);



    //biohazard symbol
    for (var ro = 0; ro < 3; ro++) {
      push();
      noFill();
      stroke(255, 50, 50);
      strokeWeight(1);
      rotate(ro * 120);
      ellipse(0, 6, 10, 10);
      fill(143, 92, 21);
      noStroke();
      ellipse(0, 9, 8, 8);
      pop();
    }
    noFill();
    strokeWeight(1);
    stroke(255, 50, 50);
    ellipse(0, 0, 10, 10);
    noStroke();

    for (var bh = 0; bh < (this.enemyHpMax - this.enemyHp) / 5; bh++) {


    }



    pop();
  };



  //resets the enemy
  this.reset = function() {
    this.enemyHpMax += 10;
    this.enemyHp = this.enemyHpMax;
    this.x = random(0, 600);
    this.y = random(-60, -10);
    this.speed = random(0.1 + (playerLvl / 50), 0.3 + (playerLvl / 50));
    this.rot = random(0, 180);
  };



  this.checkHit = function() {



    //Check for collisions with projectiles
    for (db = 0; db < bullets.length; db++) {
      var bu = bullets[db];
      if (dist(bu.x, bu.y, this.x, this.y) < 20 + sin(this.y * 5) * 5) {
        this.enemyHp -= dmg;
        bullets.splice(bu, 1);
        playerXp += dmg / 5;
        score += dmg;
      }

    }
    if (this.enemyHp <= 0) {
      this.reset();
    }
  };



  //movement for the enemy
  this.move = function() {
    this.y += this.speed;
    if (this.y > 300) {
      this.reset();
      playerhp -= 40;
    }
  };
};



for (sp = 0; sp < 10 + playerLvl; sp++) {
  var e = new enemy();
  e.speed = 0.5;
  e.enemyHp = 0;

  enemys.push(e);
}



//draws the enemys and all the functions that come with it
var drawEnemys = function() {
  for (var sp = 0; sp < enemys.length; sp++) {
    enemys[sp].move();
    enemys[sp].checkHit();
    enemys[sp].enemyGraphics();
  }
};























function draw() {

  //sets the true MouseX
  trueMouseX = (mouseX - displayCut) / scaleMod;
  trueMouseY = mouseY / scaleMod;
  trueMouseX = constrain(trueMouseX, 0, 700);
  trueMouseY = constrain(trueMouseY, 0, 700);


  //translates the game so it fits fullscreen and displays it
  push();
  translate(displayCut, 0);
  scale(scaleMod);

  //if youre not dead
  if (dead === false) {

    //trig functions for the proper rotation of the turrent cap
    dx = trueMouseX - playerX;
    dy = trueMouseY - playerY;
    theta = atan2(dy, dx);



    rectMode(CORNER);
    background(255, 232, 138);

    noStroke();
    //water

    for (var oc = 0; oc < 38; oc++) {
    fill(0 + oc * 2, 115 + oc * 2, 255);
      rect(0, (oc * 8) - 8, 600, 18);
    }



    //if the wave timer reaches zero, add a new wave and resets the timer
    if (waveTimer < 0) {
      waveTimer = random(50, 150);
      makeWave();
    }
    waveTimer--;



    //draws the actual wave
    drawWave();




    //changes the tank type according to the player's level and restores there heath
    if (playerLvl < 5 && tankType !== 1) {
      tankType = 1;
      playerhp = 100;
    } else if (playerLvl < 20 && playerLvl >= 5 && tankType !== 2) {
      tankType = 2
      playerhp = 200;
    } else if (playerLvl >= 20 && tankType !== 3) {
      tankType = 3
      playerhp = 400;
    }

    //draws the actual bullet
    drawBullet();
    //draws the tank based on the tank type
    if (tankType === 1) {
      tankBody1();
      tankCap1();
    } else if (tankType === 2) {
      tankBody2();
      tankCap2();
    } else if (tankType === 3) {
      tankBody3();
      tankCap3();
    }
    //leveling up system
    if (playerXp >= 5 + playerLvl * 2) {
      playerLvl++;
      playerXp = 0;

    }

    //if you click the mouse, it shoots and adds recoil to the tank gun
    if (mouseIsPressed && reloadTimer < 0) {
      makeBullet();
      recoil = 10;
      reloadTimer = reload;
    }
    if (recoil > 0) {
      recoil -= 2;
    }
    reloadTimer--;


    drawEnemys();


    //movement
    movement();

    if (playerhp < playerMaxHp) {
      playerhp += 0.1;
    }

    //player stats



    //health bar
    rectMode(CORNER);
    fill(150 - (100 * (playerhp / playerMaxHp) - 50) * 50, 200, 50);
    stroke(50);
    strokeWeight(2);
    rect(20, 560, 100, 20, 5);
    noStroke();
    fill(200, 50, 50);
    rect(20, 560, 100 - 100 * (playerhp / playerMaxHp), 20, 5);



    //the green that covers the screen depending on how much damage you've taken
    fill(0, 255, 0, (100 - 100 * (playerhp / playerMaxHp)) * 2);
    noStroke();
    rectMode(CENTER);
    rect(300, 300, 999, 999);



    //score
    textAlign(LEFT);
    textSize(20);
    noStroke();
    fill(0);
    text("Score: " + floor(score), 20, 550);



    //level stuff
    text("Level: " + playerLvl, 20, 530);



    //xp bar
    rectMode(CORNER);
    fill(200, 50, 50);
    stroke(50);
    strokeWeight(2);
    rect(20, 500, 100, 10, 5);
    noStroke();
    fill(50, 200, 50);
    rect(20, 500, 100 * (playerXp / (5 + playerLvl * 2)), 10, 5);



    //if the player has no more health, then they die
    if (playerhp <= 0) {
      dead = true;
    }

  }
  //if your not alive (dead)
  else {
    background(0, 255, 0);
    noStroke();
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text("You Died With A Score Of: " + floor(score), 300, 300);

  }

  pop();



  push();
  rectMode(CORNER);
  noStroke();
  fill(28);
  rect(0, 0, displayCut, height);
  rect(width - displayCut, 0, displayCut, height);
  pop();


} 