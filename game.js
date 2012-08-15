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
	var mapRows = 9;
	var mapCols = 16;


//hero
//var heroReady = false;
var heroImage = new Image();
/*heroImage.onload = function(){
		heroReady = true;
};*/
//heroImage.src = "images/arrows.png";
heroImage.src = "images/greenArrow.png";



/*--------------- new codes from CJ --------- */
//hero's frameIndex
var tile_size = 64;
var tile_src_size = 32;
var char_size = 64;
var char_src_size = 64;
var frameIndex = 0;

var EndWalkableNum = 6;


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



//Handle keyboard controls
var keysDown = {};
addEventListener("keydown",function(e){
		keysDown[e.keyCode] = true;
		}, false);
		
addEventListener("keyup",function(e){
		delete keysDown[e.keyCode];
		}, false);
		
//Reset the game when the player catches a robot		
/*
var reset = function(){
		//hero.x = canvas.width / 2;
		//hero.y = canvas.height / 2;
		
		robot.x = tile_size + (Math.random()* (canvas.width - tile_size));
		robot.y = tile_size + (Math.random()* (canvas.height - tile_size));
};
*/
//update game objects
var update = function (modifier){

	
	
		var old_hero_x = hero.x;
		var old_hero_y = hero.y;
		var heroMovement = hero.speed*modifier;
		var ease = 10;
		
		if (38 in keysDown){ //player holding up
			
			//map tile collision detection
			var ColandRow1 = onTile(hero.x+ease, hero.y-(heroMovement)+ease);
			var ColandRow2 = onTile((hero.x+char_size)-ease, hero.y-(heroMovement)+ease);
			if((getTileNum(ColandRow1) <= EndWalkableNum) && (getTileNum(ColandRow2) <= EndWalkableNum))
			{
				hero.y -= hero.speed * modifier;
				hero_moved += 1;// CJ's code
				animation(3,1);
			}
			
			
		}
		else if (40 in keysDown){ //player holding down
			var ColandRow3 = onTile(hero.x+ease, ((hero.y+char_size)+heroMovement)-ease);
			var ColandRow4 = onTile((hero.x+char_size)-ease, ((hero.y+char_size)+heroMovement)-ease);
			if((getTileNum(ColandRow3) <= EndWalkableNum) && (getTileNum(ColandRow4) <= EndWalkableNum))
			{
				hero.y += hero.speed * modifier;
				hero_moved += 1;// CJ's code
				animation(1,1);
			}
			
		}
		else if (37 in keysDown){ //holding left
			var ColandRow1 = onTile((hero.x-heroMovement)+ease, hero.y+ease);
			var ColandRow3 = onTile((hero.x-heroMovement)+ease, (hero.y+char_size)-ease);
			if((getTileNum(ColandRow1) <= EndWalkableNum) && (getTileNum(ColandRow3) <= EndWalkableNum))
			{
				hero.x -= hero.speed * modifier;
				hero_moved += 1;// CJ's code
				animation(2,1);
			}
			
		}
		else if (39 in keysDown){ //holding right
			var ColandRow2 = onTile(((hero.x+char_size)+heroMovement)-ease, hero.y+ease);
			var ColandRow4 = onTile(((hero.x+char_size)+heroMovement)-ease, (hero.y+char_size)-ease);
			if((getTileNum(ColandRow2) <= EndWalkableNum) && (getTileNum(ColandRow4) <= EndWalkableNum))
			{
				hero.x += hero.speed * modifier;
				hero_moved += 1;// CJ's code
				animation(0,1);
			}
			
		}
	
		//robot x, y changes here
		/*
		if (38 in keysDown){ //player holding up
			robot.y -= robot.speed*modifier;
			robot_moved+=1;
			animation(3,2);
		}
		else if (40 in keysDown){ //player holding down
			robot.y += robot.speed*modifier;
			robot_moved+=1;
			animation(1,2);
		}
		else if (37 in keysDown){ //holding left
			robot.x -= robot.speed*modifier;
			robot_moved+=1;
			animation(2,2);
		}
		else if (39 in keysDown){ //holding right
			robot.x += robot.speed*modifier;
			robot_moved+=1;
			animation(0,2);
		}else
		{
		}		
		*/
		
		robot_movement_helper(modifier);

			
		/*collision detections */
				
		//touching robot
		if(
				hero.x <= (robot.x + char_size)
				&& robot.x <= (hero.x + char_size)
				&& hero.y <= (robot.y + char_size)
				&& robot.y <= (hero.y + char_size)
			){
			
				gameOver();
			}
		//touching border for hero
			if(hero.y < 0){ //top of the screen
				if(currentTileMap-tileMapArrayDimension < 0){
					hero.y = old_hero_y;
				}
				else{
					hero.y = canvas.height-char_size;
					currentTileMap -= tileMapArrayDimension;
					robotReload();
				}
			}
			
			if(hero.y > (canvas.height-char_size)){//bottom of the screen // 480 - 64
				if(currentTileMap+tileMapArrayDimension >= tileMapArray.length ){
					hero.y = old_hero_y;
				}
				else{
					hero.y = 0;
					currentTileMap += tileMapArrayDimension;
					robotReload();
				}
			}
			if(hero.x < 0){ //left side of screen
				if(currentTileMap % tileMapArrayDimension == 0){
					hero.x = old_hero_x;
				}
				else{
					hero.x = canvas.width-char_size;
					currentTileMap--;
					robotReload();
				}
			}
			if(hero.x > (canvas.width-char_size)){ //right side of screen //512 -64
				if((((currentTileMap+1) % tileMapArrayDimension)) == 0){
					hero.x = old_hero_x;
				}
				else{
					hero.x = 0;
					currentTileMap++;
					robotReload();
				}
			}
			
		//touching border for robot
			if(robot.y < 0)
				robot.y = 0;
			if(robot.y > (canvas.height-char_size)) // 480 - 64
				robot.y = canvas.height-char_size;
			if(robot.x < 0)
				robot.x = 0;
			if(robot.x > (canvas.width-char_size)) //512 -64
				robot.x = canvas.width-char_size;
			
		}; 
		
/*getTileNum: take object with row and col like the one on "onTile" function
 and returns tile number that represent type of tile. 
*/

var getTileNum = function(RowandCol){
	return tileMapArray[currentTileMap][RowandCol.row][RowandCol.col];
	};

var onTile = function(charX, charY){
	var currentColumn = Math.floor(charX / tile_size);
	var currentRow = Math.floor(charY /tile_size);
	//cCol_cRow is current column and current row of char
	var cCol_cRow = { col: currentColumn, 
					 row: currentRow };
	return cCol_cRow;
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
		if(robotReady){
			
				ctx.drawImage(robotImage, (robot.direction*(char_src_size*2) + robot_frameIndex*char_src_size), 0, char_src_size, char_src_size, robot.x, robot.y, char_size, char_size);
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

var gameOver = function()
{


		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("You Died!!", 50,50);
		
		
		clearInterval (simulator);
	
};
//d is direction pressed
var animation = function(d, hero_or_robot){


	if(hero_or_robot == 1){
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
		//logic for robot movement
		if(robot.direction != d)
		{
			robot_moved = 5;
			robot.direction  = d;
		}
		if(robot_moved > 5)
		{
			robot_moved =1;
		}
		if(robot_moved == 5)
		{
			if(robot_frameIndex == 1)
				robot_frameIndex = 0;
			else
				robot_frameIndex = 1;
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
		
		then = now;
		
};
//reset();
var then = Date.now();
var simulator = setInterval(main,1);