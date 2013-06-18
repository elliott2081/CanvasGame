

//create an array of robots
var robotArray = new Array();
/*
var robot = {

//this -> public
//var -> private
	//image
	robotImage : new Image(),
	robotReady : false,
	speed : 228,
	x : 900,
	y : 430,
	//1 = d, 2 = left , 3 = up, 0 = right 
	direction : 3,
	name : "robot",
	robot_number : 0,
	ease : 5,
	//if hero get in range chase change to true, false otherwise
	chase : false,
	char_moved : 1,
	//essential to active robot (used in game.js and collision detection)
	live : true,
	
	//other robot operating values 
	robot_frameIndex : 0, 
	robot_randomly_moved : 1,
	patrol_distance : 576,
	chase_consistency : 0,
	
	//tazer related robot variables
	electricution_delay : 0,
	electricuted_robot_direction : 0,
	electricuted : false,	
	electricuted_timer : 3000
}*/
var robot_ready_fun = function(passed_robot_array){
	var return_val = false;
	for(var i = 0; i < passed_robot_array.length; i ++){
		if(i == 0){
			return_val = passed_robot_array[i].robotReady;
		}else{
			return_val = (passed_robot_array[i].robotReady && return_val);			
		}
	}
	return return_val;
}

var create_robots = function(passed_robot_array){
	for (var j =0; j < 2; j ++){
		passed_robot_array[j] = Object.create({

			//this -> public
			//var -> private
			//image
			robotImage : new Image(),
			robotReady : false,
			speed : 228,
			x : 900,
			y : 430,
			//1 = down, 2 = left , 3 = up, 0 = right 
			direction : 3,
			name : "robot",
			robot_number : 0,
			ease : 30, // previously 5
			//if hero get in range chase change to true, false otherwise
			chase : false,
			char_moved : 1,
			//essential to active robot (used in game.js and collision detection)
			live : true,
			boss : false,
			//other robot operating values 
			robot_frameIndex : 0, 
			robot_randomly_moved : 20,    // orevuisky 1
			patrol_distance : 600, //previous value : 576
			chase_consistency : 0, // prev 0
			chase_consistency_upper_limit : 50,
			//tazer related robot variables
			electricution_delay : 0,
			electricuted_robot_direction : 0,
			electricuted : false,	
			shot: 9,
			electricuted_timer : 3000
		});
	}

	
	var change_load_val = function(a_robot){
		a_robot.robotReady = true;
	};
	
	for(var i= 0; i < passed_robot_array.length; i++){
		passed_robot_array[i].robotImage.src = "images/robots_lights.png";
		passed_robot_array[i].robotImage.onload = change_load_val(passed_robot_array[i]);
	}
	
	//update each robot based on the information in robotReload 
	robotReloadDistributor(passed_robot_array);
	

}

var robot_movement_helper_distributor = function(modifier, passed_robot_array){
	var i = 0;
	for(var i = 0; i < passed_robot_array.length; i ++){
		robot_movement_helper(modifier, passed_robot_array[i]);
	}
}

