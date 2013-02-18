//var heroRocks = [];
//var heroReady = false;
var rockImage = new Image();
//heroImage.onload = function(){
//		heroReady = true;
//};
//heroImage.src = "images/arrows.png";

rockImage.src = "images/rock.png";



var rock  = {
	x : 0,
	y : 0,
	speed : 500,
	direction : 0,
	active : false
}

var throwRocks = function(direction){
	rock.active = true;
	rock.direction = hero.direction;
	rock.x = hero.x + 32;
	rock.y = hero.y + 32;
	
		
		
}

var rockMovement = function(modifier){
	
	//collision detection between rock and illegal tiles
	if(rock.y < 0){ //top of the screen
		rock.active = false;
	}
	else if(rock.y > (canvas.height-char_size)){//bottom of the screen // 480 - 64
		rock.active = false;
	}
	else if(rock.x < 0){ //left side of screen
		rock.active = false;
	}
	else if(rock.x > (canvas.width-char_size)){ //right side of screen //512 -64
		rock.active = false;
	}
	/* this for somereason didn't work (illegal tile check is keep on failing)
	if((rock.y < 0) && ( (currentTileMap-tileMapArrayDimension) < 0)){ //top of the screen
		rock.active = false;
		console.log("is it going throu?");
	}
	else if( (rock.y > (canvas.height-char_size)) && ( (currentTileMap+tileMapArrayDimension) >= tileMapArray.length) ){//bottom of the screen // 480 - 64
		rock.active = false;
		console.log("is it going throu?");
	}
	else if(rock.x < 0 && ( (currentTileMap % tileMapArrayDimension) == 0)){ //left side of screen
		rock.active = false;
		console.log("is it going throu?");
	}
	else if( (rock.x > (canvas.width-char_size)) && (((currentTileMap+1) % tileMapArrayDimension) == 0)){ //right side of screen //512 -64
		rock.active = false;
		console.log("is it going throu?");
	}
	*/
	
	// collision detection between robot and rock 
	if(
		rock.x <= (robot.x + char_size - collisionEase)
		&& robot.x <= (rock.x + char_size - collisionEase)
		&& rock.y <= (robot.y + char_size - collisionEase)
		&& robot.y <= (rock.y + char_size - collisionEase)
		&& robot.live == true
		
	){
		robot.live = false; // this allow robot to disappear. if we want to just change picture to dead robot then this variable in robot need some adjustment
		rock.active = false;
		//robotImage.src = "images/deadRobot.png";
		//robot.x = -600;
		//robot.y = -600;
	}
	// up = 3 , down = 1, left = 2, right = 0
	if(rock.direction == 3){
		rock.y -= rock.speed * modifier;
	}
	else if(rock.direction == 1){
		rock.y += rock.speed * modifier;
	}
	else if(rock.direction == 2){
		rock.x -= rock.speed * modifier;
	}
	else if(rock.direction == 0){
		rock.x += rock.speed * modifier;
	}
}