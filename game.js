
//create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

var isGameOver = false;
var insideIntroScreen = true;
var introScreens = [true, false, false, false, false, false]; //0: first intro, 1: level 1, 2: level 2, 3: level 3 intro 4: game over
var currentLevel = [false, false, false];
var intro_var = true;
//put canvas into document(html)
document.body.appendChild(canvas);
var StartScreen = new Image();
StartScreen.src = "images/IntroScreen.png";
var IntroLevel1 = new Image();
IntroLevel1.src = "images/level1IntroScreen.png";
var IntroLevel2 = new Image();
IntroLevel2.src = "images/level2IntroScreen.png";
var IntroLevel3 = new Image();
IntroLevel3.src = "images/level3IntroScreen.png";

var itemImage = new Image();
itemImage.src = "images/tazer.png";
var speedyItemImage = new Image();
speedyItemImage.src = "images/energy_drink.png";

var gameOverScreen = new Image();
gameOverScreen.src = "images/gameOver.png";

var youWinScreen = new Image();
youWinScreen.src = "images/youWin.png";
//load sounds
var backgroundMusic = document.createElement('audio');
var backgroundMusic2 = document.createElement('audio');
var backgroundMusic3 = document.createElement('audio');

backgroundMusic.setAttribute('src', 'sounds/robot.mp3');
backgroundMusic2.setAttribute('src', 'sounds/wings.mp3');
backgroundMusic3.setAttribute('src', 'sounds/wings.mp3');

var char_size = 64;
var char_src_size = 64;
var bgmReady = false;
backgroundMusic.onload = function(){
	bgmReady = true;
};

var frame_change_rate = 10;


//Handle keyboard controls
var keysDown = {};
addEventListener("keydown",function(e){
		keysDown[e.keyCode] = true;
		}, false);
		
addEventListener("keyup",function(e){
		delete keysDown[e.keyCode];
		heroFrameIndex = 3;
		}, false);
var bgm_ready_fun = function(){
	return bgmReady;
};
//update game objects -- update runs every game loop and is responsible for charachter movement (hero and robots), and collision detection
// prepare for what render function will print out. 
var update = function (modifier){	
	rockMovement(modifier); //rock.js
	collisionDetection();	//from tileMovement.js 
	keyboard_movement(modifier); //from hero.js
	robot_movement_helper(modifier);	//from robot.js
	intro(modifier);
	
}; 


