
//create the canvas
var canvas = document.createElement("canvas");
div = document.getElementById("test");
var ctx = canvas.getContext("2d");
canvas.width = 1024;
div.style.width = canvas.width + "px";
canvas.height = 576;
div.appendChild(canvas);

//div.style.height = window.innerHeight;
//div.style.width = window.innerWidth;

//canvas.style.marginRight = (Math.abs(window.innerWidth-2 - canvas.width) / 2) +"px";
//canvas.style.marginLeft = (Math.abs(window.innerWidth-2 - canvas.width) / 2) +"px";

//(div.style.height - canvas.height);
//var window_width = window.innerWidth;
//var window_height = window.innerHeight;

//div.style.top = (window_height - canvas.height) / 2 ;
//div.style.left = (window_width - canvas.width) / 2 ;
//document.getElementsByTagName("canvas").className = "center";
/*
div.style.margin = "0px auto";
canvas.style.margin = "0px auto";*/
//canvas.style.marginLeft = "50px";
var isGameOver = false;
var insideIntroScreen = true;
var introScreens = [true, false, false, false, false, false]; //0: first intro, 1: level 1, 2: level 2, 3: level 3 intro 4: game over
var currentLevel = [false, false, false];

// THIS IS WHERE THE PASSWORD URLS WILL BE DEFINED. 
if(document.URL == "file:///C:/Users/delliott/Documents/Aptana%20Studio%203%20Workspace/CanvasGame/index.html#secretcaves"){

	introScreens = [false, false, true, false, false, false];
}

var intro_var = true;

var StartScreen = new Image();
StartScreen.src = "images/IntroScreen.png";
var IntroLevel1 = new Image();
IntroLevel1.src = "images/level1IntroScreen.png";
var IntroLevel2 = new Image();
IntroLevel2.src = "images/level2IntroScreen.png";
var IntroLevel3 = new Image();
IntroLevel3.src = "images/level3IntroScreen.png";

var gameOverScreen = new Image();
gameOverScreen.src = "images/gameOver.png";

var youWinScreen = new Image();
youWinScreen.src = "images/youWin.png";
//load sounds
var backgroundMusic = document.createElement('audio');
var backgroundMusic2 = document.createElement('audio');
var backgroundMusic3 = document.createElement('audio');

backgroundMusic.setAttribute('src', 'sounds/wings.mp3');
backgroundMusic2.setAttribute('src', 'sounds/wings.mp3');
backgroundMusic3.setAttribute('src', 'sounds/wings.mp3');

var char_size = 64;
var char_src_size = 64;
var bgmReady = false;
backgroundMusic.onload = function(){
	bgmReady = true;
};

var frame_change_rate = 35;


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
	item_removal(modifier*1000);
	rockMovement(modifier,robotArray,introScreens); //rock.js
	
	collisionDetectionDistributor(robotArray);	//from tileMovement.js 
	keyboard_movement(modifier); //from hero.js
	robot_movement_helper_distributor(modifier, robotArray);	//from robot.js
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
	}

	// SETTING UP LEVEL 1
	else if(currentLevel[0] == true)
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
		if(gunOnTheGround.availability == true){
			ctx.drawImage(gunImage, gunOnTheGround.x, gunOnTheGround.y);
		}
		if(rock.active == true) {
			ctx.drawImage(rockImage, rock.x, rock.y); 
		}
		
		ctx.drawImage(heroImage, (hero.direction*(char_src_size*4) + heroFrameIndex*char_src_size), 0, char_src_size,char_src_size ,hero.x, hero.y, char_size,char_size);

		//print live robots
		for(var i = 0; i < robotArray.length; i++){
			if(robotArray[i].live == true){
				ctx.drawImage(robotArray[i].robotImage, (robotArray[i].direction*(char_src_size*4) + robotArray[i].robot_frameIndex*char_src_size), 0, char_src_size, char_src_size, robotArray[i].x, robotArray[i].y, char_size, char_size);
			}
		}
	}

	// SETTING UP LEVEL 2
	else if(currentLevel[1] == true){
		//draw level2 tiles
		backgroundMusic.pause();
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

		//print live robots
		for(var i = 0; i < robotArray.length; i++){
			if(robotArray[i].live == true){
				ctx.drawImage(robotArray[i].robotImage, (robotArray[i].direction*(char_src_size*4) + robotArray[i].robot_frameIndex*char_src_size), 0, char_src_size, char_src_size, robotArray[i].x, robotArray[i].y, char_size, char_size);
			}
		}
		if(gunOnTheGround.availability == true){
			ctx.drawImage(gunImage, gunOnTheGround.x, gunOnTheGround.y);
		}
		if(rock.active == true) {
			ctx.drawImage(rockImage, rock.x, rock.y); 
		}
	}
	// SETTING UP LEVEL 3
	else if(currentLevel[2] == true){
		//draw level3 tiles
		//backgroundMusic.setAttribute('src', 'sounds/wings.mp3');
		backgroundMusic.pause();
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
		if(gunOnTheGround.availability == true){
			ctx.drawImage(gunImage, gunOnTheGround.x, gunOnTheGround.y);
		}
		if(rock.active == true) {
			ctx.drawImage(rockImage, rock.x, rock.y); 
		}
		ctx.drawImage(heroImage, (hero.direction*(char_src_size*4) + heroFrameIndex*char_src_size), 0, char_src_size,char_src_size ,hero.x, hero.y, char_size,char_size);
		//print live robots
		for(var i = 0; i < robotArray.length; i++){
			if(robotArray[i].live == true){
				ctx.drawImage(robotArray[i].robotImage, (robotArray[i].direction*(char_src_size*4) + robotArray[i].robot_frameIndex*char_src_size), 0, char_src_size, char_src_size, robotArray[i].x, robotArray[i].y, char_size, char_size);
			}
		}
		
	}
};		
 

