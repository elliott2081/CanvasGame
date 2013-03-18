var chaseMode = function(modifier, currentRobot){
	var hr_hor = hero.x - currentRobot.x;
	var hr_ver = hero.y - currentRobot.y;

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

	if(hero.x > currentRobot.x){
		rightOrLeft = "right";
	}
	else{
		rightOrLeft = "left";
	}


	if(hero.y > currentRobot.y){
		upOrDown = "down";
	}
	else{
		upOrDown = "up";
	}

	if(moveHorizontally){
		// RIGHT
		if(rightOrLeft == "right"){
			if(check_right_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "right");
			}
			else if(upOrDown == "up"){
				if(check_above_is_legal(currentRobot, modifier)){
					move(currentRobot, modifier, "up");
				}
			}
			else if(upOrDown == "down"){
				if(check_below_is_legal(currentRobot, modifier)){
					move(currentRobot, modifier, "down");
				}
			}
			else{
				if(check_left_is_legal(currentRobot, modifier)){
					move(currentRobot, modifier, "left");
				}
			}
		}
		// LEFT
		else{
			if(check_left_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "left");
			}
			else if(upOrDown == "up"){
				if(check_above_is_legal(currentRobot, modifier)){
					move(currentRobot, modifier, "up");
				}
			}
			else if(upOrDown == "down"){
				if(check_below_is_legal(currentRobot, modifier)){
					move(currentRobot, modifier, "down");
				}
			}
			else{

				move(currentRobot, modifier, "right");
			}
		}	
	}
	else{
		// DOWN
		if(upOrDown == "down"){
			if(check_below_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "down");
			}
			else if(rightOrLeft == "right"){
				if(check_right_is_legal(currentRobot, modifier)){
					move(currentRobot, modifier, "right");
				}
			}
			else if(rightOrLeft == "left"){
				if(check_left_is_legal(currentRobot, modifier)){
					move(currentRobot, modifier, "left");
				}
			}
			else{
				move(currentRobot, modifier, "right");
			}
		}
		// UP
		else{
			if(check_above_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "up");
			}
			else if(rightOrLeft == "right"){
				if(check_right_is_legal(currentRobot, modifier)){
					move(currentRobot, modifier, "right");
				}
			}
			else if(rightOrLeft == "left"){
				if(check_left_is_legal(currentRobot, modifier)){
					move(currentRobot, modifier, "left");
				}
			}
			else{
				move(currentRobot, modifier, "down");
			}
		}
	}	
};
		





	
