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
	collisionDetection();	//from tileMovement.js 
	keyboard_movement(modifier); //from hero.js
	robot_movement_helper(modifier);	//from robot.js
	intro();
}; 


//draw everything - gets called every game cycle
var render = function(){
	if (isGameOver){
		gameOver();
	}
	else if(intro_var)
	{
		ctx.drawImage(backgroundImage,0,0);
		
		
		//ctx.fillStyle = "black";
		//ctx.font = "24px Helvetica";
		//ctx.textAlign = "left";
		//ctx.textBaseline = "top";
		//ctx.fillText("press space bar goddamn it", 50,50);
	}else
	{
	

		
		if(bgReady){
		backgroundMusic.play();
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
		var winningTile = onTile(hero.x, hero.y);
			if(getTileNum(winningTile) == 26){
			youWin();
			}

		}
		//if(heroReady){
		//changed from " ctx.drawImage(heroImage, hero.x, hero.y); "
				ctx.drawImage(heroImage, (hero.direction*(char_src_size*4) + heroFrameIndex*char_src_size), 0, char_src_size,char_src_size ,hero.x, hero.y, char_size,char_size);
		//}
		if(robotReady){
			ctx.drawImage(robotImage, (robot.direction*(char_src_size*4) + robot_frameIndex*char_src_size), 0, char_src_size, char_src_size, robot.x, robot.y, char_size, char_size);
		}
	}
};		

/* new codes from CJ*/

var gameOver = function(){
	clearInterval(simulator);
	ctx.drawImage(gameOverScreen,0,0);
	/*
	ctx.fillStyle = "white";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	
	gameOver_text_style();
	ctx.fillText("You Died!!", 512,288);	
	gameOver_text_style();
	ctx.fillText("Game Developers: David Elliott, Jungyul Cho", 512, (288+25));
	gameOver_text_style();
	ctx.fillText("Graphics: Eric chandler", 512,(288+50));
	gameOver_text_style();
	ctx.fillText("Music: Stuart Moore", 512,(288+75));
	gameOver_text_style();
	ctx.fillText("special thanks to", 512,(288+105));
	gameOver_text_style();
	ctx.fillText("Elijah Hamovitz", 512,(288+130));
	*/
};

var youWin = function(){
	backgroundMusic.pause();

	clearInterval(simulator);
	
	ctx.drawImage(youWinScreen,0,0);
};
var gameOver_text_style = function(){
	ctx.fillStyle = "black";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	
}
//d is direction pressed
var animation = function(d, character){
	if(character.name == "hero"){//for hero
		if(character.direction != d)
		{
			character.char_moved = 15;
			character.direction = d;
		}
		if(character.char_moved > 15)
		{
			character.char_moved =1;
		}
		if(character.char_moved == 15)
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
		update(delta / 1000);
		render();
		then = now;
		
};
var intro = function(){
	if(32 in keysDown)
		intro_var = false;
};
var then = Date.now();
var simulator = setInterval(main,1);