var robot_movement_helper = function(modifier, currentRobot){
	
	////// hero in bound //////
	var x_diff_sq = Math.pow((currentRobot.x - hero.x),2);
	var y_diff_sq = Math.pow((currentRobot.y - hero.y),2);
	var distance = Math.sqrt(x_diff_sq + y_diff_sq);
	
	if(distance < currentRobot.patrol_distance){
		currentRobot.chase = true;
	}else{ 
		currentRobot.chase = false;
		currentRobot.chase_consistency = 10;
	}
	
	
	
	if(currentRobot.electricuted == true){
		//call move with modifier = 0 thus robot will not move as long as it is electricuted
		if (currentRobot.electricuted_robot_direction >= 3){
			currentRobot.electricuted_robot_direction = 0;
		}else{
			if(currentRobot.electricuted_robot_direction == 0){
				move(currentRobot, 0, "right");
			}else if (currentRobot.electricuted_robot_direction == 1){
				move(currentRobot, 0, "down");
			}else if (currentRobot.electricuted_robot_direction == 2){
				move(currentRobot, 0, "left");
			}else{
				move(currentRobot, 0, "up");
			}
			currentRobot.electricuted_robot_direction ++;
			
			
		}
	}
	else if(currentRobot.chase == true){
		//reflex agent to chase hero
		if(currentRobot.chase_consistency >= currentRobot.chase_consistency_upper_limit){
			//this part is to make sure robot move to certain direction for sometime before it change its mind
			chaseMode(modifier, currentRobot);
			currentRobot.chase_consistency = 0;
		}else{
			if(currentRobot.direction == 1 && check_below_is_legal(currentRobot, modifier))
				move(currentRobot, modifier, "down");
			else if(currentRobot.direction == 2 && check_left_is_legal(currentRobot, modifier))
				move(currentRobot, modifier, "left");
			else if(currentRobot.direction == 3 && check_above_is_legal(currentRobot, modifier))
				move(currentRobot, modifier, "up");
			else if(currentRobot.direction == 0 && check_right_is_legal(currentRobot, modifier))
				move(currentRobot, modifier, "right");
			else{
				currentRobot.chase_consistency =0;
				chaseMode(modifier, currentRobot);

			
			
				
			}
			currentRobot.chase_consistency += 1;
			
		}
	}
	else{
		//var robotMovement = currentRobot.speed*modifier;
		if(currentRobot.direction == 3){// robot facing up	
			if(check_above_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "up");
			}else if(check_left_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "left");
			}else if(check_right_is_legal(currentRobot,modifier)){
				move(currentRobot, modifier, "right");
			}
		}
		else if(currentRobot.direction == 1){//robot facing down
			if(check_below_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "down");
			}else if(check_left_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "left");
			}else if(check_right_is_legal(currentRobot,modifier)){
				move(currentRobot, modifier, "right");
			}
		}else if(currentRobot.direction == 2){//robot facing left
			if(check_left_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "left");
			}else if(check_above_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "up");
			}else if(check_below_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "down");
			}
		}else if(currentRobot.direction == 0){//robot facing left
			if(check_right_is_legal(currentRobot,modifier)){
				move(currentRobot, modifier, "right");
			}else if(check_above_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "up");
			}else if(check_below_is_legal(currentRobot, modifier)){
				move(currentRobot, modifier, "down");
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

var robotReloadDistributor = function(passed_robot_array){
	var i = 0;
	for(i = 0; i < passed_robot_array.length; i ++){
		robotReload(passed_robot_array[i], i);
	}
}
//called in tileMovement and it will renew robot location if it is moved to another tile.
//03-17-2013 Dave if current map does not need 2nd robot set their live value to false! and remove this comment if you have done
// 
var robotReload = function(currentRobot, robotNumb){
	console.log(" CURRENT TILE MAP ROOM IS -> " + currentTileMap );
	
	rock.active = false;
	item.timer = 3000;



	////////
	//    // 
	// 0  //
	//    //
	////////
	if(currentTileMap == 0){
		//think this should be the standard way to update robot(using robotNumb to update different value on robot)
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 256;
			currentRobot.y = 65;
		}else{
			currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		// March
		//robotImage.src will probably need to be changed
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
		
	}

	////////
	//    // 
	// 1  //
	//    //
	////////
	else if(currentTileMap == 1){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 150;
			currentRobot.y = 150;
		}

		else{
			currentRobot.live = false;
		}
		
		
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
		
	}

	////////
	//    // 
	// 2  //
	//    //
	////////

	else if(currentTileMap == 2){

		currentRobot.live = false;
		
		//currentRobot.electricuted = false;
		//currentRobot.robotImage.src = "images/robots_lights.png";
		//item.availability = false;
		//speedyItem.availability = false;
		//gunOnTheGround.availability = false;
			speedyItem.availability = true;
			speedyItem.x = 200;
			speedyItem.y = 400;

		}




	else if(currentTileMap == 3){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 896;
			currentRobot.y = 64;
		}

		else{
			currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}




	else if(currentTileMap == 4){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 900;
			currentRobot.y = 446;
		}
		else{
			currentRobot.live = false;
		}
			currentRobot.electricuted = false;
			currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = true;
		item.x = 896;
		item.y = 64;
		gunOnTheGround.availability = false;
		speedyItem.availability = false;
	}






	else if(currentTileMap == 5){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 64;
			currentRobot.y = 64;
		}
		else{
			currentRobot.live = false;
		}

		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}





	else if(currentTileMap == 6){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 900;
			currentRobot.y = 128;
		}

		else{
			currentRobot.live = false;
		}

		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}




	else if(currentTileMap == 7){
		if(robotNumb == 0){

		currentRobot.live = true;
		currentRobot.x = 900;
		currentRobot.y = 400;
		}

		else{
			currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}




	else if(currentTileMap == 8){
		if(robotNumb == 0){

		currentRobot.live = true;
		currentRobot.x = 128;
		currentRobot.y = 512-64;
		}

		else{
			currentRobot.live = false;
		}

		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = true;
		item.x = 600;
		item.y = 300;
		speedyItem.availability = true;
		gunOnTheGround.availability = false;
	}




	else if(currentTileMap == 9){
		if(robotNumb == 0){

			currentRobot.live = true;
			currentRobot.x = 10*64;
			currentRobot.y = 3*64;
		
		}

		else{
			currentRobot.live = false;
		}

		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}







	else if(currentTileMap == 10){
		if(robotNumb == 0){

		currentRobot.live = true;
		currentRobot.x = 128;
		currentRobot.y = 400;
		}
		else{
			currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}





	else if(currentTileMap == 11){

		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 900;
			currentRobot.y = 400;
		}
		else{
			currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}







	else if(currentTileMap == 12){

		if(robotNumb == 0){


			currentRobot.live = true;
			currentRobot.x = 900;
			currentRobot.y = 375;
	
		}

		else{
			currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}









	else if(currentTileMap == 13){
	
		if(robotNumb == 0){
		currentRobot.live = true;
		currentRobot.x = 900;
		currentRobot.y = 128;
		}

		else{
			currentRobot.live = false;
		}

		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}








	else if(currentTileMap == 14){
		if(robotNumb == 0){

			currentRobot.live = true;
			currentRobot.x = 675;
			currentRobot.y = 300;
		
		}

		else{
			currentRobot.live = false;
		}

		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}







	else if(currentTileMap == 15){
			
		if(robotNumb == 0){	

			currentRobot.live = true;
			currentRobot.x = 900;
			currentRobot.y = 400;
		
		}

		else{

			currentRobot.live = false;
		
		}

		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
		
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}






	else if(currentTileMap == 16){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 895;
			currentRobot.y = 256;
			
		}else{
			currentRobot.live = false;
		}
		hero.x = 100;
		hero.y = 100;
		currentRobot.electricuted = false;
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}else if(currentTileMap == 17){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 650;
			currentRobot.y = 500;
			
		}else{
			currentRobot.live = true;
			currentRobot.x = 330;
			currentRobot.y = 190;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}else if(currentTileMap == 18){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 800;
			currentRobot.y = 125;
			
		}else{
			currentRobot.live = true;
			currentRobot.x = 640;
			currentRobot.y = 192;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}else if(currentTileMap == 19){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 486;
			currentRobot.y = 128;
			
		}else{
			currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 20){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 725;
			currentRobot.y = 448;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 308;
			currentRobot.y = 228;
			
		}else{
			currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 21){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 725;
			currentRobot.y = 448;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
			currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 22){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 225;
			currentRobot.y = 448;
			
		}
			
		else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 23){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 225;
			currentRobot.y = 448;
			
		}
			
		else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 24){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 400;
			currentRobot.y = 400;
			
		}
			
		else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 25){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 100;
			currentRobot.y = 400;
			
		}
			
		else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 26){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}
			
		else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 27){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 28){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 29){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 30){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 31){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 32){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 33){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 34){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 35){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 36){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 37){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 38){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 39){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 40){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 41){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}
	else if(currentTileMap == 42){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 400;
			
		}else if(robotNumb == 1){
			currentRobot.live = true;
			currentRobot.x = 378;
			currentRobot.y = 228;
			
		}else{
		currentRobot.live = false;
		}
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_lights.png";
	
		item.availability = false;
		speedyItem.availability = false;
		gunOnTheGround.availability = false;
	}

	else if(currentTileMap == 43){
		if(robotNumb == 0){
			currentRobot.live = true;
			currentRobot.x = 280;
			currentRobot.y = 450;
			
		}
		else{
		currentRobot.live = false;
		}
		currentRobot.shot = 100;
		currentRobot.electricuted = false;
		currentRobot.robotImage.src = "images/robots_boss.png";
		currentRobot.boss = true;
		currentRobot.patrol_distance = 600;
		robot_randomly_moved = 5;
		item.availability = true;
		speedyItem.availability = true;
		
		gunOnTheGround.availability = false;
	}
};


	
	