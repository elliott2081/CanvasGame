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
	collisionDetection();	
}; 

//draw everything - gets called every game cycle
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
			
				ctx.drawImage(robotImage, (robot.direction*(char_src_size*3) + robot_frameIndex*char_src_size), 0, char_src_size, char_src_size, robot.x, robot.y, char_size, char_size);
		}
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
var animation = function(d, character){
	if(character.name == "hero"){//for hero
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
		console.log(robot_frameIndex);
		//logic for robot movement
		if(robot.direction != d)
		{
			robot_moved = 10;
			robot.direction  = d;
		}
		if(robot_moved > 10)
		{
			robot_moved =1;
		}
		if(robot_moved == 10)
		{
			if(robot_frameIndex == 2)
				robot_frameIndex = 0;
			else
				robot_frameIndex += 1;
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