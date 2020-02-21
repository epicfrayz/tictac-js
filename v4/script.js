"use strick"
var game = true;
var firstPlayer = true;


const app = new PIXI.Application({
	width: 720,
	height: 390,
	resolution: window.devicePixelRation || 1,
});
document.body.appendChild(app.view);

let wrapper = new PIXI.Container();
app.stage.addChild(wrapper);

for (let i = 0; i < 9; i++) {
    let container = new PIXI.Container();
	let block = new PIXI.TilingSprite( PIXI.Texture.from("images/bg.png") , 240, 130);
    
	container.x = (i % 3) * 240;
    container.y = Math.floor(i / 3) * 130;
    container.addChild(block);
    
    let text = new PIXI.Text("");
    text.anchor.set(0.5);
    text.x = container.width / 2;
    text.y = container.height / 2;
    container.addChild(text);
    
    container.interactive = true;    
    container.on("mousedown", function () {
        addValueInBlock(this);
    });
    
    wrapper.addChild(container);
}

function addValueInBlock(that) {
    if(firstPlayer) {
        // Ход первого игрока - X
        if( that.children[1].text == " " ) {
            that.children[1].style = {
                fill: "#d64c42",
                fontFamily: "Arial",
                fontSize: 32,
                fontWeight: "bold",
            };
            that.children[1].text = "x"
            
            firstPlayer = !firstPlayer;
        }
        
    } else {
        // Ход второго игрока - 0
        
        if( that.children[1].text == " " ) {
            that.children[1].style = {
                fill: "#e2e3e8",
                fontFamily: "Arial",
                fontSize: 32,
                fontWeight: "bold",
            };
            that.children[1].text = "0"
            
             firstPlayer = !firstPlayer;
        }
    }
    endGame();
}

function endGame() {
    var result = checkMap();
    console.log(result);
    if( result.active ) {
        setTimeout(function() {
            alert(result.win + " - win");
            clearMap();
        }, 100);
    }
}

function clearMap() {
    console.log("sdf");
    let items = wrapper.children;
    
    for(let i = 0; i < items.length; i++) {
        console.log( items[i].children[1].text );
        items[i].children[1].text = "";
        firstPlayer = true;
    }
}
function checkMap() {
    let items = wrapper.children;
    
	if ( items[0].children[1].text == "x" && items[1].children[1].text == 'x' && items[2].children[1].text == 'x' ||
		 items[3].children[1].text == "x" && items[4].children[1].text == 'x' && items[5].children[1].text == 'x' ||
		 items[6].children[1].text == "x" && items[7].children[1].text == 'x' && items[8].children[1].text == 'x' ||
		 items[0].children[1].text == "x" && items[3].children[1].text == 'x' && items[6].children[1].text == 'x' ||
		 items[1].children[1].text == "x" && items[4].children[1].text == 'x' && items[7].children[1].text == 'x' ||
		 items[2].children[1].text == "x" && items[5].children[1].text == 'x' && items[8].children[1].text == 'x' ||
		 items[0].children[1].text == "x" && items[4].children[1].text == 'x' && items[8].children[1].text == 'x' ||
		 items[6].children[1].text == "x" && items[4].children[1].text == 'x' && items[2].children[1].text == 'x' ) {
        return {active: true, win: "player 1"};
    }
		
	if ( items[0].children[1].text == "0" && items[1].children[1].text == '0' && items[2].children[1].text == '0' ||
		 items[3].children[1].text == "0" && items[4].children[1].text == '0' && items[5].children[1].text == '0' ||
		 items[6].children[1].text == "0" && items[7].children[1].text == '0' && items[8].children[1].text == '0' ||
		 items[0].children[1].text == "0" && items[3].children[1].text == '0' && items[6].children[1].text == '0' ||
		 items[1].children[1].text == "0" && items[4].children[1].text == '0' && items[7].children[1].text == '0' ||
		 items[2].children[1].text == "0" && items[5].children[1].text == '0' && items[8].children[1].text == '0' ||
		 items[0].children[1].text == "0" && items[4].children[1].text == '0' && items[8].children[1].text == '0' ||
		 items[6].children[1].text == "0" && items[4].children[1].text == '0' && items[2].children[1].text == '0' ) {
        return {active: true, win: "player 2"};
    }
    
	return {active: false};
}