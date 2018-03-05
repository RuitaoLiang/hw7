var puck = {
  x: 200,
  y: 200,
  xSpeed: 1,
  ySpeed: -1,
  r: 15
};
var edgeOffset = 20;

var player1 = {
  x: edgeOffset,
  y: 200,
  ht: 50,
  wd: 10,
  score : 0,
  updatescore : false,
};

var player2 = {
  x: 400-edgeOffset,
  y: 200,
  ht: 50,
  wd: 10,
  score : 0,
  updatescore : false,
};


function preload() {
 bounce = loadSound('zapsplat_multimedia_game_star_win_gain_x1_12387.mp3');
 score1 = loadSound('zapsplat_multimedia_game_star_win_gain_x8_12394.mp3');
 score2 = loadSound('zapsplat_multimedia_retro_game_fail_tone_13142.mp3');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(color('hsl(160, 100%, 50%)'));
  
  // draw puck
  ellipse(puck.x, puck.y, puck.r*2);
  
  //draw score
  fill(0);
  textAlign(CENTER);
  text("Player1        "+"Player2", width/2,50);
  text(player1.score+"        "+player2.score,width/2,80);       
  
  // move puck,bounce when hit top and bottom
  if (puck.y < puck.r || puck.y > height - puck.r) {
    bounce.play();
    puck.ySpeed = -puck.ySpeed;
  }
  
  puck.x += puck.xSpeed;
  puck.y += puck.ySpeed;
  
  // draw paddles
  rect(player1.x, player1.y, player1.wd, player1.ht);
  rect(player2.x-player2.wd, player2.y, player2.wd, player2.ht);
  
  // paddle movement
  if (player1.paddleDown && ! player1.paddleUp) {
    player1.y += 3;
  }
  if (player1.paddleUp && ! player1.paddleDown) {
    player1.y -= 3;
  } 

  if (player2.paddleDown && ! player2.paddleUp) {
    player2.y += 3;
  }
  if (player2.paddleUp && ! player2.paddleDown) {
    player2.y -= 3;
  }
  
  // don't let paddles outside of the play area
  player1.y = constrain(player1.y, 0, height-player1.ht-1);
  player2.y = constrain(player2.y, 0, height-player2.ht-1);
  
  // bounce puck on paddles -- player 1 -- based on x-coordinate
  if (puck.x - puck.r < player1.x + player1.wd) {
    // check if puck is within paddle height...
    if (puck.y > player1.y && puck.y < player1.y + player1.ht) {
      puck.xSpeed = abs(puck.xSpeed);
    } 
       if(player2.updateScore==false){
    score1.play();
    player2.score+=1;
    player2.updatescore=true;
      // check if puck outside of the play area
      
    }
  }
  
  // bounce puck on paddles -- player 2 -- based on x-coordinate
  if (puck.x + puck.r > player2.x - player2.wd) {
    // check if puck is within paddle height...
    if (puck.y > player2.y && puck.y < player2.y + player2.ht) {
      bounce.play();
      puck.xSpeed = -abs(puck.xSpeed);
    }  if(player1.updatescore==false){
    score2.play();
    player1.score+=1;
    player1.updatescore=true;
    
    }
  }
   else if(puck.x>edgeOffset && puck.x<400-edgeOffset){
    	player2.updatescore=false;
      player1.updatescore=false;  
    
}

  if (player1.score >=10 || player2.score>=10){
    //print(player1.score,player2.score);
    puck.x=200;
    puck.y=200;
    push();
    colorMode(HSB);
    textSize(50);
    text('Game Over', 80,100);
    pop();
  }
}
// keyboard input
function keyPressed() {
  print(key);
  if (key == 'A') {
    player1.paddleDown = true;
  } else if (key == 'Q') {
    player1.paddleUp = true;
  }
  
  if (keyCode == DOWN_ARROW) {
    player2.paddleDown = true;
  } else if (keyCode == UP_ARROW) {
    player2.paddleUp = true;
  }
}

function keyReleased() {
  if (key == 'A') {
    player1.paddleDown = false;
  } else if (key == 'Q') {
    player1.paddleUp = false;
  }
  
  if (keyCode == DOWN_ARROW) {
    player2.paddleDown = false;
  } else if (keyCode == UP_ARROW) {
    player2.paddleUp = false;
  }
}
