
var rockImage = new Image();
rockImage.src = "images/projectile.png";

var gunImage = new Image();
gunImage.src = "images/gun.png";

var gunOnTheGround = {
	x: 0,
	y: 0,
	availability: false
}


var rock  = {
	x : 0,
	y : 0,
	speed : 500,
	direction : 0,
	active : false //true means rock is thrown and it is on air
	
}

var throwRocks = function(){
	rock.active = true;
	rock.direction = hero.direction;
	rock.x = hero.x;
	rock.y = hero.y;
}

var rockMovement = function(modifier,passed_robots){
	
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
	var i = 0;
	while((rock.active == true) && (i < passed_robots.length)){
		rock_robot_collision_detection(passed_robots[i]);
		i++;
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
var rock_robot_collision_detection = function(a_robot){
	if(
		rock.x <= (a_robot.x + char_size - collisionEase)
		&& a_robot.x <= (rock.x + char_size - collisionEase)
		&& rock.y <= (a_robot.y + char_size - collisionEase)
		&& a_robot.y <= (rock.y + char_size - collisionEase)
		&& a_robot.live == true
		
	){
		a_robot.live = false; // this allow robot to disappear. if we want to just change picture to dead robot then this variable in robot need some adjustment
		rock.active = false;
		//robotImage.src = "images/deadRobot.png";
	}
}