gameOver = function(){
	
	
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
	backgroundMusic3.pause();
	ctx.drawImage(youWinScreen,0,0);
   	if(32 in keysDown){
		restart_game();
	}
};

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
	
	update(delta / 1000);
	render();
	then = now;	
};

var item_removal = function(delta_var){
	if(hero.own_speedyItem == true){
		if(speedyItem.timer <= 0){
			hero.own_speedyItem = false;
			speedyItem.timer = speedyItem.start_timer;
			hero.speed = 256;
			frame_change_rate = 35;
		}else{
			speedyItem.timer = speedyItem.timer - delta_var;
		}
		
	
	}
	//hero's gun image change
	if(rock.active && hero.electric_gun_timer > 0){
		hero.electric_gun_timer -= delta_var;
	}else{
		heroImage.src = "images/hero_sheet.png"
		hero.electric_gun_timer = 500;
	}
	
	//unlike speedy item this one governs duration of robot electricution
	//hero's tazer item is already removed from hero when collision occured
	for(var i = 0; i < robotArray.length ; i++){
	
		if(robotArray[i].electricuted == true){
			
			if(robotArray[i].electricuted_timer <=0){
				//hero.own_item = false;
				robotArray[i].electricuted_timer = item.timer;
				robotArray[i].electricuted = false;
				if(robotArray[i].boss){
					robotArray[i].robotImage.src = "images/robots_boss.png";
				}
				else{
					robotArray[i].robotImage.src = "images/robots_lights.png";
				}
			}else{
				robotArray[i].electricuted_timer = robotArray[i].electricuted_timer - delta_var;		
			}
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
		
		if(bgm_ready_fun && robot_ready_fun(robotArray) && hero_ready_fun()){
			if(introScreens[0] == true && introTimeOut < 0){
				//this is very first screen with game title written on it.
				introScreens[0] = false;
				introScreens[1] = true;
				introTimeOut = 250;
				
			}else if(introScreens[1] == true && introTimeOut < 0){
				// level 1 intro screen data update
				introScreens[1] = false; 
				currentLevel[0] = true;
				insideIntroScreen = false;
				
			}else if(introScreens[2] == true){
				currentLevel[0] = false;
				// level 2 intro screen data update
				
				introScreens[2] = false;
				currentLevel[1] = true;
				insideIntroScreen = false;
				currentTileMap = 16;
				//update hero location for tile 16.
				robotReloadDistributor(robotArray);
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
	/* I think these parts should be moved to collision detection and it will reduce 
	   delay before moving on to intro screens. Also appropriate to be in collision detection
	   due to the function definition.
	*/
	// hero reached end of level 1
	 if(getTileNum(heroCurrentTile) == 26) // got rid of an else to make this work, kinda hacky
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
	// hero reached end of level 3
 	else if(getTileNum(heroCurrentTile) == 66){
		for(var i = 0; i < introScreens.length; i++){
			introScreens[i] = false;
		}
		introScreens[4] = true;
		insideIntroScreen = true;
	}
};
var then = Date.now();

create_robots(robotArray);
var simulator = setInterval(main,1);