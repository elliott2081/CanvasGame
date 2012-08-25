
/* robot notes
create an array of robots




*/
//robot
var robotReady = false;
var robotImage = new Image();
robotImage.onload = function(){
		robotReady = true;
};
robotImage.src = "images/robots.png";

var robot_frameIndex = 0;
var robot_randomly_moved = 1;
var patrol_distance = 572;
var chase_consistency = 0;

var robot = {
		speed: 228,
		x: 900,
		y: 430,
		//1 = down, 2 = left , 3 = up, 0 = right 
		direction: 3,
		name: "robot",
		robot_number: 0,
		ease: 5,
		//if hero get in range chase change to true, false otherwise
		chase: false,
		char_moved: 1
		};

var robot_movement_helper = function(modifier){
	
	////// hero in bound //////
	var x_diff_sq = Math.pow((robot.x - hero.x),2);
	var y_diff_sq = Math.pow((robot.y - hero.y),2);
	var distance = Math.sqrt(x_diff_sq + y_diff_sq);
	if(distance < patrol_distance){
		robot.chase = true;
	}else{ 
		robot.chase = false;
		chase_consistency = 10;
	}
	
	//if case 1 chase hero
	if(robot.chase == true){
		if(chase_consistency >= 10){
			chaseMode(modifier);
			chase_consistency = 0;
		}else{
			if(robot.direction == 1 && check_below_is_legal(robot, modifier))
				move(robot, modifier, "down");
			else if(robot.direction == 2 && check_left_is_legal(robot, modifier))
				move(robot, modifier, "left");
			else if(robot.direction == 3 && check_above_is_legal(robot, modifier))
				move(robot, modifier, "up");
			else if(robot.direction == 0 && check_right_is_legal(robot, modifier))
				move(robot, modifier, "right");
			else{
				chase_consistency =0;
				chaseMode(modifier);

			
			
				
			}
			chase_consistency += 1;
			
		}
	}
	else{
		//var robotMovement = robot.speed*modifier;
		if(robot.direction == 3){// robot facing up	
			if(check_above_is_legal(robot, modifier)){
				move(robot, modifier, "up");
			}else if(check_left_is_legal(robot, modifier)){
				move(robot, modifier, "left");
			}else if(check_right_is_legal(robot,modifier)){
				move(robot, modifier, "right");
			}
		}
		else if(robot.direction == 1){//robot facing down
			if(check_below_is_legal(robot, modifier)){
				move(robot, modifier, "down");
			}else if(check_left_is_legal(robot, modifier)){
				move(robot, modifier, "left");
			}else if(check_right_is_legal(robot,modifier)){
				move(robot, modifier, "right");
			}
		}else if(robot.direction == 2){//robot facing left
			if(check_left_is_legal(robot, modifier)){
				move(robot, modifier, "left");
			}else if(check_above_is_legal(robot, modifier)){
				move(robot, modifier, "up");
			}else if(check_below_is_legal(robot, modifier)){
				move(robot, modifier, "down");
			}
		}else if(robot.direction == 0){//robot facing left
			if(check_right_is_legal(robot,modifier)){
				move(robot, modifier, "right");
			}else if(check_above_is_legal(robot, modifier)){
				move(robot, modifier, "up");
			}else if(check_below_is_legal(robot, modifier)){
				move(robot, modifier, "down");
			}
		}
	}

	/*
	//for robot's random movement
	//for every 1 sec when hero does not move, robot will move
	if(robot_randomly_moved == 100){
	robot_randomly_moved = 1;

		//between 3~4 : up
		//between 2~3 : down
		//between 1~2 : left
		//between 0~1 : right
		var robot_random_direction = Math.random() * 4;
		if(robot_random_direction >= 3){
			robot.y -=robot.speed*modifier;
			robot_moved+=1;
			animation(3, 2);
		}else if(robot_random_direction >= 2){
			robot.y += robot.speed * modifier;
			robot_moved += 1;
			animation(1, 2);
		}else if(robot_random_direction >= 1){
			robot.x -= robot.speed * modifier;
			robot_moved += 1;
			animation(2, 2);
		}else{
			robot.x += robot.speed * modifier;
			robot_moved += 1;
			animation(0, 2);
		
		}
	}		

		robot_randomly_moved ++;
*/
};


var robotReload = function(){
	if(currentTileMap == 0){
		robot.x = 900;
		robot.y = 400;
	}
	else if(currentTileMap == 1){
		robot.x = 900;
		robot.y = 400;
	}else if(currentTileMap == 2){
		robot.x = 600;
		robot.y = 400;
	}else if(currentTileMap == 3){
		robot.x = 300;
		robot.y = 200;
	}else if(currentTileMap == 4){
		robot.x = 1000;
		robot.y = 500;
	}else if(currentTileMap == 5){
		robot.x = 900;
		robot.y = 400;
	}else if(currentTileMap == 6){
		robot.x = 900;
		robot.y = 400;
	}else if(currentTileMap == 7){
		robot.x = 900;
		robot.y = 400;
	}else if(currentTileMap == 8){
		robot.x = 900;
		robot.y = 400;
	}else if(currentTileMap == 9){
		robot.x = 900;
		robot.y = 400;
	}else if(currentTileMap == 10){
		robot.x = 900;
		robot.y = 400;
	}else if(currentTileMap == 11){
		robot.x = 900;
		robot.y = 400;
	}else if(currentTileMap == 12){
		robot.x = 900;
		robot.y = 400;
	}else if(currentTileMap == 13){
		robot.x = 900;
		robot.y = 400;
	}else if(currentTileMap == 14){
		robot.x = 900;
		robot.y = 400;
	}else if(currentTileMap == 15){
		robot.x = 900;
		robot.y = 400;
	}
};
	
	