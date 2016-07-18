
window.onload = drawBoard;
//ADD PIECES TO 2D ARRAY USING COLUMN AND ROW DATA TO SPECIFY WHERE IN THE ARRAY THE PIECE GOES
//http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
//http://inventwithpython.com/blog/2012/02/20/i-need-practice-programming-49-ideas-for-game-clones-to-code/
var canvas;
var ctx;
var pieceX    = 170;
var pieceY    = 50;;
var column    = 0;
var board     = new Array(7);
var move      = 1;
var rowCount = 0;
var colCount = 0;
var rWins = 0;
var yWins = 0;
var win = false;

function drawBoard(){
	document.getElementById("resetButton").disabled = true;
	board = new Array(7);
	for(var i = 0; i < 7; i++){
		board[i] = new Array(7);
	}
	canvas = document.getElementById("myCanvas");
	canvas.addEventListener("click", clickPos, false);
	ctx = canvas.getContext("2d")
	
	//works for 900x1440 does not work for 900x1600
	/*canvas.width = window.innerWidth / 1.6;
	canvas.height = window.innerHeight / 1.2;*/
	
	canvas.style.backgroundColor = "#E6EDFF";
	while(colCount < 6){
		while(rowCount < 7){
			drawPiece();
			pieceX += 110;
			rowCount++
		}
		colCount++
		pieceY += 100;
		pieceX = 170;
		rowCount = 0;
	}
	
}

function ResetBoard(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	pieceX = 170;
    pieceY = 50;
	rowCount = 0;
	colCount = 0;
	drawBoard();
	win = false;
}

function drawPiece(){
	ctx.fillStyle = "#1770FF";
	//alert("redraw");
	ctx.beginPath();
	ctx.arc(pieceX - 50, pieceY + 50, 40, 0, 2 * Math.PI);
	ctx.rect(pieceX, pieceY, -100, 100);
	ctx.fill();
	
}

function clickPos(event){
	if(win == false){
		var totalOffsetX   = 0;
		var totalOffsetY   = 0;
		var canvasX        = 0;
		var canvasY        = 0;
		var currentElement = this;
		var increment      = 70;
		var hundo          = 0;

		do{
			totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
			totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
		}
		while(currentElement = currentElement.offsetParent)

		canvasX = event.pageX - totalOffsetX;
		canvasY = event.pageY - totalOffsetY;
		/*if(70 == Math.abs(070)){
			alert("True");
		}*/
		//FIXED
		//BUG for some reason for loop is looping once before recognizing first column
		//alert("X: " + canvasX + "   " + "Y: " + canvasY);
		for(i = 0; i < 7; i++){
			if(i == 0){
				if(canvasX >= increment && canvasX <= (increment + 100)){
					column = (i + 1);
					//alert("Column " + column + " \n MIN: " + increment + "\n MAX: " + (increment + 100));
					Move();
				}
				increment += 10;
				hundo += 100;
			}
			else if(i > 0){
				if(canvasX >= (hundo + increment) && canvasX <= ((hundo + 100) + increment)){
					column = (i + 1);
					//alert("Column " + column + " \n MIN: " + (hundo + increment) + "\n MAX: " + ((hundo + 100) + increment));
					//increment += 10;
					Move();
				}
				increment += 10;
				hundo += 100;
			}
			//alert("Column " + (i + 1) + " \n MIN: " + (hundo + increment) + "\n MAX: " + ((hundo + 100) + increment));
			//increment += 10;
		}
	}
}

function Move(){
	if(move == 1){
		redMove();
	}
	else
		yellowMove();
}

function redMove(){
	var yCirc = 600;
	/*var rowCorrector = 5;
	var rowS = String(yCirc).charAt(0);
	var row = Number(rowS) - rowCorrector;*/
	var row = 0;
	var col = column - 1;
	
	for(i = 0; i < 5; i++){
		var imgd = ctx.getImageData(column + '' + (column + 1) + '' + 0, yCirc, canvas.width, canvas.height);
		var pix = imgd.data;
		if(pix[0] == 255 || (pix[0] == 255 && pix[1] == 255)){
			//alert("RED");
			row++;
			yCirc -= 100;
			/*rowCorrector--;
			rowS = String(yCirc).charAt(0);
			row = Number(rowS) - rowCorrector;*/
		}
	}
	ctx = canvas.getContext("2d")
	ctx.beginPath();
	ctx.arc(column + '' + (column + 1) + '' + 0, yCirc, 40, 0, 2 * Math.PI);
	ctx.fillStyle = "Red";
	ctx.fill();
	board[col][row] = "R";
	
	//alert("Red Move in column " + column);
	move = 2;
	document.getElementById("Turn").innerHTML = "Turn: Yellow";
	//alert("Column " + col + "  " + "Row " + row);
	//alert(board[1][2])
	//checkWin();
	checkRedWin();
}

