var database;
var dog, happyDog, dogImg;
var foodS, foodStock;

function preload()
{
   dogImg = loadImage("images/Dog.png");
   happyDog = loadImage("images/happydog.png");
}

function setup()
{
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250, 250, 50, 100);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  
  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  foodS = 20;
}


function draw()
{  
  background(100, 255, 100);

  textSize(20);
  fill(0);
  text("Press Up Arrow to feed the Dog", 110, 50);
  text("Milk Left : " + foodS + " Bottles", 170, 100);

  if(foodS<=0)
  {
     foodS = 0;
     dog.addImage(dogImg);
  }
  else
  {
    foodS = foodS;
  }


  if(keyWentDown(UP_ARROW))
  {
    foodS = foodS -1;
    writeStocks(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
}

function readStock(data)
{
    foodS = data.val();
}

function writeStocks(foodLeft)
{
  if(foodLeft<=0)
  {
     foodLeft = 0;
  }
  else
  {
    foodLeft = foodLeft - 1;
  }

  database.ref('/').update({
    food: foodLeft
  })
}

