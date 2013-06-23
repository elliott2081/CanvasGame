
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
	speed : 2000,
	direction : 0,
	ease: 17,
	active : false //true means rock is thrown and it is on air
	
	
}

var throwRocks = function(){
	rock.active = true;
	rock.direction = hero.direction;
	rock.x = hero.x;
	rock.y = hero.y;
	var snd = new Audio("sounds/lazer.wav"); // buffers automatically when created
	snd.play();
	}

var rockMovement = function(modifier,passed_robots,introScreens){
	
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
	var ColandRow1 = onTile((rock.x + 33), (rock.y+33) );
	var ColandRow2 = onTile((rock.x +33), (rock.y +33));
	var ColandRow3 = onTile((rock.x +33) , (rock.y+33));
	var ColandRow4 = onTile((rock.x +33), (rock.y+33));
	
	if(getTileNum(ColandRow1) > end_robot_walkable){ 
		rock.active = false;
		//console.log("inside ColandRow1 and CR1.col = " + ColandRow1.col + " and CR1.row = " + ColandRow1.row);
	}
	else if(getTileNum(ColandRow2) > end_robot_walkable){ 
		rock.active = false;
		//console.log("inside ColandRow2 and CR2.col = " + ColandRow2.col + " and CR2.row = " + ColandRow2.row);
	}
	else if(getTileNum(ColandRow3) > end_robot_walkable){ 
		rock.active = false;
		//console.log("inside ColandRow3 and CR3.col = " + ColandRow3.col + " and CR3.row = " + ColandRow3.row);
	}
	else if(getTileNum(ColandRow4) > end_robot_walkable){ 
		rock.active = false;
		//console.log("inside ColandRow4 and CR4.col = " + ColandRow4.col + " and CR4.row = " + ColandRow4.row);
	}
	
	
	// collision detection between robot and rock 
	var i = 0;
	while((rock.active == true) && (i < passed_robots.length)){
		rock_robot_collision_detection(passed_robots[i], introScreens);
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
	
	////
	//
	//  ROBOT BOSS
	//
	////
	
	if(a_robot.boss == true &&
		rock.x <= (a_robot.x + char_size - collisionEase)
		&& a_robot.x <= (rock.x + char_size - collisionEase)
		&& rock.y <= (a_robot.y + char_size - collisionEase)
		&& a_robot.y <= (rock.y + char_size - collisionEase)
		&& a_robot.live == true
		
	){
		//console.log('inside robot boss if statement');
		if(a_robot.shot == 0){
			a_robot.live = false; // this allow robot to disappear. if we want to just change picture dead robot then this variable in robot need some adjustment
			rock.active = false;
			introScreens[4] = true;
			
		}
		else{
			rock.active = false;
			a_robot.shot -= 1;
			if(a_robot.shot <= 170){
				ctx.font = "bold 12px sans-serif";
				ctx.fillText("x", 248, 43);
				ctx.fillText("y", 58, 165);
				a_robot.speed = 260;
			}
		}
	}
	
	////
	//
	//   REG ROBOT
	//
	////
	
	
	else if(
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