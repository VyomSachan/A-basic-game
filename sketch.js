var aegon, aegon_img;
var back, back_img;
var rand;

function preload(){
  aegon_img = loadImage("images/aegon.jpg");
  back_img = loadImage("images/back.jpg");
  enemy_img = loadImage("images/villan.jpg");
  guillotine_img = loadImage("images/guillotine.jpg");
}

function setup(){
  createCanvas(displayWidth + 140, displayHeight - 80);

  back = createSprite(width/2, height/3, width*2, height);
  back.velocityX = -5;
  back.addImage(back_img);
  back.scale = 7;

  aegon = createSprite(width/4, height - 100);
  aegon.addImage(aegon_img);
  aegon.scale = 0.25;

  ground = createSprite(width/2, height-30, width, 30);
  ground.visible = false;
}

function draw(){
  background("lightgreen");

  if(back.x < 0){
    back.x = width/2;
  }

  if(keyDown("space")){
    aegon.velocityY = -11;
  }

  aegon.velocityY += 0.5;
  aegon.collide(ground);

  spawnEnemy();

  drawSprites();
}

function spawnEnemy(){
  if(frameCount % 100 == 0){
    var enemy = createSprite(width, height-150, 10, 10);
    enemy.velocityX = -4;
    enemy.scale = 0.5;

    rand = Math.round(random (1, 2));
    switch(rand){
      case 1: enemy.addImage(enemy_img);
      break;

      case 2: enemy.addImage(guillotine_img);
      break;

      default : break;
    }

    var bullet = createSprite(enemy.x, enemy.y, 10, 10);
    bullet.velocityX += -10;
    bullet.shapeColor = "red";
  }
}