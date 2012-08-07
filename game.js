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
//heroImage.src = "images/arrows.png";
heroImage.src = "images/greenArrow.png";

//monster
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
		monsterReady = true;
};
monsterImage.src = "images/redArrow.png";

/*--------------- new codes from CJ --------- */
var frameIndex = 0;
var direction = 0;

var monster_frameIndex = 0;
var monster_moved = 1;

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
		speed: 228,
		x: 0,
		y: 0,
		//1 = down, 2 = left , 3 = up, 0 = right 
		direction: 0
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
		//hero.x = canvas.width / 2;
		//hero.y = canvas.height / 2;
		
		monster.x = 32 + (Math.random()* (canvas.width - 64));
		monster.y = 32 + (Math.random()* (canvas.height - 64));
};

//update game objects
var update = function (modifier){
		var old_hero_x = hero.x;
		var old_hero_y = hero.y;
		/*if(37 in keysDown && 38 in keysDown){//DIAGANOLS (left & up)
			hero.x -= hero.speed * modifier;
			hero_moved += 1;// CJ's code
			hero.y -= hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation(2);

		}else */
		if (38 in keysDown){ //player holding up
			hero.y -= hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation(3,1);
		}
		else if (40 in keysDown){ //player holding down
			hero.y += hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation(1,1);
		}
		else if (37 in keysDown){ //holding left
			hero.x -= hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation(2,1);
		}
		else if (39 in keysDown){ //holding right
			hero.x += hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation(0,1);
		}
	
		//monster x, y changes here
		if (38 in keysDown){ //player holding up
			monster.y -= monster.speed*modifier;
			monster_moved+=1;
			animation(3,2);
		}
		else if (40 in keysDown){ //player holding down
			monster.y += monster.speed*modifier;
			monster_moved+=1;
			animation(1,2);
		}
		else if (37 in keysDown){ //holding left
			monster.x -= monster.speed*modifier;
			monster_moved+=1;
			animation(2,2);
		}
		else if (39 in keysDown){ //holding right
			monster.x += monster.speed*modifier;
			monster_moved+=1;
			animation(0,2);
		}else
		{
		
			
		}		
		/* temporary testing for monster's movement
		monster.direction = Math.floor(Math.random()*4);
		monster.x = monster.x + 1;
		monster.y = monster.y + 1;
		*/
		
		
		
			
		/*collision detections */
		
		//touching monster
		if(
				hero.x <= (monster.x + 32)
				&& monster.x <= (hero.x + 32)
				&& hero.y <= (monster.y + 32)
				&& monster.y <= (hero.y + 32)
			){
				++monsterCaught;
				reset();
			}
		//touching border for hero
			if(hero.y < 0)
				hero.y = old_hero_y;
			if(hero.y > 416) // 480 - 64
				hero.y = old_hero_y;
			if(hero.x < 0)
				hero.x = old_hero_x;
			if(hero.x > 448) //512 -64
				hero.x = old_hero_x;
				
		//touching border for monster
			if(monster.y < 0)
				monster.y = 0;
			if(monster.y > 416) // 480 - 64
				monster.y = 416;
			if(monster.x < 0)
				monster.x = 0;
			if(monster.x > 448) //512 -64
				monster.x = 448;
				
		
		/* old border collision detection 
		if (38 in keysDown){ //player holding up
			if(hero.y < 0)
				hero.y = old_hero_y;
		}
		if (40 in keysDown){ //player holding down
			if(hero.y > 448) // 480 - 32
				hero.y = old_hero_y;
		}
		if (37 in keysDown){ //holding left
			if(hero.x < 0)
				hero.x = old_hero_x;
		}
		if (39 in keysDown){
			if(hero.x > 480)
				hero.x = old_hero_x;
		}*/
		/* end of collision detections */
		
		
		
		}; 
		
//draw everything
var render = function(){

		if(bgReady){
				ctx.drawImage(bgImage, 0,0); 
		}
		//if(heroReady){
		//changed from " ctx.drawImage(heroImage, hero.x, hero.y); "
				ctx.drawImage(heroImage, (direction*128 + frameIndex*64), 0, 64,64 ,hero.x, hero.y, 64,64);
		//}
		if(monsterReady){
			
				ctx.drawImage(monsterImage, (monster.direction*128 + monster_frameIndex*64), 0, 64, 64, monster.x, monster.y, 64, 64);
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
//d is direction pressed
var animation = function(d, hero_or_monster){


	if(hero_or_monster == 1){
		if(direction != d)
		{
			hero_moved = 5;
			direction = d;
		}
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
	}else{
		//logic for monster movement
		if(monster.direction != d)
		{
			monster_moved = 5;
			monster.direction  = d;
		}
		if(monster_moved > 5)
		{
			monster_moved =1;
		}
		if(monster_moved == 5)
		{
			if(monster_frameIndex == 1)
				monster_frameIndex = 0;
			else
				monster_frameIndex = 1;
		}
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
