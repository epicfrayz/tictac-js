var items = document.getElementsByClassName("app_block"); 	// Коллекция элементов
var movePlayer = true;										// Ход игрока
var game = true;											// состояние игры


// Перебираем все элементы и назначаем событие клик на ячейку.
for (var i = 0; i < items.length; i++) {
	items[i].addEventListener("click", function() {
		var collecion = document.querySelectorAll(".app_block:not(.active)");

		// Проверка на ничью
		if(collecion.length == 1) {
			exit({win: "other"});
		}

		// проверка на значение внутри ячейки
		if( !this.classList.contains("active") ){

			// ели ходит игрок
			if( movePlayer) {

				// елс иячейка свободна
				if(this.innerHTML == "") {
					// занять ячейку
					this.classList.add("active");
					this.classList.add("active_x");
					this.innerHTML = "x"
				}
				// проверка ячеек и выход
				var result = checkMap();
				if( result.val) {
					game = false;
					setTimeout(function() {
						exit(result);
					}, 10);
				}

				movePlayer = !movePlayer;
			}
			
			// если все еще играем, то ходит бот
			if(game) {
				setTimeout(function() {
					botMove();
				}, 200);
			}
			
		}
	});
}

function botMove() {
	// чбот ходит рандомно
	var items = document.querySelectorAll(".app_block:not(.active)");

	var step = getRandomInt(items.length);

	items[ step ].innerHTML = "0";
	items[ step ].classList.add("active");
	items[ step ].classList.add("active_o");

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


// проверка ячеек
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

// выход/перезагрузка
function exit(obj) {
	alert(obj.win + " - game over");
	location.reload();
};