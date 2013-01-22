//create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
var isGameOver = false;
var intro_var = true;
//put canvas into document(html)
document.body.appendChild(canvas);
var backgroundImage = new Image();
backgroundImage.src = "images/IntroScreen.png";

var gameOverScreen = new Image();
gameOverScreen.src = "images/gameOver.png";

var youWinScreen = new Image();
youWinScreen.src = "images/youWin.png";
//load sounds
var backgroundMusic = document.createElement('audio');
backgroundMusic.setAttribute('src', 'sounds/robot.mp3');
var char_size = 64;
var char_src_size = 64;
var bgmReady = false;
backgroundMusic.onload = function(){
	bgmReady = true;
};

var frame_change_rate = 15;


//Handle keyboard controls
var keysDown = {};
addEventListener("keydown",function(e){
		keysDown[e.keyCode] = true;
		}, false);
		
addEventListener("keyup",function(e){
		delete keysDown[e.keyCode];
		}, false);
var bgm_ready_fun = function(){
	return bgmReady;
};
//update game objects -- update runs every game loop and is responsible for charachter movement (hero and robots), and collision detection
// prepare for what render function will print out. 
var update = function (modifier){	
	collisionDetection();	//from tileMovement.js 
	keyboard_movement(modifier); //from hero.js
	robot_movement_helper(modifier);	//from robot.js
	intro();
}; 


//draw everything - gets called every game cycle
var render = function(){
	var winningTile = onTile(hero.x, hero.y);

	if (isGameOver){
		gameOver();
	}
	else if(getTileNum(winningTile) == 26)
	{
		youWin();
	}
	else if(intro_var)
	{
		ctx.drawImage(backgroundImage,0,0);
		
		
		//ctx.fillStyle = "black";
		//ctx.font = "24px Helvetica";
		//ctx.textAlign = "left";
		//ctx.textBaseline = "top";
		//ctx.fillText("press space bar goddamn it", 50,50);
	}
	else{
	

		
		//if(bgReady){
		//draw tiles
		backgroundMusic.play();
		for (var rowCtr=0;rowCtr<mapRows;rowCtr++) {
			for (var colCtr=0;colCtr<mapCols;colCtr++){
				var tileId = tileMapArray[currentTileMap][rowCtr][colCtr]+mapIndexOffset;
				var sourceX = (tileId *tile_src_size);
				
				ctx.drawImage(tileSheet, sourceX,
				0,tile_src_size,tile_src_size,colCtr*tile_size,rowCtr*tile_size,tile_size,tile_size);
			}
		} 
			/*
		var winningTile = onTile(hero.x, hero.y);
			if(getTileNum(winningTile) == 26){
			youWin();
			}*/

		//}
		//if(heroReady){
		//changed from " ctx.drawImage(heroImage, hero.x, hero.y); "
		ctx.drawImage(heroImage, (hero.direction*(char_src_size*4) + heroFrameIndex*char_src_size), 0, char_src_size,char_src_size ,hero.x, hero.y, char_size,char_size);
		//}
		//if(robotReady){
		ctx.drawImage(robotImage, (robot.direction*(char_src_size*4) + robot_frameIndex*char_src_size), 0, char_src_size, char_src_size, robot.x, robot.y, char_size, char_size);
		//}
		/*the way that we will draw item.
		if (speedyItem.exist == true){
			ctx.drawImage(####, ....)
		}
		*/
	}
};		


var gameOver = function(){
	end_screen = true;
	ctx.drawImage(gameOverScreen,0,0);
	//give option to restart the game. 
	//later on I need to link this to database to update with previous play information for specific people. 	
   	if(end_screen && 32 in keysDown){
		restart_game();
	}
};

var restart_game = function(){
    location.reload(true);
};

var youWin = function(){
	backgroundMusic.pause();
	clearInterval(simulator);	
	ctx.drawImage(youWinScreen,0,0);
	end_screen = true;
};
var gameOver_text_style = function(){
	ctx.fillStyle = "black";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	
}
//d is direction pressed or direction robot is moving
var animation = function(d, character){
	if(character.name == "hero"){//for hero
		if(character.direction != d)
		{
			character.char_moved = frame_change_rate;
			character.direction = d;
		}
		if(character.char_moved > frame_change_rate)
		{
			character.char_moved =1;
		}
		if(character.char_moved == frame_change_rate)
		{
			if(heroFrameIndex == 3)
				heroFrameIndex = 0;
			else
				heroFrameIndex += 1;
		}
	}else{	
		//logic for robot movement
		if(character.direction != d)
		{
			character.char_moved = 15;
			character.direction  = d;
		}
		if(character.char_moved > 15)
		{
			character.char_moved =1;
		}
		if(character.char_moved == 15)
		{
			if(robot_frameIndex == 3)
				robot_frameIndex = 0;
			else
				robot_frameIndex += 1;
		}
	}
};

//main game loop
var main = function() {
	var now = Date.now();
	var delta = now - then;
	item_removal(delta);
	update(delta / 1000);
	render();
	then = now;	
};

var item_removal = function(delta_var){
	if(hero.own_speedyItem == true){
		if(speedyItem.timer <= 0){
			hero.own_speedyItem = false;
			speedyItem.timer = 30000;
			hero.speed = 256;
			frame_change_rate = 15;
		}else{
			speedyItem.timer = speedyItem.timer - delta_var;
		}
		
	
	}
	if(robot.electricuted == true){
		if(item.timer <=0){
			hero.own_item = false;
			item.timer = 3000;
			robot.electricuted = false;
			robotImage.src = "images/robots.png";
		}else{
			item.timer = item.timer - delta_var;
		
		}
	}
	
	console.log(item.timer);
	
	

};

var intro = function(){
	if(32 in keysDown){
		if(bgm_ready_fun && robot_ready_fun() && hero_ready_fun()){
			intro_var = false;
		}else
		{
			//there some problem loading bgm, robot, hero. throw error catch phrase. something like "certain files are not loaded check your internet service 
			//or reload the page."
		}
	}
};
var then = Date.now();
var simulator = setInterval(main,1);