function yellowMove(){
	//alert("Yellow Move in column " + column);
	var yCirc = 600;
	var row = 0;
	var col = column - 1;
	
	for(i = 0; i < 5; i++){
		var imgd = ctx.getImageData(column + '' + (column + 1) + '' + 0, yCirc, canvas.width, canvas.height);
		var pix = imgd.data;
		if(pix[0] == 255 || (pix[0] == 255 && pix[1] == 255)){
			//alert("YELLOW");
			row++;
			yCirc -= 100;
		}
	}
	
	ctx = canvas.getContext("2d")
	ctx.beginPath();
	ctx.arc(column + '' + (column + 1) + '' + 0, yCirc, 40, 0, 2 * Math.PI);
	ctx.fillStyle = "Yellow";
	ctx.fill();
	board[col][row] = "Y";
	move = 1;
	document.getElementById("Turn").innerHTML = "Turn: Red";
	checkYellowWin();
}

function TestValue(){
	var xBoard = document.getElementById("xCoord").value;
	var yBoard = document.getElementById("yCoord").value;
	alert(board[xBoard][yBoard]);
}

/*function checkHorizontal(){
	var win = false;
	var concRow = "";
	var index = 0;
	for(i = 0; i < 7; i++){
		for(var j = 0; j < 1; j++){
			concRow += board[i][j];
		}
	}
	for(i = 0; i < 7; i++){
		if(concRow.indexOf("R", i)){
			alert("Blah");
		}
	}
}*/

function checkRedWin(){
	
	for(var i = 0; i < 7; i++){
		for(var j = 0; j < 6; j++){
			if(board[i][j] == "R"){
				/*if(i => 3){
					//checkLeft
					if(board[i - 1][j] == "R"){
						if(board[i - 2][j] == "R"){
							if(board[i - 3][j] == "R"){
								alert("Win");
							}
						}
					}
				}*/
				//I don't know how this is working
				//HORIZONTAL CHECK
				if(i <= 3){
					//checkRight
					if(board[i + 1][j] == "R"){
						if(board[i + 2][j] == "R"){
							if(board[i + 3][j] == "R"){
								//alert("Horizonal Red Win");
								rWins++;
								Win()
							}
						}
					}
				}
				//VERTICAL CHECK
				if(j <= 4){
					if(board[i][j + 1] == "R"){
						if(board[i][j + 2] == "R"){
							if(board[i][j + 3] == "R"){
								//alert("Vertical Red Win");
								rWins++;
								Win()
							}
						}
					}
				}
				//UP-RIGHT DIAGONAL CHECK
				if(i <= 3 && j <= 4){
					if(board[i+1][j+1] == "R"){
						if(board[i+2][j+2] == "R"){
							if(board[i+3][j+3] == "R"){
								//alert("Up-Right Red Win");
								rWins++;
								Win()
							}
						}
					}
				}
				//UP-LEFT DIAGONAL CHECK
				if(i <=3 && j <= 4){
					if(board[Math.abs(i-1)][j+1] == "R"){
						if(board[Math.abs(i-2)][j+2] == "R"){
							if(board[Math.abs(i-3)][j+3] == "R"){
								//alert("Up-Left Red Win");
								rWins++;
								Win()
							}
						}
					}
				}
			}
		}
	}
}

function checkYellowWin(){
	for(var i = 0; i < 7; i++){
		for(var j = 0; j < 6; j++){
			if(board[i][j] == "Y"){
				/*if(i => 3){
					//checkLeft
					if(board[i - 1][j] == "Y"){
						if(board[i - 2][j] == "Y"){
							if(board[i - 3][j] == "Y"){
								alert("Win");
							}
						}
					}
				}*/
				//I don't know how this is working
				//HORIZONTAL CHECK
				if(i <= 3){
					//checkRight
					if(board[i + 1][j] == "Y"){
						if(board[i + 2][j] == "Y"){
							if(board[i + 3][j] == "Y"){
								//alert("Horizonal Yellow Win");
								yWins++;
								Win()
							}
						}
					}
				}
				//VERTICAL CHECK
				if(j <= 4){
					if(board[i][j + 1] == "Y"){
						if(board[i][j + 2] == "Y"){
							if(board[i][j + 3] == "Y"){
								//alert("Vertical Yellow Win");
								yWins++;
								Win()
							}
						}
					}
				}
				//UP-RIGHT DIAGONAL CHECK
				if(i <= 3 && j <= 4){
					if(board[i+1][j+1] == "Y"){
						if(board[i+2][j+2] == "Y"){
							if(board[i+3][j+3] == "Y"){
								//alert("Up-Right Yellow Win");
								yWins++;
								Win()
							}
						}
					}
				}
				//UP-LEFT DIAGONAL CHECK
				if(i <=3 && j <= 4){
					if(board[Math.abs(i-1)][j+1] == "Y"){
						if(board[Math.abs(i-2)][j+2] == "Y"){
							if(board[Math.abs(i-3)][j+3] == "Y"){
								//alert("Up-Left Yellow Win");
								yWins++;
								Win()
							}
						}
					}
				}
			}
		}
	}
}

function Win(){
	document.getElementById("rWins").innerHTML = "Red Wins: " + rWins;
	document.getElementById("yWins").innerHTML = "Yellow Wins: " + yWins;
	document.getElementById("resetButton").disabled = false;
	win = true;
}