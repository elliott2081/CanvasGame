var chaseMode = function(modifier){
	var hr_hor = hero.x - robot.x;
	var hr_ver = hero.y - robot.y;

	var moveHorizontally = false;
	var moveVertically = false;

	var rightOrLeft = "";
	var upOrDown = "";

	if(Math.abs(hr_hor) > Math.abs(hr_ver)){
		moveHorizontally = true;
	}
	else{
		moveVertically = true;
	}

	if(hero.x > robot.x){
		rightOrLeft = "right";
	}
	else{
		rightOrLeft = "left";
	}


	if(hero.y > robot.y){
		upOrDown = "down";
	}
	else{
		upOrDown = "up";
	}

	if(moveHorizontally){
		// RIGHT
		if(rightOrLeft == "right" && check_right_is_legal(robot, modifier)){
			move(robot, modifier, "right");
		}
		else if(upOrDown == "up"  && check_above_is_legal(robot, modifier)){
			move(robot, modifier, "up");
		}
		else if(upOrDown == "down" && check_below_is_legal(robot, modifier)){
			move(robot, modifier, "down");
		}
		else{
			if(check_left_is_legal(robot, modifier)){
				move(robot, modifier, "left");
			}
		}
	}
		// LEFT
	else{
		if(check_left_is_legal(robot, modifier)){
			move(robot, modifier, "left");
		}
		else if(upOrDown == "up" && check_above_is_legal(robot, modifier)){
			move(robot, modifier, "up");
		}
		else if(upOrDown == "down" && check_below_is_legal(robot, modifier)){
			move(robot, modifier, "down");
		}
		else{
			move(robot, modifier, "right");
		}
	}	
	
	if(moveVertically){
		// DOWN
		if(upOrDown == "down" && check_below_is_legal(robot, modifier)){
			move(robot, modifier, "down");
		}
		else if(rightOrLeft == "right" && check_right_is_legal(robot, modifier)){
			move(robot, modifier, "right");
		}
		else if(rightOrLeft == "left" && check_left_is_legal(robot, modifier)){
			move(robot, modifier, "left");
		}
		else{
			move(robot, modifier, "right");
		}
	}
		// UP
	else{
		if(check_above_is_legal(robot, modifier)){
			move(robot, modifier, "up");
		}
		else if(rightOrLeft == "right" && check_right_is_legal(robot, modifier)){
			move(robot, modifier, "right");
		}
		else if(rightOrLeft == "left" && check_left_is_legal(robot, modifier)){
			move(robot, modifier, "left");
		}
		else{
			move(robot, modifier, "down");
		}
	}		
};
		





	
