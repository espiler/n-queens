/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n:n}); //fixme
  // place a rook at 0,0
  // row++, col++
  var row = 0;
  var col = 0;
  while (row < n) {
    solution.togglePiece(row, col);
    row++;
    col++;
  }
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var res = 1;
  while (n>0) {
    res *= n;
    n--;
  }
  return res;
};

window.findNQueensSolution = function(n) {
  if (n === 2 || n === 3 ) {
    return (new Board({n:n})).rows();
  }
  return(function sub(n, board, currentRow){
    var board = board || new Board({n:n});
    var currentRow = currentRow || 0;
    // if current row is n
    if (currentRow === n) {
      return board.rows();
    } else {
      for (var col = 0; col < n; col++) {
        board.togglePiece(currentRow, col);
        if (!board.hasAnyQueenConflictsOn(currentRow,col)) {
          var solution = sub(n, board, currentRow + 1);
          if (solution) {
            return solution;
          }
        }
        board.togglePiece(currentRow, col);
      }
    }

  })(n);
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
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

window.timed = function(fn) {
  return function() {
    var start = Date.now();
    var res = fn.apply({}, arguments)
    console.log('time for ' + arguments[0] + ' queens: ', Date.now() - start, 'ms');
    return res;
  }
}

window.timednq = timed(countNQueensSolutions);
