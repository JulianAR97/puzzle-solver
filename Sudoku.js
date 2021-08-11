const Helpers = require('./Helpers.js');
class Sudoku {
  constructor(puzzle) {
    this.puzzle = JSON.parse(JSON.stringify(puzzle))
    this.solution = null
  }
  
  static valid(puzzle) {
    return (
      Sudoku.#validRows(puzzle) &&
      Sudoku.#validBoxs(puzzle) &&
      Sudoku.#validCols(puzzle)
    )
  }

  /** 
   * Takes a one dimensional array of 81 values and returns a 9x9 matrix
   * @param {Object} puzzle
   * @return puzzleMatrix
  */
  static convertToMatrix(puzzle) {
    let matrix = [];
    let local = [];
    for (let i = 0; i < puzzle.length; i++) {
      local.push(puzzle[i])
      if (local.length === 9) {
        matrix.push(local);
        local = [];
      }
    }
    return matrix
  }

  solved() {
    for (let i = 0; i < this.solution.length; i++) {
      if (Helpers.arrayDiff([1, 2, 3, 4, 5, 6, 7, 8, 9], this.solution[i])[0]) return false;
    }
    return true
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
  
  solve() {
    if (this.solution) return this.solution;
    if (!Sudoku.valid(this.puzzle)) return this.puzzle
    
    this.solution = Helpers.deepCopy(this.puzzle)

    let pValIndices = Helpers.fillMatrix(9, 9, 0)
    let lastSolved= [];
    
    while (!this.solved()) {
      let puzzlePVals = this.getPossibleValues()
      let sortedPVals = Sudoku.#sortNumPossiblities(puzzlePVals)
      // if our sorted array of possibilities has no possiblities at index 0, we need to backtrack
      let pVal = sortedPVals[0]
      let pValIDX = pValIndices[pVal.i][pVal.j]
      if (!pVal.p[pValIDX]) {
        // backtrack
        let ls = lastSolved.pop()
        pValIndices[ls.i][ls.j]++
        pValIndices[pVal.i][pVal.j] = 0;
        this.solution[ls.i][ls.j] = 0;
        continue;
      } else {
        this.solution[pVal.i][pVal.j] = pVal.p[pValIDX]
        lastSolved.push(pVal)
      }
      
    }
    
    return 
  }
  
  // Private
  
  // Static Methods
  static #sortNumPossiblities(arr) {
    let numPossiblities = [];
  
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        let p = arr[i][j]; // ele is either null or [x, y, ...]
        if (p) numPossiblities.push({i, j, p})
      }
    }
    return numPossiblities.sort((a, b) => a.p.length - b.p.length)
  }

  static #validRow(row) {
    let filterRow = row.filter(Boolean)
    let uniqueRow = filterRow.filter((e, i, a) => a.indexOf(e) === i)
    if (filterRow.join('') != uniqueRow.join('')) return false
    return true
  }

  static #validRows(puzzle) {
    for (let row of puzzle) 
      if (!Sudoku.#validRow(row)) return false
    
    return true
  }

  static #validCols(puzzle) {
    let rotated = Helpers.rotateMatrix(puzzle)
    for (let row of rotated) 
      if(!Sudoku.#validRow(row)) return false
    
    return true 
  }

  static #validBoxs(puzzle) {
    let boxes = [];
    for (let _ of puzzle) boxes.push([])

    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle.length; j++) {
        let val = puzzle[i][j] 
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