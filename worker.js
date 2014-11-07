var results = [];
var initialCol = null;
var n = null;

function resultReceiver(event) {
  results.push(parseInt(event.data));
  if (results.length == 2) {
    postMessage(results[0] + results[1]);
  }
}

function errorReceiver(event) {
  throw event.data;
}

onmessage = function(event) {
  // i or start
  if (event.data === 'start') {
    countNQueensSolutions();
  } else {
    var data = JSON.parse(event.data);
    initialCol = data.initialCol;
    n = data.n;

  }
};

function countNQueensSolutions (n) {
  var count = 0;
  var majDiag = [];
  var minDiag = [];
  for (var i = 0; i < (2*n); i++) {
    minDiag[i] = 0;
    majDiag[i] = 0;
  }
  var columns = [];
  for (var i = 0; i < n; i++) {
    columns[i] = 0;
  }

  (function tryNext (row) {
    if (row === n) {
      count++;
      return;
    }
    if (row === 0) {
      for (var col = 0; col < (n - 1) / 2; col++){
        columns[col] = majDiag[col+n] = minDiag[col] = 1;
        tryNext(1);
        columns[col] = majDiag[col+n] = minDiag[col] = 0;
      }
      count *= 2;
      if (n % 2) {
        col = Math.floor(n / 2);
        columns[col] = majDiag[col+n] = minDiag[col] = 1;
        tryNext(1);
        columns[col] = majDiag[col+n] = minDiag[col] = 0;
      }
    } else {
      for (var col = 0; col < n; col++){
        if (!columns[col] && !majDiag[col-row+n] && !minDiag[col+row]) {
          columns[col] = majDiag[col-row+n] = minDiag[col+row] = 1;
          tryNext(row + 1);
          columns[col] = majDiag[col-row+n] = minDiag[col+row] = 0;
        }
      }
    }
  })(0);

  return count;

};
