//////////////////////////////////
//   GLOBAL VARIABLES FOR TILES AND MOVING AROUND THE SCREEN WITH TILES
//////////////////////////////////

//World Map
//collision ease is the amount of pixels inward of the characthers box when captured
var collisionEase = 30;
var currentTileMap = 0;
var tileMapArrayDimension = 4; // height and width of theorhetical 2 dimensional tileMapArray
var tileMapArray = [tileMap0, tileMap1, tileMap2, tileMap3, tileMap4, tileMap5, tileMap6 ,tileMap7, tileMap8 ,tileMap9, tileMap10, tileMap11, tileMap12, tileMap13, tileMap14, tileMap15]; // represented as a 1 dimensional array but thought of as 2

//Load tile sheet
var tileSheet = new Image();
var bgReady = false;
tileSheet.onload = function(){
	bgReady = true;
};
tileSheet.src = "images/mapFiles/tileSheet2.png";
var mapIndexOffset = -1;
var mapRows = 9;
var mapCols = 16;
var tile_size = 64;
var tile_src_size = 32;

//ranges for what tiles the hero and robot can move on
var end_walkable = 3;
var end_robot_walkable = 6;
var end_non_walkable = 13;

////////////////////////////////////////////////
//FUNCTIONS FOR CALCULATING TILE POSITION AND MOVEMENT
///////////////////////////////////////////////



var check_above_is_legal = function(character, modifier){
	var character_movement = character.speed * modifier;
	var lower_bound = 0;
	var upper_bound = 0;
	if(character.name == "robot"){//for robot
		if(character.chase == true){//if robot is in chase mode
			lower_bound = 0;
			upper_bound = end_robot_walkable;
		}else{//if robot is in patrol mode
			lower_bound = end_walkable + 1;
			upper_bound = end_robot_walkable;
		}
	}else{ // for hero
		lower_bound = 0;
		upper_bound = end_robot_walkable;
	}
		
	
	var ColandRow1 = onTile((character.x+character.ease), (character.y-character_movement+character.ease));
	var ColandRow2 = onTile((character.x+char_size-character.ease), (character.y-character_movement+character.ease));
	if((getTileNum(ColandRow1) >= lower_bound) 
		&& (getTileNum(ColandRow1) <= upper_bound)
		&& (getTileNum(ColandRow2) >= lower_bound)
		&& (getTileNum(ColandRow2) <= upper_bound)
		)
		return true;
	else 
		return false;
};
var check_below_is_legal = function(character, modifier){
	var lower_bound = 0 ;
	var upper_bound = 0;
	if(character.name == "robot"){//for robot
		if(character.chase == true){//if robot is in chase mode
			lower_bound = 0;
			upper_bound = end_robot_walkable;
		}else{//if robot is in patrol mode
			lower_bound = end_walkable +1;
			upper_bound = end_robot_walkable;
		}
	}else{ // for hero
		lower_bound = 0;
		upper_bound = end_robot_walkable;
	}
		
	var character_movement = character.speed * modifier;
	
	var ColandRow3 = onTile((character.x + character.ease), (character.y + char_size + character_movement - character.ease));
	var ColandRow4 = onTile((character.x + char_size - character.ease), (character.y + char_size + character_movement - character.ease));
	if((getTileNum(ColandRow3) >= lower_bound)
		&& (getTileNum(ColandRow3) <= upper_bound)
		&& (getTileNum(ColandRow4) >= lower_bound)
		&& (getTileNum(ColandRow4) <= upper_bound))
		return true;
	else 
		return false;
};
var check_left_is_legal = function(character, modifier){
	var character_movement = character.speed * modifier;

	var lower_bound = 0;
	var upper_bound = 0;
	if(character.name == "robot"){//for robot
		if(character.chase == true){//if robot is in chase mode
			lower_bound = 0;
			upper_bound = end_robot_walkable;
		}else{//if robot is in patrol mode
			lower_bound = end_walkable +1;
			upper_bound = end_robot_walkable;
		}
	}else{ // for hero
		lower_bound = 0;
		upper_bound = end_robot_walkable;
	}
	
	var ColandRow1 = onTile((character.x - character_movement + character.ease), (character.y + character.ease));
	var ColandRow3 = onTile((character.x - character_movement + character.ease), (character.y + char_size - character.ease));
	if((getTileNum(ColandRow1) >= lower_bound)
		&& (getTileNum(ColandRow1) <= upper_bound)
		&& (getTileNum(ColandRow3) >= lower_bound)
		&& (getTileNum(ColandRow3) <= upper_bound))
		return true;
	else
		return false;

};

