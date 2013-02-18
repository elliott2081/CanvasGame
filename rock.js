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
	speed : 1024,
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