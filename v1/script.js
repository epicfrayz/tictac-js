var items = document.getElementsByClassName("app_block");
var movePlayer = true;
var game = true;

for (var i = 0; i < items.length; i++) {
	items[i].addEventListener("click", function() {
		
		if( !this.classList.contains("active") ){
			if( movePlayer) {
				if(this.innerHTML == "") {
					this.classList.add("active");
					this.innerHTML = "x"
				}

				var result = checkMap();
				if( result.val) {
					game = false;
					setTimeout(function() {
						exit(result);
					}, 10);
				}

				movePlayer = !movePlayer;
			}
			
			if(game) {
				setTimeout(function() {
					botMove();
				}, 200);
			}
			
		}
	});
}

function botMove() {
	// чисто на рандоме
	var items = document.querySelectorAll(".app_block:not(.active)");
	var step = getRandomInt(items.length);

	items[ step ].innerHTML = "0";
	items[ step ].classList.add("active");

	var result = checkMap();
	if( result.val) {
		setTimeout(function() {
			exit(result);
		}, 1);
	}

	movePlayer = !movePlayer;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function checkMap() {
	var block = document.querySelectorAll(".app_block");
	var items = [];
	for (var i = 0; i < block.length; i++) { 
		items.push(block[i].innerHTML);
	}

	if ( items[0] == "x" && items[1] == 'x' && items[2] == 'x' ||
		 items[3] == "x" && items[4] == 'x' && items[5] == 'x' ||
		 items[6] == "x" && items[7] == 'x' && items[8] == 'x' ||
		 items[0] == "x" && items[3] == 'x' && items[6] == 'x' ||
		 items[1] == "x" && items[4] == 'x' && items[7] == 'x' ||
		 items[2] == "x" && items[5] == 'x' && items[8] == 'x' ||
		 items[0] == "x" && items[4] == 'x' && items[8] == 'x' ||
		 items[6] == "x" && items[4] == 'x' && items[2] == 'x' )
		return { val: true, win: "player"}
	if ( items[0] == "0" && items[1] == '0' && items[2] == '0' ||
		 items[3] == "0" && items[4] == '0' && items[5] == '0' ||
		 items[6] == "0" && items[7] == '0' && items[8] == '0' ||
		 items[0] == "0" && items[3] == '0' && items[6] == '0' ||
		 items[1] == "0" && items[4] == '0' && items[7] == '0' ||
		 items[2] == "0" && items[5] == '0' && items[8] == '0' ||
		 items[0] == "0" && items[4] == '0' && items[8] == '0' ||
		 items[6] == "0" && items[4] == '0' && items[2] == '0' )
		return { val: true, win: "bot"}

	return {val: false}
}

function exit(obj) {
	alert(obj.win + " - game over");
	location.reload();
};