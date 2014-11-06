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
  var count = 0;


  (function sub(n, board, currentRow){
    var board = board || new Board({n:n});
    var currentRow = currentRow || 0;
    var pos;
    // if current row is n
    if (currentRow === n) {
      count++;
    } else {
      for (var col = 0; col < n; col++) {
        board.togglePiece(currentRow, col);
        if (!board.hasRowConflictAt(currentRow) && !board.hasColConflictAt(col)) {
          sub(n, new Board(board.rows()), currentRow + 1);
        }
        board.togglePiece(currentRow, col);
      }
    }

  })(n);

  return count;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(n) {
//   var result = null;
//   var board = new Board({n:n});
//   var currentRow = 0;
//   var startCol = 0;
//   while (currentRow < n) {
//     for (var col = (currentRow === 0 ? startCol : 0); col < n; col++) {
//       board.togglePiece(currentRow, col);
//       if (board.hasAnyQueenConflictsOn(currentRow,col)) {
//         board.togglePiece(currentRow, col);
//         if (col === n - 1) {
//           break;
//         }
//       } else {
//         break;
//       }
//     }
//     if (col === n - 1) {
//       startCol++;
//       var board = new Board({n:n});
//       break; //and somehow restart the loop
//     }
//     currentRow++;
//   }
//   return board.rows();
// };
//

window.findNQueensSolution = function(n) {
  if (n === 2 || n === 3 ) {
    return (new Board({n:n})).rows();
  }
  return(function sub(n, board, currentRow){
    var board = board || new Board({n:n});
    var currentRow = currentRow || 0;
    // if current row is n
    board.printBoard();
    if (currentRow === n) {
      return board.rows();
    } else {
      for (var col = 0; col < n; col++) {
        board.togglePiece(currentRow, col);
        if (!board.hasAnyQueenConflictsOn(currentRow,col)) {
          var solution = sub(n, new Board(board.rows()), currentRow + 1);
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


  (function sub(n, board, currentRow){
    var board = board || new Board({n:n});
    var currentRow = currentRow || 0;
    // if current row is n
    if (currentRow === n) {
      count++;
    } else {
      for (var col = 0; col < n; col++) {
        board.togglePiece(currentRow, col);
        if (!board.hasAnyQueenConflictsOn(currentRow,col)) {
          sub(n, new Board(board.rows()), currentRow + 1);
        }
        board.togglePiece(currentRow, col);
      }
    }

  })(n);

  return count;

};
