//hero
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
		heroReady = true;
};
//heroImage.src = "images/arrows.png";
heroImage.src = "images/hero_sheet.png";

var heroFrameIndex = 0;

var hero = {
		speed: 256, //movementin pixels per second (original : 256)
		x: 900, //original: 192
		y: 200, //original: 64
		direction: 0,
		ease: 10,
		name: "hero",
		char_moved: 1,
		energy_gun_timer: 500,
		own_item : false,
		own_speedyItem : false,
		hasRocks : true
		
		//own_item is temporarly in true. need to start with false
		
		
		};


		
var hero_ready_fun = function(){
	return heroReady;
}
		
////////////////////////////////////
// FUNCTIONS FOR MOVING THE HERO CHARACHTER AROUND
////////////////////////////////////
var keyboard_movement = function(modifier){
	var old_hero_x = hero.x;
	var old_hero_y = hero.y;
	
	
	var heroMovement = hero.speed*modifier;
	
	if (38 in keysDown){ //player holding up
		//map tile collision detection
		if(check_above_is_legal(hero,modifier))
		{
			move(hero, modifier, "up");
		}
		
		
	}
	else if (40 in keysDown){ //player holding down
		if(check_below_is_legal(hero, modifier))
		{
			move(hero, modifier, "down");
		}
		
	}
	else if (37 in keysDown){ //holding left
		if(check_left_is_legal(hero, modifier))
		{
			move(hero, modifier, "left");
		}
		
	}
	else if (39 in keysDown){ //holding right
		if(check_right_is_legal(hero,modifier))
		{
			move(hero, modifier, "right");
		}
		
	}
	if (88 in keysDown){ // holding x
		if(hero.hasRocks == true && rock.active == false){
			heroImage.src = "images/hero_shoot.png";
			hero.energy_gun_timer = 500;
			throwRocks();
		}
	}
};