var results = [];
var initialCol = null;
var n = null;
var majDiag = [];
var minDiag = [];
var columns = [];
var setupDone = false;

var onmessage = function (event) {
  if (event.data === 'start') {
    countNQueensSolutions();
  } else {
    var data = JSON.parse(event.data);
    initialCol = data.initialCol;
    n = data.n;
    setUp();
  }
}

function countNQueensSolutions () {
  (function tryNext (row) {
    if (row === n) {
      postMessage('yay');
      return;
    }

    for (var col = 0; col < n; col++){
      if (!columns[col] && !majDiag[col-row+n] && !minDiag[col+row]) {
        columns[col] = majDiag[col-row+n] = minDiag[col+row] = 1;
        tryNext(row + 1);
        columns[col] = majDiag[col-row+n] = minDiag[col+row] = 0;
      }
    }
  })(1);

};

function setUp() {
  for (var i = 0; i < (2*n); i++) {
    minDiag[i] = 0;
    majDiag[i] = 0;
  }
  for (var i = 0; i < n; i++) {
    columns[i] = 0;
  }
  columns[initialCol] = majDiag[initialCol+n] = minDiag[initialCol] = 1;
  setupDone = true;
}
