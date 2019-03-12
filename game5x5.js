var
  winWhen = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
                                                      
    [0, 5, 10, 15, 20],                     //  Vicory combination
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],

    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ],

  game = {                        // Main object with all properties
    scoreA: 0,
    scoreB: 0,
    playerA: 'Player A',
    playerB: 'Player B',
    state: [],
    step: 'X',
    pA: '',
    pB: '',
    sA: '',
    sB: '',
    enabled: true
  },
  btn;
  
  for (var i=0; i<25; i++){   //  Filling array with zeros, which will accept the values ​​of the buttons
    game.state[i] = 0;
  }

  game.playerA = prompt("Enter the name of first player", game.playerA);
  game.playerB = prompt("Enter the name of second player", game.playerB);

function gameField() {             // Building a game field 5x5
    for (var index =0; index<25; index++){
        document.getElementById('board').innerHTML += '<button></button>';
    }
}

window.onload = function () {       // Main function
  
  game.pA = document.getElementById('player-a');
  game.pB = document.getElementById('player-b');
  game.sA = document.getElementById('score-a');
  game.sB = document.getElementById('score-b');

  game.pA.innerText = game.playerA == null ? 'Player A' : game.playerA
  game.pB.innerText = game.playerB == null ? 'Player B' : game.playerB

  game.sA.innerText = game.scoreA;
  game.sB.innerText = game.scoreB;

  gameField();  // building a game field 5x5
 

  btn = document.querySelectorAll('#board button');
 
        //    Adding Event Listeners to butttons
  btn[0].addEventListener('click', function(){game.clicked(0)})
  btn[1].addEventListener('click', function(){game.clicked(1)})
  btn[2].addEventListener('click', function(){game.clicked(2)})
  btn[3].addEventListener('click', function(){game.clicked(3)})
  btn[4].addEventListener('click', function(){game.clicked(4)})
  btn[5].addEventListener('click', function(){game.clicked(5)})
  btn[6].addEventListener('click', function(){game.clicked(6)})
  btn[7].addEventListener('click', function(){game.clicked(7)})
  btn[8].addEventListener('click', function(){game.clicked(8)})
  btn[9].addEventListener('click', function(){game.clicked(9)})
  btn[10].addEventListener('click', function(){game.clicked(10)})
  btn[11].addEventListener('click', function(){game.clicked(11)})
  btn[12].addEventListener('click', function(){game.clicked(12)})
  btn[13].addEventListener('click', function(){game.clicked(13)})
  btn[14].addEventListener('click', function(){game.clicked(14)})
  btn[15].addEventListener('click', function(){game.clicked(15)})
  btn[16].addEventListener('click', function(){game.clicked(16)})
  btn[17].addEventListener('click', function(){game.clicked(17)})
  btn[18].addEventListener('click', function(){game.clicked(18)})
  btn[19].addEventListener('click', function(){game.clicked(19)})
  btn[20].addEventListener('click', function(){game.clicked(20)})
  btn[21].addEventListener('click', function(){game.clicked(21)})
  btn[22].addEventListener('click', function(){game.clicked(22)})
  btn[23].addEventListener('click', function(){game.clicked(23)})
  btn[24].addEventListener('click', function(){game.clicked(24)})


  
}

game.clicked = function (i) {                   //  Allows clicking
  if (game.state[i] === 0  && game.enabled) {
    game.state[i] = game.step;
    for (var i = 0; i < 25; i++) {
      var value = game.state[i];            // Auxilary variable for value X or O
      if (value !== 0) {
        btn[i].innerText = value;           // Inserting value to button
      }
    }
      if (vicory()){                        //  Victory conditions
      if (game.step === 'X') {
        game.scoreA++;
        game.sA.innerText = game.scoreA;
      } else {
        game.scoreB++;
        game.sB.innerText = game.scoreB;
      }
      if (game.scoreA > game.scoreB) {
        game.pA.style.backgroundColor = 'gold';
        game.pB.style.backgroundColor = 'silver';
      } else if (game.scoreA === game.scoreB) {
        game.pA.style.backgroundColor = 'lightblue';
        game.pB.style.backgroundColor = 'lightblue';
      } else {
        game.pB.style.backgroundColor = 'gold';
        game.pA.style.backgroundColor = 'silver';
      }
    }
    game.step = (game.step === 'X') ? 'O' : 'X';
  }
}
      //  Making gradients
var horGrad = "linear-gradient(0deg, green 47%, white 47%, white 53%, green 53%)";
var verGrad = "linear-gradient(90deg, green 47%, white 47%, white 53%, green 53%)"
var diagGrad1 = "linear-gradient(45deg, green 47%, white 47%, white 53%, green 53%)";
var diagGrad2 = "linear-gradient(-45deg, green 47%, white 47%, white 53%, green 53%)"


function vicory(){                                //  Victory conditions
  for (var g = 0; g < winWhen.length; g++) {
    if (
      btn[winWhen[g][0]].innerText != '' &&
      btn[winWhen[g][1]].innerText != '' &&
      btn[winWhen[g][2]].innerText != '' &&
      btn[winWhen[g][3]].innerText != '' &&
      btn[winWhen[g][4]].innerText != ''
    ) {
      if (
        btn[winWhen[g][4]].innerText == btn[winWhen[g][3]].innerText &&
        btn[winWhen[g][3]].innerText == btn[winWhen[g][2]].innerText &&
        btn[winWhen[g][2]].innerText == btn[winWhen[g][1]].innerText &&
        btn[winWhen[g][1]].innerText == btn[winWhen[g][0]].innerText
      ) {
        for (var k = 0; k < 5; k++) {
          if (g==0||g==1||g==2||g==3||g==4){        // Horizontal line
            btn[winWhen[g][k]].style.background = horGrad;
          }
          else if (g==5||g==6||g==7||g==8||g==9){   // Vertical line
            btn[winWhen[g][k]].style.background = verGrad;
          }
          else if (g==10) {                         // Diagonal 
            btn[winWhen[g][k]].style.background = diagGrad1;
          }
          else {                                    // Diagonal 
            btn[winWhen[g][k]].style.background = diagGrad2;
          }
        }
        game.enabled = false                  //  Disables next step
        window.setTimeout(game.clear, 2000);
        return true;
      }
    }
  }
  if(game.state.indexOf(0) == -1){             // Gamefield is full of values
      setTimeout(game.clear, 700)             // Clear game field
  }
  return false;
}

game.fill = function () {                     // Filling to btn empty values
  for (var i = 0; i < 25; i++) {
    btn[i].innerText = '';
  }
}

game.clear = function () {                    // Clear game field
  for (var i = 0; i < 25; i++) {
    btn[i].style.backgroundColor = '#fff';
    btn[i].style = '';
  }
  game.state = new Array(25).fill(0);
  game.fill();
  game.step = 'X';
  game.enabled = true;
}

game.restart = function () {                  // Restart game
  game.clear();
  game.scoreA = game.scoreB = 0;
  game.sA.innerText = game.sB.innerText = 0;
  game.pA.style.backgroundColor = 'lightblue';
  game.pB.style.backgroundColor = 'lightblue';
};