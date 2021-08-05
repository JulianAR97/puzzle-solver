const Helpers = require('./Helpers.js');
class Sudoku {
  constructor(puzzle) {
    this.puzzle = JSON.parse(JSON.stringify(puzzle))
    this.solution = null
  }
  
   validRow(row) {
    let filterRow = row.filter(Boolean)
    let uniqueRow = filterRow.filter((e, i, a) => a.indexOf(e) === i)
    if (filterRow.join('') != uniqueRow.join('')) return false
    return true
  }

  checkRows() {
    for (let row of this.puzzle) 
      if (!this.validRow(row)) return false
    
    return true
  }

  checkColumns() {
    let rotated = Helpers.rotateMatrix(this.puzzle)
    for (let row of rotated) 
      if(!this.validRow(row)) return false
    
    return true 
  }

  checkBoxes() {
    let boxes = [];
    for (let i = 0; i < this.puzzle.length; i++) boxes.push([])

    for (let i = 0; i < this.puzzle.length; i++) {
      for (let j = 0; j < this.puzzle.length; j++) {
        let val = this.puzzle[i][j] 
        let boxIdx = Math.floor((i / 3)) * 3 + Math.floor(j / 3);
        if (boxes[boxIdx].includes(val)) 
          return false
        
        // if val is not 0 
        if (val) 
          boxes[boxIdx].push(val)
      }
    }
    return true
  }

  
  checkValid() {
    return (
      this.checkBoxes() &&
      this.checkRows() &&
      this.checkColumns()
    )
  }
  
  static getBox(i, j, array) {
    let iStart = Math.floor(i / 3) * 3;
    let jStart = Math.floor(j / 3) * 3;
    let iEnd = iStart + 3;
    let jEnd = jStart + 3;
    
    let box = []
    for (let i = iStart; i < iEnd; i++) {
      for (let j = jStart; j < jEnd; j++) {
        box.push(array[i][j])
      }
    }
    return box
  }
    
  fillObviousCells(){
    let possibleValues = this.getPossibleValues()
    let modifiedCell = false // flag variable to track whether we made a change
    for (let i = 0; i < possibleValues.length; i++) {
      for (let j = 0; j < possibleValues.length; j++) {
        let pVals = possibleValues[i][j]
        if (pVals && pVals.length === 1) {
          this.solution[i][j] = pVals[0]
          modifiedCell = true
        }
      }
    }
    return modifiedCell
  }

  getPossibleValues() {
    let possibleValues = []
    for (let i = 0; i < this.solution.length; i++) {
      for (let j = 0; j < this.solution[i].length; j++) {
        let cell = this.solution[i][j];
        let pVals;
        if (cell === 0) {
          let row = this.solution[i]
          let col = Helpers.rotateMatrix(this.solution)[j]
          let box = Sudoku.getBox(i, j, this.solution)
          let values = row.concat(col).concat(box).filter(Boolean).filter((e, i, a) => a.indexOf(e) === i)
          pVals = Helpers.arrayDiff([1, 2, 3, 4, 5, 6, 7, 8, 9], values) 
        } else {
          pVals = null
        }
        possibleValues[i] ? possibleValues[i][j] = pVals : possibleValues[i] = [pVals]
      }
    }
    return possibleValues
  }

  preliminarySolve() {
    while (this.fillObviousCells()) {
      continue
    }
  }

  static getMutables(array) {
    let copy = Helpers.deepCopy(array);
    let mutables = copy.map(row => row.map(ele => !ele))
    return mutables;
  }

  solve() {
    if (this.solution) 
      return this.solution;
    
    this.solution = Helpers.deepCopy(this.puzzle)
    this.preliminarySolve()
    let mutables = Sudoku.getMutables(this.solution)
    let pValIndices = Helpers.fillMatrix(9, 9, 0)
    let incrementor = 1;
    let start = 0

    for (let i = 0; 0 <= i && i < this.solution.length; i += incrementor) {
      for (let j = start; 0 <= j && j < this.solution[i].length; j += incrementor) {
        if (!mutables[i][j]) continue; // if the cell is not mutable
           
        // Check to see if we are currently backtracking, and go to next possible value if we are
        if (this.solution[i][j] > 0) {
          pValIndices[i][j]++
          this.solution[i][j] = 0;
        }

        let puzzlePVals = this.getPossibleValues()
        let pVals = puzzlePVals[i][j]

        let val = pVals[pValIndices[i][j]]
     
        if (val) {
          this.solution[i][j] = val
          incrementor = 1;
          start = 0;
        } else {
          pValIndices[i][j] = 0;
          incrementor = -1;
          start = 8;
        }
      }
    }
    console.log(this.solution)
    return this.solution
  }

}

module.exports = Sudoku

/*
1. Get possible cellVals for each cell in row, column, and matrix
2. if all have possible values after trying the first possible value
at current index, set value and continue, else try next value
3. if none of the possible values at the current index work, decrement j
4. if j is already 0, set possibleValueIndex to 0 and decrement j until reach a cell that needs to be adjusted
   (Know that the cell was 0 to start with be comparing this.puzzle with copy)
5. We will know that we are going backwards if the possibleValue index of current cell is greater than 0


*/