var aegon, aegon_img;
var back, back_img;
var rand, randHero;
var gameState = "play";
var bulletGroup, enemyGroup;
var score = 0, ground;

function preload(){
  aegon_img = loadImage("images/Aegon.png");
  guillotine_img = loadImage("images/Guillotine2099.png");
  X_img = loadImage("images/X.png");

  back_img = loadImage("images/back1.jpg");

  enemy_img = loadImage("images/villan.png");
  enemy2_img = loadImage("images/villan2.png");
  enemy3_img = loadImage("images/villan3.png");
}

function setup(){
  createCanvas(displayWidth + 140, displayHeight - 80);

  back = createSprite(width/2, height/3, width*2, height);
  back.addImage(back_img);
  back.scale = 0.75;

  aegon = createSprite(width/4, height - 100);
  aegon.addImage(aegon_img);
  aegon.scale = 0.5;

  ground = createSprite(width/2, height-30, width, 30);
  ground.visible = false;

  bulletGroup = new Group();
  enemyGroup = new Group();
  weaponGroup = new Group();
}

function draw(){
  background("lightgreen");

  if(gameState == "play"){
    back.velocityX = -5;
    if(back.x < 0){
      back.x = width/2;
    }

    if(keyDown("space")){
      aegon.velocityY = -11;
    }

    aegon.velocityY += 0.5;
    spawnEnemy();

    if(keyWentDown("x")){
      spawnWeapon();
    }

    if(weaponGroup.isTouching(enemyGroup)){
      weaponGroup.destroyEach();
      enemyGroup.destroyEach();

      score += 15;
    }

    if(weaponGroup.isTouching(bulletGroup)){
      bulletGroup.destroyEach();
      weaponGroup.destroyEach();

      score += 5;
    }

    if(enemyGroup.isTouching(aegon) || bulletGroup.isTouching(aegon)){
      gameState = "end";
    }
  }

  else{
    back.velocityX = 0;
    aegon.velocityY = 0;

    enemyGroup.setVelocityXEach(0);
    bulletGroup.setVelocityXEach(0);

    enemyGroup.setLifetimeEach(-1);
    bulletGroup.setLifetimeEach(-1);

  }

  if(keyIsDown(32) && gameState == "end"){
    restart();
    randHero = Math.round(random (1, 3));
    switch(randHero){
      case 1: aegon.addImage(aegon_img);
      aegon.scale = 0.5;
      break;

      case 2: aegon.addImage(guillotine_img);
      break;

      case 3: aegon.addImage(X_img);
      aegon.setCollider("rectangle", -30, -40, 400, 300);

      default : break;
    }
  }
  
  enemyGroup.collide(ground);
  aegon.collide(ground);
  drawSprites();

  textSize(30);
  text("Score :" + score, width*3/4, 100);
}

function restart(){
  gameState = "play";
  console.log("restarted");

  enemyGroup.destroyEach();
  bulletGroup.destroyEach();
}

function spawnEnemy(){
  if(frameCount % 200 == 0){
    var enemy = createSprite(width, height - random(150, 450), 10, 10);
    enemy.velocityX = -4;
    enemy.velocityY += 2;
    enemy.scale = 0.5;
    enemy.debug = true;
    enemy.lifetime = - width/enemy.velocityX;

    rand = Math.round(random (1, 3));
    switch(rand){
      case 1: enemy.addImage(enemy_img);
      enemy.setCollider("rectangle", 0, 20, 500, 340);
      break;

      case 2: enemy.addImage(enemy2_img);
      enemy.scale = 0.75;
      enemy.setCollider("rectangle", -30, 0, 170, 260);
      break;

      case 3: enemy.addImage(enemy3_img);
      enemy.setCollider("rectangle", 120, 0, 380, 340);

      default : break;
    }
    enemyGroup.add(enemy);

    var i = Math.round(score/15);
    for(var j = 0; j < i; j ++){
      var bullet = createSprite(enemy.x - j*50, enemy.y + j*50, 10, 10);
      bullet.velocityX += -10;
      bullet.shapeColor = "red";
      bullet.lifetime = - width/bullet.velocityX;
      bullet.debug = true;
      //playSound("sounds/bulletFire.mp3");
      bulletGroup.add(bullet);
    }
  }
}

function spawnWeapon(){
  var weapon = createSprite(aegon.x, aegon.y, 20, 20);
  weapon.velocityX = 7;
  weapon.lifetime = - width/weapon.velocityX;
  weaponGroup.add(weapon);
}