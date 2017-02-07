var chess = document.getElementById("chess");
var context = chess.getContext('2d');

var chessBoard_lineCnt = 15;	//棋盘有多少条线
var chessBoard_margin = 15;		//棋盘到边框巨鹿
var chessBoard_boxLength = 30;	//棋盘格子边长
var chess_adius = 13;			//棋子半径

//游戏是否结束
var over = false;

//第一步黑子
var me = true;
context.strokeStyle = "#BFBFBF";

//记录棋盘已落子的点
var chessBoard = [];
for(var i=0; i<chessBoard_lineCnt; i++) {
	chessBoard[i] = [];
	for(var j=0; j<chessBoard_lineCnt; j++) {
		chessBoard[i][j] = 0;
	}
}

//赢法数组
var wins = [];
for(var i=0; i<chessBoard_lineCnt; i++) {
	wins[i] = [];
	for(var j=0; j<chessBoard_lineCnt; j++) {
		wins[i][j] = [];
	}
}

var count = 0;
//横线
for(var i=0; i<chessBoard_lineCnt; i++) {
	for(var j=0; j<chessBoard_lineCnt-4; j++) {
		for(var k=0; k<5; k++) {
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//竖线
for(var i=0; i<chessBoard_lineCnt; i++) {
	for(var j=0; j<chessBoard_lineCnt-4; j++) {
		for(var k=0; k<5; k++) {
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
//正斜线
for(var i=0; i<chessBoard_lineCnt-4; i++) {
	for(var j=0; j<chessBoard_lineCnt-4; j++) {
		for(var k=0; k<5; k++) {
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//反斜线
for(var i=0; i<chessBoard_lineCnt-4; i++) {
	for(var j=chessBoard_lineCnt-1; j>chessBoard_lineCnt-12; j--) {
		for(var k=0; k<5; k++) {
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

//console.log('count:'+count);

var myWin = [];
var comWin = [];
for(var i=0; i<count; i++) {
	myWin[i] = 0;
	comWin[i] = 0;
}

// var logo = new Image();
// logo.src = "images/logo.png";
// logo.onload = function() {
// 	context.drawImage(logo, 0, 0, 450, 450);
//	drawChessBoard();
// }

var drawChessBoard = function() {
	for(var i=0; i<chessBoard_lineCnt; i++) {
		//横线
		context.moveTo(chessBoard_margin, chessBoard_margin + i*chessBoard_boxLength);
		context.lineTo(chessBoard_margin + (chessBoard_lineCnt-1)*chessBoard_boxLength, chessBoard_margin + i*chessBoard_boxLength);
		context.stroke();
		//竖线
		context.moveTo(chessBoard_margin + i*chessBoard_boxLength, chessBoard_margin);
		context.lineTo(chessBoard_margin + i*chessBoard_boxLength, chessBoard_margin + (chessBoard_lineCnt-1)*chessBoard_boxLength);
		context.stroke();
	}
}

var oneStep = function(i, j, me) {
	context.beginPath();
	context.arc(chessBoard_margin + i*chessBoard_boxLength, chessBoard_margin + j*chessBoard_boxLength, chess_adius, 0, 2*Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(
		chessBoard_margin + i*chessBoard_boxLength + 2, 
		chessBoard_margin + j*chessBoard_boxLength - 2, 
		chess_adius, 
		chessBoard_margin + i*chessBoard_boxLength + 2, 
		chessBoard_margin + j*chessBoard_boxLength - 2, 
		0);
	if(me) {
		//黑子
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	} else {
		//白子
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}
	context.fillStyle = gradient;
	context.fill();
}

drawChessBoard();

// oneStep(0, 0, true);
// oneStep(1, 1, false);

chess.onclick = function(e) {
	if(over) {
		return;
	}
	if(!me) {
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if(chessBoard[i][j] == 0) {
		oneStep(i, j, me);
		chessBoard[i][j] = 1;
		
		for(var k=0; k<count; k++) {
			if(wins[i][j][k]) {
				myWin[k]++;
				comWin[k] = 6;
				if(myWin[k] == 5) {
					alert("你赢了");
					over = true;
					return;
				}
			}
		}
		if(!over) {
			me = !me;
			computerAi();
		}
	}
}

var computerAi = function() {
	var myScore = [];
	var comScore = [];
	var max = 0;
	var u = 0, v = 0;
	for(var i=0; i<chessBoard_lineCnt; i++) {
		myScore[i] = [];
		comScore[i] = [];
		for(var j=0; j<chessBoard_lineCnt; j++) {
			myScore[i][j] = 0;
			comScore[i][j] = 0;
		}
	}

	for(var i=0; i<chessBoard_lineCnt; i++) {
		for(var j=0; j<chessBoard_lineCnt; j++) {
			if(chessBoard[i][j] == 0) {
				for(var k=0; k<count; k++) {
					if(wins[i][j][k]){
						if(myWin[k] == 1) {
							myScore[i][j] += 200;
						} else if(myWin[k] == 2) {
							myScore[i][j] += 400;
						} else if(myWin[k] == 3) {
							myScore[i][j] += 2000;
						} else if(myWin[k] == 4) {
							myScore[i][j] += 10000;
						}

						if(comWin[k] == 1) {
							comScore[i][j] += 220;
						} else if(comWin[k] == 2) {
							comScore[i][j] += 420;
						} else if(comWin[k] == 3) {
							comScore[i][j] += 2100;
						} else if(comWin[k] == 4) {
							comScore[i][j] += 20000;
						}
					}
				}

				if(myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				} else if(myScore[i][j] == max) {
					if(comScore[i][j] > comScore[u][v]) {
						u = i;
						v = j;
					}
				}

				if(comScore[i][j] > max) {
					max = comScore[i][j];
					u = i;
					v = j;
				} else if(comScore[i][j] == max) {
					if(myScore[i][j] > myScore[u][v]) {
						u = i;
						v = j;
					}
				}
			}
		}
	}

	oneStep(u, v, false);
	chessBoard[u][v] = 2;
	for(var k=0; k<count; k++) {
		if(wins[u][v][k]) {
			comWin[k]++;
			myWin[k] = 6;
			if(comWin[k] == 5) {
				alert("你输了");
				over = true;
				return;
			}
		}
	}
	if(!over) {
		me = !me;
	}
}






