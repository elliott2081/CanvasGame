//create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
//put canvas into document(html)
document.body.appendChild(canvas);

//background image.
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
		bgReady = true;
};
bgImage.src = "images/background.png";

//hero
//var heroReady = false;
var heroImage = new Image();
/*heroImage.onload = function(){
		heroReady = true;
};*/
heroImage.src = "images/arrows.png";

//monster
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
		monsterReady = true;
};
monsterImage.src = "images/monster.png";

/*--------------- new codes from CJ --------- */
var frameIndex = 0;

/*hero_moved: 1 ms(src image change!), 2ms, 3ms, 4ms, 5ms(src image change!)*/
var hero_moved = 1;

/*end of new codes from CJ(glob. variables)*/


//game objects
var hero = {
		speed: 256, //movementin pixels per second
		x: 0,
		y: 0
		};
var monster = {
		x: 0,
		y: 0
		};
var monsterCaught =0;

//Handle keyboard controls
var keysDown = {};
addEventListener("keydown",function(e){
		keysDown[e.keyCode] = true;
		}, false);
		
addEventListener("keyup",function(e){
		delete keysDown[e.keyCode];
		}, false);
		
//Reset the game when the player catches a monster		
var reset = function(){
		hero.x = canvas.width / 2;
		hero.y = canvas.height / 2;
		
		monster.x = 32 + (Math.random()* (canvas.width - 64));
		monster.y = 32 + (Math.random()* (canvas.height - 64));
};
//update game objects
var update = function (modifier){
		if (38 in keysDown){ //player holding up
			hero.y -= hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation();
		}
		if (40 in keysDown){ //player holding down
			hero.y += hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation();
		}
		if (37 in keysDown){ //holding left
			hero.x -= hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation();
		}
		if (39 in keysDown){
			hero.x += hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation();
		}	
		//touching something
		if(
				hero.x <= (monster.x + 32)
				&& monster.x <= (hero.x + 32)
				&& hero.y <= (monster.y + 32)
				&& monster.y <= (hero.y + 32)
			){
				++monsterCaught;
				reset();
			}
		};
		//draw everything
var render = function(){

		if(bgReady){
				ctx.drawImage(bgImage, 0,0); 
		}
		//if(heroReady){
		//changed from " ctx.drawImage(heroImage, hero.x, hero.y); "
				ctx.drawImage(heroImage, frameIndex*64, 0, 64,64 ,hero.x, hero.y, 32,32);
		//}
		if(monsterReady){
				ctx.drawImage(monsterImage, monster.x, monster.y);
		}
		//score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("frameIndex " + frameIndex, 32, 32);
		
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("heroMoved " + hero_moved, 32, 56);
};		

/* new codes from CJ*/

var youwin = function()
{
	if(monsterCaught >= 5)
	{
	clearInterval (simulator);
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("You win!!", 50,50);
	}
}
var animation = function()
{
	/*
	if(frameIndex == 1)
	{
		frameIndex = 0;
	}
	*/
	if(hero_moved > 5)
	{
		hero_moved =1;
	}
	if(hero_moved == 5)
	{
		if(frameIndex == 1)
			frameIndex = 0;
		else
			frameIndex = 1;
	}

	/*frameIndex testing*/
		ctx.fillStyle = "#000000";
		ctx.font = "24px _sans";
		ctx.textBaseline = "top";
		ctx.fillText("frame: ", 32,64);
		
}
/*end of new codes from CJ*/


//main game loop
var main = function() {
		var now = Date.now();
		var delta = now - then;
		
		update(delta / 1000);
		render();
		youwin();
		then = now;
		
};
reset();
var then = Date.now();
var simulator = setInterval(main,1);