var check_right_is_legal = function(character, modifier){
	var character_movement = character.speed * modifier;

	var lower_bound =0;
	var upper_bound =0;
	if(character.name == "robot"){//for robot
		if(character.chase == true){//if robot is in chase mode
			lower_bound = 0;
			upper_bound = end_robot_walkable;
		}else{//if robot is in patrol mode
			lower_bound = end_walkable +1;
			upper_bound = end_robot_walkable;
		}
	}else{ // for hero
		lower_bound = 0;
		upper_bound = end_robot_walkable;
	}
	
		var ColandRow2 = onTile((character.x + char_size + character_movement - character.ease), (character.y + character.ease));
		var ColandRow4 = onTile((character.x + char_size + character_movement - character.ease), (character.y + char_size - character.ease));
		
		//console.log(ColandRow4.row);
		//console.log(ColandRow4.col);
		//console.log(ColandRow4);
		if((getTileNum(ColandRow2) >= lower_bound)
			&& (getTileNum(ColandRow2) <= upper_bound)
			&& (getTileNum(ColandRow4) >= lower_bound)
			&& (getTileNum(ColandRow4) <= upper_bound))
			return true;
		else
			return false;
};


var getTileNum = function(RowandCol){

	if((RowandCol.row < 0)
		|| (RowandCol.row >= 9)
		|| (RowandCol.col < 0)
		|| (RowandCol.col >= 16)){
		return -1; //simple border detection to avoid index out of bound problem
	}else{
		return tileMapArray[currentTileMap][RowandCol.row][RowandCol.col];
	}
};

var onTile = function(charX, charY){
	var currentColumn = Math.floor(charX / tile_size);
	var currentRow = Math.floor(charY /tile_size);
	//cCol_cRow is current column and current row of char
	var cCol_cRow = { col: currentColumn, 
					 row: currentRow };
	return cCol_cRow;
	};

var collisionDetection = function(){
		if(
			hero.x <= (robot.x + char_size - collisionEase)
			&& robot.x <= (hero.x + char_size - collisionEase)
			&& hero.y <= (robot.y + char_size - collisionEase)
			&& robot.y <= (hero.y + char_size - collisionEase)
		){
		
			isGameOver = true;
		}
	var old_hero_y = hero.y;
	var old_hero_x = hero.x;
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
	
	if(robot.y < 0)
		robot.y = 0;
	if(robot.y > (canvas.height-char_size)) // 480 - 64
		robot.y = canvas.height-char_size;
	if(robot.x < 0)
		robot.x = 0;
	if(robot.x > (canvas.width-char_size)) //512 -64
		robot.x = canvas.width-char_size;
};

var move = function(character, modifier, direction){
	if(direction == "up"){ //move up
		character.y -= character.speed * modifier;
		character.char_moved += 1;
		animation(3,character);
	}else if(direction == "down"){//move down
		character.y += character.speed * modifier;
		character.char_moved += 1;
		animation(1, character);
	}else if(direction == "left"){//move left
		character.x -= character.speed * modifier;
		character.char_moved += 1;
		animation(2, character);
	}else if(direction == "right"){//move right
		character.x += character.speed * modifier;
		character.char_moved += 1;
		animation(0, character);
	}
};
