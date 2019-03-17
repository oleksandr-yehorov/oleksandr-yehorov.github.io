//Creation of field
var n=5,        // side of the field
    fieldSize = n*n,
    winPos = 4; 

var step=0;

window.onload=function (){    
for(i=1;i<=fieldSize;i++){
  var form=document.getElementById("field1");
  var button1=document.createElement("button");
  var node1=document.createTextNode(" ");
  button1.appendChild(node1);
  button1.onclick=(function(id){
    return function(){
      move(id);};})(i);
  form.appendChild(button1);
  if(i%n==0){ 
    var br1=document.createElement("br");
    var button1=document.createElement("button");
    form.appendChild(br1);}
  }
}

var horGrad = "linear-gradient(0deg, green 47%, white 47%, white 53%, green 53%)";
var verGrad = "linear-gradient(90deg, green 47%, white 47%, white 53%, green 53%)"
var diagGrad1 = "linear-gradient(45deg, green 47%, white 47%, white 53%, green 53%)";
var diagGrad2 = "linear-gradient(-45deg, green 47%, white 47%, white 53%, green 53%)"

// User make a move at cell id
function move (id) {
//alert (id);
  step++;
  if(step%2==1){place='X';
  }
  else {place='O';
  }
var arr = document.getElementsByTagName("button");
if (arr[--id].innerHTML!=" "){step--;return;}
arr[id].innerHTML=place;


//Putting data from field to an Array
var field = new Array (fieldSize); // For convinience I will use from 1 to 225, not using 0 index
for (k=1;k<=fieldSize;k++){
field[k]=arr[k-1].innerHTML;}

var wins=false;
//Checking rows
for (r=1; r<=(fieldSize); r++){
   if (field [r]==place&&field [r+1]==place&&field [r+2]==place&&field [r+3]==place/*&&field [r+4]==place*/){
      arr[r-1].style.background = horGrad;
      arr[r].style.background = horGrad;
      arr[r+1].style.background = horGrad;
      arr[r+2].style.background = horGrad;
      wins=true;
      winblock();}
   if(r%n==(n-winPos+1)){r+=(winPos-1);}
}
//Checking columns
for (c=1; c<=(fieldSize); c++){
   if (field [c]==place&&field [c+n]==place&&field [c+2*n]==place&&field [c+3*n]==place/*&&field [c+4*n]==place*/){
      arr[c-1].style.background = verGrad;
      arr[c+n-1].style.background = verGrad;
      arr[c+2*n-1].style.background = verGrad;
      arr[c+3*n-1].style.background = verGrad;
      wins=true;
      winblock();}
}
//Checking diagonals
for (d=1; d<=fieldSize; d++){
   if (field [d]==place&&field [d+(n+1)]==place&&field [d+2*(n+1)]==place&&field [d+3*(n+1)]==place/*&&field [d+4*(n+1)]==place*/){
      arr[d-1].style.background = diagGrad1;
      arr[d+(n+1)-1].style.background = diagGrad1;
      arr[d+2*(n+1)-1].style.background = diagGrad1;
      arr[d+3*(n+1)-1].style.background = diagGrad1;
      wins=true;
      winblock();}
   if(d%n==(n-winPos+1)){d+=winPos-1;}
}  
for (d=1; d<=fieldSize; d++){
    if(d%n==1){d+=(winPos-1);}
    if (field [d]==place&&field [d+(n-1)]==place&&field [d+2*(n-1)]==place&&field [d+3*(n-1)]==place/*&&field [d+4*(n-1)]==place*/){
      arr[d-1].style.background = diagGrad2;
      arr[d+(n-1)-1].style.background = diagGrad2;
      arr[d+2*(n-1)-1].style.background = diagGrad2;
      arr[d+3*(n-1)-1].style.background = diagGrad2; 
      wins=true;
      winblock();}
}   
if (wins == true) {document.getElementById('winner').innerText = place +" wins!";}
if (step>=fieldSize){document.getElementById('winner').innerText =  "It\'s a tie!";}
};

function winblock(){
    var arr = document.getElementsByTagName("button");
    for(var index=1; index<=arr.length; index++) {
      arr[index-1].disabled = true;
    }
}

function reset() {
  step =0;
  var arr = document.getElementsByTagName("button");
  for(var index=1; index<=fieldSize;index++){
    arr[index-1].innerHTML=" ";      
    arr[index-1].disabled = false;
    arr[index-1].style.background = '#3a9693';
    }
  document.getElementById('winner').innerHTML =  " ";
}