var chess = document.getElementById("chess");
var context = chess.getContext('2d');

var chessBoardLineCnt = 15;		//�����ж�������
var chessBoardMargin = 15;		//���̵��߿��¹
var chessBoardBoxLength = 30;	//���̸��ӱ߳�
var chessRadius = 13;			//���Ӱ뾶

//��һ������
var me = true;
context.strokeStyle = "#BFBFBF";
var chessBoard = [];
for(var i=0; i<chessBoardLineCnt; i++) {
	chessBoard[i] = [];
	for(var j=0; j<chessBoardLineCnt; j++) {
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
	for(var i=0; i<chessBoardLineCnt; i++) {
		//����
		context.moveTo(chessBoardMargin, chessBoardMargin + i*chessBoardBoxLength);
		context.lineTo(chessBoardMargin + (chessBoardLineCnt-1)*chessBoardBoxLength, chessBoardMargin + i*chessBoardBoxLength);
		context.stroke();
		//����
		context.moveTo(chessBoardMargin + i*chessBoardBoxLength, chessBoardMargin);
		context.lineTo(chessBoardMargin + i*chessBoardBoxLength, chessBoardMargin + (chessBoardLineCnt-1)*chessBoardBoxLength);
		context.stroke();
	}
}

var oneStep = function(i, j, me) {
	context.beginPath();
	context.arc(chessBoardMargin + i*chessBoardBoxLength, chessBoardMargin + j*chessBoardBoxLength, chessRadius, 0, 2*Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(
		chessBoardMargin + i*chessBoardBoxLength + 2, 
		chessBoardMargin + j*chessBoardBoxLength - 2, 
		chessRadius, 
		chessBoardMargin + i*chessBoardBoxLength + 2, 
		chessBoardMargin + j*chessBoardBoxLength - 2, 
		0);
	if(me) {
		//����
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	} else {
		//����
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






