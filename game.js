//create the canva
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
//put canvas into document(html)
document.body.appendChild(canvas);

// World Map
var currentTileMap = 0;
var tileMapArrayDimension = 4; // height and width of theorhetical 2 dimensional tileMapArray
var tileMapArray = [tileMap0, tileMap1, tileMap2, tileMap3, tileMap4, tileMap5, tileMap6 ,tileMap7, tileMap8 ,tileMap9, tileMap10, tileMap11, tileMap12, tileMap13, tileMap14, tileMap15]; // represented as a 1 dimensional array but thought of as 2
/*
//background image.
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
		bgReady = true;
};
bgImage.src = "images/background.png";
*/
//new back ground related
	var tileSheet = new Image();
	//tileSheet.addEventListener('load', eventSheetLoaded , false);
	var bgReady = false;
	tileSheet.onload = function(){
		bgReady = true;
	};
	tileSheet.src = "images/mapFiles/tileSheet2.png";
	var mapIndexOffset = -1;
	var mapRows = 18;
	var mapCols = 32;


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
monsterImage.src = "images/robots.png";

/*--------------- new codes from CJ --------- */
//hero's frameIndex
var tile_size = 32;
var tile_src_size = 32;
var char_size = 64;
var char_src_size = 64;
var frameIndex = 0;


var monster_frameIndex = 0;
var monster_moved = 1;
var monster_randomly_moved = 1;
/*hero_moved: 1 ms(src image change!), 2ms, 3ms, 4ms, 5ms(=src image change!)*/
var hero_moved = 1;


/*end of new codes from CJ(glob. variables)*/


//game objects
var hero = {
		speed: 256, //movementin pixels per second
		x: 90,
		y: 90,
		direction: 0
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
		
		monster.x = tile_size + (Math.random()* (canvas.width - tile_size));
		monster.y = tile_size + (Math.random()* (canvas.height - tile_size));
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
			monster_movement_helper(modifier);
		}		
		/* temporary testing for monster's movement
		monster.direction = Math.floor(Math.random()*4);
		monster.x = monster.x + 1;
		monster.y = monster.y + 1;
		*/
		
		
		
			
		/*collision detections */
		
		//touching monster
		if(
				hero.x <= (monster.x + tile_size)
				&& monster.x <= (hero.x + tile_size)
				&& hero.y <= (monster.y + tile_size)
				&& monster.y <= (hero.y + tile_size)
			){
				++monsterCaught;
				reset();
			}
		//touching border for hero
			if(hero.y < 0){ //top of the screen
				if(((currentTileMap)%tileMapArrayDimension) == 0){
					hero.y = old_hero_y;
				}
				hero.y = canvas.height-char_size;
				currentTileMap -= tileMapArrayDimension;
			}
			if(hero.y > (canvas.height-char_size)){//bottom of the screen // 480 - 64
				if(currentTileMap%tileMapArrayDimension == 0){
					hero.y = old_hero_y;
				}
				hero.y = 0;
				currentTileMap += tileMapArrayDimension;
			}
			if(hero.x < 0){ //left side of screen
				if(currentTileMap % tileMapArrayDimension == 0){
					hero.x = old_hero_x;
				}
				hero.x = canvas.width-char_size;
				currentTileMap--;
			}
			if(hero.x > (canvas.width-char_size)){ //right side of screen //512 -64
				if((((currentTileMap+1) % tileMapArrayDimension)) == 0){
					hero.x = old_hero_x;
				}
				else{
				hero.x = 0;
				currentTileMap++;
				}
			}
		//touching border for monster
			if(monster.y < 0)
				monster.y = 0;
			if(monster.y > (canvas.height-tile_size)) // 480 - 64
				monster.y = canvas.height-tile_size;
			if(monster.x < 0)
				monster.x = 0;
			if(monster.x > (canvas.width-tile_size)) //512 -64
				monster.x = canvas.width-tile_size;
				
		
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
		
		//monster randomly moved is incremented here
		
		}; 
		
var monster_movement_helper = function(modifier){
	//for monster's random movement
	//for every 1 sec when hero does not move, monster will move
	if(monster_randomly_moved == 100){
	monster_randomly_moved = 1;

		//between 3~4 : up
		//between 2~3 : down
		//between 1~2 : left
		//between 0~1 : right
		var monster_random_direction = Math.random() * 4;
		if(monster_random_direction >= 3){
			monster.y -=monster.speed*modifier;
			monster_moved+=1;
			animation(3, 2);
		}else if(monster_random_direction >= 2){
			monster.y += monster.speed * modifier;
			monster_moved += 1;
			animation(1, 2);
		}else if(monster_random_direction >= 1){
			monster.x -= monster.speed * modifier;
			monster_moved += 1;
			animation(2, 2);
		}else{
			monster.x += monster.speed * modifier;
			monster_moved += 1;
			animation(0, 2);
		
		}
	}		

		monster_randomly_moved ++;

};
		
//draw everything
var render = function(){

		if(bgReady){
			for (var rowCtr=0;rowCtr<mapRows;rowCtr++) {
				for (var colCtr=0;colCtr<mapCols;colCtr++){
					var tileId = tileMapArray[currentTileMap][rowCtr][colCtr]+mapIndexOffset;
					var sourceX = (tileId *tile_src_size);
					//console.log(tileId*tile_src_size);
					//var sourceY = Math.floor(tileId / 8) *32;
					ctx.drawImage(tileSheet, sourceX,
					0,tile_src_size,tile_src_size,colCtr*tile_size,rowCtr*tile_size,tile_size,tile_size);
				}
			} 
		}
		//if(heroReady){
		//changed from " ctx.drawImage(heroImage, hero.x, hero.y); "
				ctx.drawImage(heroImage, (hero.direction*(char_src_size*2) + frameIndex*char_src_size), 0, char_src_size,char_src_size ,hero.x, hero.y, char_size,char_size);
		//}
		if(monsterReady){
			
				ctx.drawImage(monsterImage, (monster.direction*(char_src_size*2) + monster_frameIndex*char_src_size), 0, char_src_size, char_src_size, monster.x, monster.y, char_size, char_size);
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
};
//d is direction pressed
var animation = function(d, hero_or_monster){


	if(hero_or_monster == 1){
		if(hero.direction != d)
		{
			hero_moved = 5;
			hero.direction = d;
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
		
};
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