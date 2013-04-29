
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
	speed : 550,
	direction : 0,
	ease: 17,
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
	
	/*collision detection between none walkable walls
		I used same concept as legal check.  object's four corners were represented as 
		1  2 
		3  4
		get tile num and check if they are above 100(end_robot_walkable)
	*/
	var ColandRow1 = onTile((rock.x + rock.ease), (rock.y + rock.ease) );
	var ColandRow2 = onTile((rock.x+char_size-rock.ease), (rock.y +rock.ease));
	var ColandRow3 = onTile((rock.x + rock.ease) , (rock.y + char_size - rock.ease));
	var ColandRow4 = onTile((rock.x + char_size -rock.ease), (rock.y + char_size - rock.ease));
	
	if(getTileNum(ColandRow1) > end_robot_walkable){ rock.active = false;}
	else if(getTileNum(ColandRow2) > end_robot_walkable){ rock.active = false;}
	else if(getTileNum(ColandRow3) > end_robot_walkable){ rock.active = false;}
	else if(getTileNum(ColandRow4) > end_robot_walkable){ rock.active = false;}
	
	
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