//hero
//var heroReady = false;
var heroImage = new Image();
/*heroImage.onload = function(){
		heroReady = true;
};*/
//heroImage.src = "images/arrows.png";
heroImage.src = "images/greenArrow.png";


/*hero_moved: 1 ms(src image change!), 2ms, 3ms, 4ms, 5ms(=src image change!)*/
var hero_moved = 1;
var heroFrameIndex = 0;

//game objects
var hero = {
		speed: 256, //movementin pixels per second
		x: 900,
		y: 450,
		direction: 0,
		ease: 10,
		name: "hero"
		};

		
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
			hero.y -= hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation(3,hero);
		}
		
		
	}
	else if (40 in keysDown){ //player holding down
		if(check_below_is_legal(hero, modifier))
		{
			hero.y += hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation(1,hero);
		}
		
	}
	else if (37 in keysDown){ //holding left
		if(check_left_is_legal(hero, modifier))
		{
			hero.x -= hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation(2,hero);
		}
		
	}
	else if (39 in keysDown){ //holding right
		if(check_right_is_legal(hero,modifier))
		{
			hero.x += hero.speed * modifier;
			hero_moved += 1;// CJ's code
			animation(0,hero);
		}
		
	}
};