//draw everything - gets called every game cycle
var render = function(){
	if (isGameOver){
		gameOver();
	}
	else if(introScreens[4] == true)
	{
		youWin();
	}
	else if(introScreens[0] == true)
	{
		ctx.drawImage(StartScreen,0,0);
	}else if(introScreens[1] == true)
	{
		ctx.drawImage(IntroLevel1, 0,0);
	}else if(introScreens[2] == true)
	{
		ctx.drawImage(IntroLevel2, 0,0);
	}else if(introScreens[3] == true)
	{
		ctx.drawImage(IntroLevel3, 0,0);
	}else if(currentLevel[0] == true)
	{
		//draw level1 tiles
		backgroundMusic.play();
		for (var rowCtr=0;rowCtr<mapRows;rowCtr++) {
			for (var colCtr=0;colCtr<mapCols;colCtr++){
				var tileId = tileMapArray[currentTileMap][rowCtr][colCtr]+mapIndexOffset;
				var sourceX = (tileId *tile_src_size);
				
				ctx.drawImage(tileSheet, sourceX,
				0,tile_src_size,tile_src_size,colCtr*tile_size,rowCtr*tile_size,tile_size,tile_size);
			}
		}
		if(item.availability == true){
			ctx.drawImage(itemImage, item.x, item.y);
		}
		if(speedyItem.availability == true){
			ctx.drawImage(speedyItemImage, speedyItem.x, speedyItem.y);
		}
		
		if(rock.active == true) {
			ctx.drawImage(rockImage, rock.x, rock.y); 
		}
		
		ctx.drawImage(heroImage, (hero.direction*(char_src_size*4) + heroFrameIndex*char_src_size), 0, char_src_size,char_src_size ,hero.x, hero.y, char_size,char_size);

		if(robot.live == true){
			ctx.drawImage(robotImage, (robotArray[0].direction*(char_src_size*4) + robotArray[0].robot_frameIndex*char_src_size), 0, char_src_size, char_src_size, robotArray[0].x, robotArray[0].y, char_size, char_size);
		}
	}
	else if(currentLevel[1] == true){
		//draw level2 tiles
		console.log("IN LEVEL 2 ELSE IF");
		//backgroundMusic.setAttribute('src', 'sounds/wings.mp3');
		backgroundMusic2.play();

		for (var rowCtr=0;rowCtr<mapRows;rowCtr++) {
			for (var colCtr=0;colCtr<mapCols;colCtr++){
				var tileId = tileMapArray[currentTileMap][rowCtr][colCtr]+mapIndexOffset;
				var sourceX = (tileId *tile_src_size);
				
				ctx.drawImage(tileSheet, sourceX,
				0,tile_src_size,tile_src_size,colCtr*tile_size,rowCtr*tile_size,tile_size,tile_size);
			}
		} 
		if(item.availability == true){
			ctx.drawImage(itemImage, item.x, item.y);
		}
		if(speedyItem.availability == true){
			ctx.drawImage(speedyItemImage, speedyItem.x, speedyItem.y);
		}
		ctx.drawImage(heroImage, (hero.direction*(char_src_size*4) + heroFrameIndex*char_src_size), 0, char_src_size,char_src_size ,hero.x, hero.y, char_size,char_size);
		if(robotArray[0].live == true){
			ctx.drawImage(robotImage, (robotArray[0].direction*(char_src_size*4) + robotArray[0].robot_frameIndex*char_src_size), 0, char_src_size, char_src_size, robotArray[0].x, robotArray[0].y, char_size, char_size);
		}
		if(rock.active == true) {
			ctx.drawImage(rockImage, rock.x, rock.y); 
		}
	}
	else if(currentLevel[2] == true){
		//draw level3 tiles
		//backgroundMusic.setAttribute('src', 'sounds/wings.mp3');
		backgroundMusic2.pause();
		backgroundMusic3.play();
		for (var rowCtr=0;rowCtr<mapRows;rowCtr++) {
			for (var colCtr=0;colCtr<mapCols;colCtr++){
				var tileId = tileMapArray[currentTileMap][rowCtr][colCtr]+mapIndexOffset;
				var sourceX = (tileId *tile_src_size);
				
				ctx.drawImage(tileSheet, sourceX,
				0,tile_src_size,tile_src_size,colCtr*tile_size,rowCtr*tile_size,tile_size,tile_size);
			}
		}
		if(item.availability == true){
			ctx.drawImage(itemImage, item.x, item.y);
		}
		if(speedyItem.availability == true){
			ctx.drawImage(speedyItemImage, speedyItem.x, speedyItem.y);
		}
		if(rock.active == true) {
			ctx.drawImage(rockImage, rock.x, rock.y); 
		}
		ctx.drawImage(heroImage, (hero.direction*(char_src_size*4) + heroFrameIndex*char_src_size), 0, char_src_size,char_src_size ,hero.x, hero.y, char_size,char_size);
		if(robotArray[0].live == true){
			ctx.drawImage(robotImage, (robotArray[0].direction*(char_src_size*4) + robotArray[0].robot_frameIndex*char_src_size), 0, char_src_size, char_src_size, robotArray[0].x, robotArray[0].y, char_size, char_size);
		}
	}
};		
 

var gameOver = function(){
	ctx.drawImage(gameOverScreen,0,0);
	//give option to restart the game. 
	//later on I need to link this to database to update with previous play information for specific people. 	
   	if(32 in keysDown){
		restart_game();
	}
};

