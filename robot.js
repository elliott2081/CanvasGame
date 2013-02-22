
/* robot notes
create an array of robots




*/
//robot graphic values
var robotReady = false;
var robotImage = new Image();
robotImage.onload = function(){
		robotReady = true;
};
robotImage.src = "images/robots.png"; // original robot

function robot(){
	var speed = 228;
	var speed = 228;
	var x = 900;
	var y = 430;
	//1 = down, 2 = left , 3 = up, 0 = right 
	var direction = 3;
	var name = "robot";
	var robot_number = 0;
	var ease = 5;
	//if hero get in range chase change to true, false otherwise
	var chase = false;
	var char_moved = 1;
	var electricuted = false;
	var live = true;
	
	//other robot operating values 
	//(top 2 values; might not need)
	var robot_frameIndex = 0; // this also need to be check for necessity
	//var robot_randomly_moved = 1; // need to check if this var is being used
	var patrol_distance = 576;
	var chase_consistency = 0;
	
	//tazer related robot variables(might not need)
	var electricution_delay = 0;
	var electricuted_robot_direction = 0;
}
var robot_ready_fun = function(){
	return robotReady;
}

/*
//robot operating values
var robot_frameIndex = 0;
var robot_randomly_moved = 1;
var patrol_distance = 576;
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
		char_moved: 1,
		electricuted: false,
		live: true
		};

var electricution_delay = 0;
var electricuted_robot_direction = 0;
*/


var robot_movement_helper = function(modifier){
	
	////// hero in bound //////
	var x_diff_sq = Math.pow((robot.x - hero.x),2);
	var y_diff_sq = Math.pow((robot.y - hero.y),2);
	var distance = Math.sqrt(x_diff_sq + y_diff_sq);
	if(distance < robot.patrol_distance){
		robot.chase = true;
	}else{ 
		robot.chase = false;
		robot.chase_consistency = 10;
	}
	
	
	
	if(robot.electricuted == true){
		//call move with modifier = 0 thus robot will not move as long as it is electricuted
		if (electricuted_robot_direction >= 3){
			electricuted_robot_direction = 0;
		}else{
			if(electricuted_robot_direction == 0){
				move(robot, 0, "right");
			}else if (electricuted_robot_direction == 1){
				move(robot, 0, "down");
			}else if (electricuted_robot_direction == 2){
				move(robot, 0, "left");
			}else{
				move(robot, 0, "up");
			}
			electricuted_robot_direction ++;
			
			
		}
		/*
		if(electricution_delay >= 70){
			hero.own_item = false;
			robot.electricuted = false;
			robotImage.src = "images/robots.png";
		}else{
			//call move with modifier = 0 thus robot will not move as long as it is electricuted
			if (electricuted_robot_direction >= 3){
				electricuted_robot_direction = 0;
			}else{
				if(electricuted_robot_direction == 0){
					move(robot, 0, "right");
				}else if (electricuted_robot_direction == 1){
					move(robot, 0, "down");
				}else if (electricuted_robot_direction == 2){
					move(robot, 0, "left");
				}else{
					move(robot, 0, "up");
				}
				electricuted_robot_direction ++;
				
				
			}
			electricution_delay ++;
		}
		//do nothing. Maybe adjust variable so it can have electric sparks around it.
		*/
	}
	else if(robot.chase == true){
		//reflex agent to chase hero
		if(robot.chase_consistency >= 10){
			//this part is to make sure robot move to certain direction for sometime before it change its mind
			chaseMode(modifier);
			robot.chase_consistency = 0;
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
				robot.chase_consistency =0;
				chaseMode(modifier);

			
			
				
			}
			robot.chase_consistency += 1;
			
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

//called in tileMovement and it will renew robot location if it is moved to another tile.
var robotReload = function(){
	item.timer = 3000;
	if(currentTileMap == 0){
		robot.live = true;
		robot.x = 900;
		robot.y = 400;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
		
	}
	else if(currentTileMap == 1){
		robot.live = true;
		robot.x = 800;
		robot.y = 400;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 2){
		robot.live = true;
		robot.x = 600;
		robot.y = 400;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 3){
		robot.live = true;
		robot.x = 300;
		robot.y = 200;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 4){
		robot.live = true;
		if(hero.direction == 1){
			hero.x = 320;
			hero.y = 320;
		}
		robot.x = 900;
		robot.y = 446;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = true;
		item.x = 896;
		item.y = 64;
		speedyItem.availability = false;
	}else if(currentTileMap == 5){
		robot.live = true;
		robot.x = 64;
		robot.y = 64;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 6){
		robot.live = true;
		robot.x = 900;
		robot.y = 128;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 7){
		robot.live = true;
		robot.x = 900;
		robot.y = 400;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 8){
		robot.live = true;
		robot.x = 128;
		robot.y = 512-64;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = true;
		item.x = 600;
		item.y = 300;
		speedyItem.availability = true;
	}else if(currentTileMap == 9){
		robot.live = true;
		robot.x = 10*64;
		robot.y = 3*64;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 10){
		robot.live = true;
		robot.x = 128;
		robot.y = 400;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 11){
		robot.live = true;
		robot.x = 900;
		robot.y = 400;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 12){
		robot.live = true;
		robot.x = 900;
		robot.y = 375;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 13){
		robot.live = true;
		robot.x = 900;
		robot.y = 128;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 14){
		robot.live = true;
		robot.x = 675;
		robot.y = 300;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		//backgroundMusic.setAttribute('src', 'sounds/wings.mp3');
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 15){
		robot.live = true;
		robot.x = 900;
		robot.y = 400;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		//backgroundMusic.setAttribute('src', 'sounds/wings.mp3');
		item.availability = false;
		speedyItem.availability = false;
	}else if(currentTileMap == 16){
		robot.live = true;
		robot.x = 900;
		robot.y = 400;
		robot.electricuted = false;
		robotImage.src = "images/robots.png";
		//backgroundMusic.setAttribute('src', 'sounds/wings.mp3');
		item.availability = false;
		speedyItem.availability = false;
	}
};
	
	