/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard,
// with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var theBoard = new Board({n:n});
  var inner = function(row){
    //termination condtion:
      //when youre off the board
    if(row >= n){
      return theBoard.rows();
    }
    //iterate row
    for (var i = 0; i < n; i++) {
      //toggle 0 and 1 for each index
      theBoard.togglePiece(row, i);
      //get down to the next row
      //recurse over this row, (check if there are any conflict)
      if(!theBoard.hasAnyRooksConflicts()){
        return inner(row + 1);
      }
      theBoard.togglePiece(row, i);
    }
  };
  var solution = inner(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed
// such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var theBoard = new Board({n:n});
  var solutionCount = 0;
  var inner = function(row){
    //termination condtion:
      //when youre off the board
    if(row >= n){
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++) {
        //toggle 0 and 1 for each index
        theBoard.togglePiece(row, i);
        //get down to the next row
        //recurse over this row, (check if there are any conflict)
        if(!theBoard.hasAnyRooksConflicts()){
          inner(row + 1);
        }
        theBoard.togglePiece(row, i);
      }
    }
  };
  inner(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var theBoard = new Board({n:n});
  var solution = undefined;
  var inner = function(row){
    //termination condtion:
      //when youre off the board
    if(solution !== undefined){
      return;
    }
    if(row >= n){
      var temp = [];
      for (var i = 0; i < n; i++) {
        temp.push(theBoard.get(i).slice());
      }
      solution = temp;
      return;
    }
    //iterate row
    for (var i = 0; i < n; i++) {
      theBoard.togglePiece(row, i);
      //get down to the next row
      //recurse over this row, (check if there are any conflict)
      if(!theBoard.hasAnyQueensConflicts()){
        inner(row + 1);
      }
      theBoard.togglePiece(row, i);

    }
  };
  inner(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution ? solution : { n:n };
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var theBoard = new Board({n:n});
  var solutionCount = 0;
  var inner = function(row){
    //termination condtion:
      //when youre off the board
    if(row >= n){
      solutionCount++;
      return;
    }
    //iterate row
    for (var i = 0; i < n; i++) {
      //toggle 0 and 1 for each index
      theBoard.togglePiece(row, i);
      //get down to the next row
      //recurse over this row, (check if there are any conflict)
      if(!theBoard.hasAnyQueensConflicts()){
        inner(row + 1);
      }
      theBoard.togglePiece(row, i);
    }
  };
  inner(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
