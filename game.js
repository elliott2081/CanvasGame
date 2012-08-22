//create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

//put canvas into document(html)
document.body.appendChild(canvas);


var char_size = 64;
var char_src_size = 64;


//Handle keyboard controls
var keysDown = {};
addEventListener("keydown",function(e){
		keysDown[e.keyCode] = true;
		}, false);
		
addEventListener("keyup",function(e){
		delete keysDown[e.keyCode];
		}, false);

//update game objects -- update runs every game loop and is responsible for charachter movement (hero and robots), and collision detection
// should probably be broken up into smaller functions
var update = function (modifier){	
	keyboard_movement(modifier);
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
				ctx.drawImage(heroImage, (hero.direction*(char_src_size*2) + heroFrameIndex*char_src_size), 0, char_src_size,char_src_size ,hero.x, hero.y, char_size,char_size);
		//}
		if(robotReady){
			
				ctx.drawImage(robotImage, (robot.direction*(char_src_size*2) + robot_frameIndex*char_src_size), 0, char_src_size, char_src_size, robot.x, robot.y, char_size, char_size);
		}
		
		//score
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("heroFrameIndex " + heroFrameIndex, 32, 32);
		/*
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "24px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("heroMoved " + hero_moved, 32, 56);*/
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


	if(hero_or_robot == 1){//for hero
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
			if(heroFrameIndex == 1)
				heroFrameIndex = 0;
			else
				heroFrameIndex = 1;
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
	/*heroFrameIndex testing*/
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