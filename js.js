var step = 0;  //  auxiliary variable for counting steps and player changing 
	
	//  variables for operations on blocks
var b1 = document.getElementById("1"),
	b2 = document.getElementById("2"),
	b3 = document.getElementById("3"),
	b4 = document.getElementById("4"),
	b5 = document.getElementById("5"),
	b6 = document.getElementById("6"),
	b7 = document.getElementById("7"),
	b8 = document.getElementById("8"),
	b9 = document.getElementById("9"),
	blocks = [b1,b2,b3,b4,b5,b6,b7,b8,b9];
    
	// main function, which allows to make steps
document.getElementById("game").onclick = function(event) {
	console.log(event);
	if (event.target.className == "block") {
		step%2 == 0 ? event.target.value = 'x' : event.target.value = 'o';
	}
	step++;
	checkWinner();
	stop();
}
// stops the changing of field blocks
function stop () {
	for (var index=0; index<blocks.length; index++) {
		if (blocks[index].value !=="") {
			blocks[index].disabled = true;
		}
	}
}
	// variables for making gradients
var horGrad = "linear-gradient(0deg, green 47%, white 47%, white 53%, green 53%)";
var verGrad = "linear-gradient(90deg, green 47%, white 47%, white 53%, green 53%)"
var diagGrad1 = "linear-gradient(45deg, green 47%, white 47%, white 53%, green 53%)";
var diagGrad2 = "linear-gradient(-45deg, green 47%, white 47%, white 53%, green 53%)"
	
	//functions, which change the style of the winning combinations of blocks
function hor1 () {
	b1.style.background = horGrad;
	b2.style.background = horGrad;
	b3.style.background = horGrad;
}
function hor2 () {
	b4.style.background = horGrad;
	b5.style.background = horGrad;
	b6.style.background = horGrad;
}
function hor3 () {
	b7.style.background = horGrad;
	b8.style.background = horGrad;
	b9.style.background = horGrad;
}
function ver1 () {
	b1.style.background = verGrad;
	b4.style.background = verGrad;
	b7.style.background = verGrad;
}
function ver2 () {
	b2.style.background = verGrad;
	b5.style.background = verGrad;
	b8.style.background = verGrad;
}
function ver3 () {
	b3.style.background = verGrad;
	b6.style.background = verGrad;
	b9.style.background = verGrad;
}
function diag1 () {
	b1.style.background = diagGrad1;
	b5.style.background = diagGrad1;
	b9.style.background = diagGrad1;
}
function diag2 () {
	b3.style.background = diagGrad2;
	b5.style.background = diagGrad2;
	b7.style.background = diagGrad2;
}
	// conditions of victory
function checkWinner(){
	// X wins
	if (b1.value == 'x' && b2.value == 'x' && b3.value == 'x') {
		hor1();
		document.getElementById("winner").innerText = "The winner is X";
		winblock();
	}
	if (b4.value == 'x' && b5.value == 'x' && b6.value == 'x') {
		hor2();
		document.getElementById("winner").innerText = "The winner is X";
		winblock();
	}
	if (b7.value == 'x' && b8.value == 'x' && b9.value == 'x') {
		hor3();
		document.getElementById("winner").innerText = "The winner is X";
		winblock();
	}
	if (b1.value == 'x' && b4.value == 'x' && b7.value == 'x') {
		ver1();
		document.getElementById("winner").innerText = "The winner is X";
		winblock();
	}
	if (b2.value == 'x' && b5.value == 'x' && b8.value == 'x') {
		ver2();
		document.getElementById("winner").innerText = "The winner is X";
		winblock();
	}
	if (b3.value == 'x' && b6.value == 'x' && b9.value == 'x') {
		ver3();
		document.getElementById("winner").innerText = "The winner is X";
		winblock();
	}
	if (b1.value == 'x' && b5.value == 'x' && b9.value == 'x') {
		diag1();
		document.getElementById("winner").innerText = "The winner is X";
		winblock();
	}
	if (b3.value == 'x' && b5.value == 'x' && b7.value == 'x') {
		diag2();
		document.getElementById("winner").innerText = "The winner is X";
		winblock();
	}
	// O wins
	if (b1.value == 'o' && b2.value == 'o' && b3.value == 'o') {
		hor1();
		document.getElementById("winner").innerText = "The winner is O";
		winblock();
	}
	if (b4.value == 'o' && b5.value == 'o' && b6.value == 'o') {
		hor2();
		document.getElementById("winner").innerText = "The winner is O";
		winblock();
	}
	if (b7.value == 'o' && b8.value == 'o' && b9.value == 'o') {
		hor3();
		document.getElementById("winner").innerText = "The winner is O";
		winblock();
	}
	if (b1.value == 'o' && b4.value == 'o' && b7.value == 'o') {
		ver1();
		document.getElementById("winner").innerText = "The winner is O";
		winblock();
	}
	if (b2.value == 'o' && b5.value == 'o' && b8.value == 'o') {
		ver2();
		document.getElementById("winner").innerText = "The winner is O";
		winblock();
	}
	if (b3.value == 'o' && b6.value == 'o' && b9.value == 'o') {
		ver3();
		document.getElementById("winner").innerText = "The winner is O";
		winblock();
	}
	if (b1.value == 'o' && b5.value == 'o' && b9.value == 'o') {
		diag1();
		document.getElementById("winner").innerText = "The winner is O";
		winblock();
	}
	if (b3.value == 'o' && b5.value == 'o' && b7.value == 'o') {
		diag2();
		document.getElementById("winner").innerText = "The winner is O";
		winblock();
	}
}
	// disables all blocks after victory
function winblock(){
    for(var index=0; index<blocks.length; index++) {
    	blocks[index].disabled = true;
    }
}
	//  clear the game field
function reset() {
	for (var index=0; index<blocks.length; index++) {
		blocks[index].value = "";
		blocks[index].disabled = false;
		blocks[index].style.background = "#00bbbb";
	}
    document.getElementById("winner").innerText = "";
    step = 0;
}