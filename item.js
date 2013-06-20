var itemImage = new Image();
itemImage.src = "images/tazer.png";
var speedyItemImage = new Image();
speedyItemImage.src = "images/energy_drink.png";

var item = {
		x: 896,
		y: 64,
		screen: 1,
		availability : false,
		timer: 3000
	};
	
var speedyItem = {
		x: 64,
		y: 128,
		screen: 2,
		availability : false,
		start_timer: 4000,
		timer: 4000,
		speed: 400
};