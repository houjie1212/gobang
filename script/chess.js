var chess = document.getElementById("chess");
var context = chess.getContext('2d');

var chessBoard_lineCnt = 15;		//棋盘有多少条线
var chessBoard_margin = 15;		//棋盘到边框巨鹿
var chessBoard_boxLength = 30;	//棋盘格子边长
var chess_adius = 13;			//棋子半径

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
		//白字
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
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if(chessBoard[i][j] == 0) {
		oneStep(i, j, me);
		if(me) {
			chessBoard[i][j] = 1;
		} else {
			chessBoard[i][j] = 2;
		}
		me = !me;
	}

}






