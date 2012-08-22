//////////////////////////////////
//   GLOBAL VARIABLES FOR TILES AND MOVING AROUND THE SCREEN WITH TILES
//////////////////////////////////

//World Map
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


//if ease == 0 then it is robot
//else if ease == other than 0 then it is hero.
var check_above_is_legal = function(character, modifier, ease){
	var character_movement = character.speed * modifier;
	var lower_bound = 0;
	var upper_bound = 0;
	if(ease == 0){//for robot
	ease = 1;
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
		
	
	var ColandRow1 = onTile((character.x+ease), (character.y-character_movement+ease));
	var ColandRow2 = onTile((character.x+char_size-ease), (character.y-character_movement+ease));
	if((getTileNum(ColandRow1) >= lower_bound) 
		&& (getTileNum(ColandRow1) <= upper_bound)
		&& (getTileNum(ColandRow2) >= lower_bound)
		&& (getTileNum(ColandRow2) <= upper_bound)
		)
		return true;
	else 
		return false;
};
var check_below_is_legal = function(character, modifier, ease){
	var lower_bound = 0 ;
	var upper_bound = 0;
	if(ease == 0){//for robot
	ease = 1;
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
	
	var ColandRow3 = onTile((character.x + ease), (character.y + char_size + character_movement - ease));
	var ColandRow4 = onTile((character.x + char_size - ease), (character.y + char_size + character_movement - ease));
	if((getTileNum(ColandRow3) >= lower_bound)
		&& (getTileNum(ColandRow3) <= upper_bound)
		&& (getTileNum(ColandRow4) >= lower_bound)
		&& (getTileNum(ColandRow4) <= upper_bound))
		return true;
	else 
		return false;
};
var check_left_is_legal = function(character, modifier, ease){
	var character_movement = character.speed * modifier;

	var lower_bound = 0;
	var upper_bound = 0;
	if(ease == 0){//for robot
	ease = 1;
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
	
	var ColandRow1 = onTile((character.x - character_movement + ease), (character.y + ease));
	var ColandRow3 = onTile((character.x - character_movement + ease), (character.y + char_size - ease));
	if((getTileNum(ColandRow1) >= lower_bound)
		&& (getTileNum(ColandRow1) <= upper_bound)
		&& (getTileNum(ColandRow3) >= lower_bound)
		&& (getTileNum(ColandRow3) <= upper_bound))
		return true;
	else
		return false;

};

var check_right_is_legal = function(character, modifier, ease){
	var character_movement = character.speed * modifier;

	var lower_bound =0;
	var upper_bound =0;
	if(ease == 0){//for robot
	ease = 1;
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
		
	var ColandRow2 = onTile((character.x + char_size + character_movement - ease), (character.y + ease));
	var ColandRow4 = onTile((character.x + char_size + character_movement - ease), (character.y + char_size - ease));
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
	//console.log(tileMapArray[currentTileMap][RowandCol.row][RowandCol.col]);
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
