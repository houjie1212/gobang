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
			wins[j+k][j][count] = true;
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

console.log(count);