var restart_game = function(){
    location.reload(true);
};

var youWin = function(){
	//backgroundMusic.pause();
	//backgroundMusic2.pause();
	backgroundMusic3.pause();
	ctx.drawImage(youWinScreen,0,0);
   	if(32 in keysDown){
		restart_game();
	}
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
			if(robotArray[0].robot_frameIndex == 3)
				robotArray[0].robot_frameIndex = 0;
			else
				robotArray[0].robot_frameIndex += 1;
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
	if(robotArray[0].electricuted == true){
		
		if(item.timer <=0){
			//hero.own_item = false;
			item.timer = 3000;
			robotArray[0].electricuted = false;
			robotImage.src = "images/robots.png";
		}else{
			item.timer = item.timer - delta_var;
		
		}
	}
		
	

};

var introTimeOut = 250;
var intro = function(timeModifier){
	timeModifier = timeModifier * 1000;
	if(!(introTimeOut < 0)){
		introTimeOut = introTimeOut - timeModifier;
	}
	/*
	var inScreensString = '[';
	for(var j = 0; j < introScreens.length; j++){
		inScreensString += " " + introScreens[j] + " , " ;
	}
	console.log("INSIDE INTRO introScreens = " + inScreensString );
	*/
	
	var heroCurrentTile = onTile(hero.x, hero.y);

	if(32 in keysDown){
		/*
		var inScreensString = '[';
		for(var j = 0; j < introScreens.length; j++){
			inScreensString += " " + introScreens[j] + " , " ;
		}
		var keysDownString = '[';
		for(var k = 0; k < keysDown.length; k++){
			keysDownString += " " + keysDown[k] + " , " ;
		}
		*/
		//console.log("INSIDE INTRO introScreens = " + inScreensString );
		//console.log(" KEYS DOWN = " + keysDownString);
		
		if(bgm_ready_fun && robot_ready_fun() && hero_ready_fun()){
			if(introScreens[0] == true && introTimeOut < 0){
				introScreens[0] = false;
				introScreens[1] = true;
				introTimeOut = 250;
				console.log("start screen");
				
			}else if(introScreens[1] == true && introTimeOut < 0){
				// level 1 intro screen data update
				introScreens[1] = false; 
				currentLevel[0] = true;
				insideIntroScreen = false;
				console.log("level 1 intro screen");
			}else if(introScreens[2] == true){
				currentLevel[0] = false;
				// level 2 intro screen data update
				console.log("level 2 intro screen");
				introScreens[2] = false;
				currentLevel[1] = true;
				insideIntroScreen = false;
				currentTileMap = 16;
				robotReload();
			}else if(introScreens[3] == true){
				currentLevel[1] = false;
				//level 3 intro screen data update
				introScreens[3] = false;
				currentLevel[2] = true;
				insideIntroScreen = false;
			}
		}else
		{
			//there some problem loading bgm, robot, hero. throw error catch phrase. something like "certain files are not loaded check your internet service 
			//or reload the page."
		}
	}
	// hero reached end of level 1
	else if(getTileNum(heroCurrentTile) == 26)
	{
		for(var i = 0; i < introScreens.length; i++){
			introScreens[i] = false;
		}
		introScreens[2] = true;
		insideIntroScreen = true;
		backgroundMusic.pause();

	}
	// hero reached end of level 2
	else if(getTileNum(heroCurrentTile) == 46){
		for(var i = 0; i < introScreens.length; i++){
			introScreens[i] = false;
		}
		introScreens[3] = true;
		insideIntroScreen = true;
	}
	else if(getTileNum(heroCurrentTile) == 66){
		for(var i = 0; i < introScreens.length; i++){
			introScreens[i] = false;
		}
		introScreens[4] = true;
		insideIntroScreen = true;
	}
};
var then = Date.now();

var prep = {};
var robot = new robot();
robotArray[0] = robot;
var simulator = setInterval(main,1);