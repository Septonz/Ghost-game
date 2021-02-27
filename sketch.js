var gameState='play'

var towerImg,tower
var ghostImg,ghost


function preload(){
  ghostImg=loadImage("ghost-standing.png");
  ghostj=loadImage("ghost-jumping.png");
  towerImg=loadImage("tower.png")
  doorImg=loadImage("door.png")
  climberImg=loadImage("climber.png");
  gameImg=loadImage("gameover.png")
  spooky=loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600);
   spooky.loop();
    tower=createSprite(300,300)
  tower.addImage(towerImg);
  tower.velocityY=3                        
ghost=createSprite(300,300,50,50)
  ghost.addImage(ghostImg)
  ghost.scale=0.3;
  
  game=createSprite(300,300)
  game.addImage(gameImg)
  game.visible=false
  
doorGroup= new Group()
  climberGroup= new Group()
invGroup= new Group()

  
}
function draw(){
  background(0)
  
  if(gameState==='play'){
         game.visible=false
 
    tower.velocityY=3
  if(tower.y>600){
    tower.y=300
  }
    
    if(keyDown("left")){
      ghost.x=ghost.x-5;
    }
     if(keyDown("right")){
      ghost.x=ghost.x+5;
    }
     if(keyDown("space")){
      ghost.velocityY=-10;
       ghost.addImage(ghostj)
       
       
       
       
    }
    ghost.velocityY=ghost.velocityY+0.8;
  spawndoor();
    if(climberGroup.isTouching(ghost)){
      ghost.addImage(ghostImg)
      ghost.velocityY=0;
      
    }
 if(invGroup.isTouching(ghost)||ghost.y>600){
   ghost.destroy();
   doorGroup.destroyEach();
   climberGroup.destroyEach();
   gameState='end'
 } 
    
    
  }
  drawSprites();
  
  if(gameState==='end'){
     game.visible=true
    
 tower.velocityY=0
  }
}

function spawndoor(){
  if(frameCount%200===0){
  door=createSprite(200,-50)
    door.addImage(doorImg)    
    door.velocityY=3
    door.x=Math.round(random(100,400))
climber=createSprite(200,10);
    climber.addImage(climberImg)
    climber.velocityY=3
    climber.x=door.x 
    inv=createSprite(200,15)
    inv.velocityY=3
    inv.x=climber.x   
    inv.width=climber.width
    inv.height=2  
    inv.visible=false
    // inv.debug=true 
    inv.lifetime=800
        door.lifetime=800
    climber.lifetime=800
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    invGroup.add(inv)
        doorGroup.add(door)
        climberGroup.add(climber)
  }
  
  
}