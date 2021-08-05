
/** 
 * Takes a matrix and rotates it 90 degrees clockwise
 * @example
 * rotateMatrix([[1, 2], [1, 2]]) => [[1, 1], [2, 2]]
 * @param {array} matrix
 * @returns rotated matrix
*/
const rotateMatrix = (matrix) => {
  let copy = deepCopy(matrix)
  const n = copy.length;
  const x = Math.floor(n / 2);
  const y = n - 1;

  for (let i = 0; i < x; i++) {
    for (let j = i; j < y - i; j++) {
      let k = copy[i][j];
      copy[i][j] = copy[y - j][i];
      copy[y - j][i] = copy[y - i][y - j];
      copy[y - i][y - j] = copy[j][y - i];
      copy[j][y - i] = k
    }
  }
  return copy
}

/**
 * Takes 2 arrays and returns the difference between them
 * @example 
 * arrayDiff([1, 2], [1, 2, 3, 4, 5]) => [3, 4, 5]
 * @param {array} a1 
 * @param {array} a2 
 * @returns {array} diff
 */
const arrayDiff = (a1, a2) => {
  if (a1.length < a2.length) [a1, a2] = [a2, a1]
  let diff = a1.filter(x => !a2.includes(x))
  return diff
}

/** 
 * Deep copies array (used for multi-dimensional arrays)
 * @param {array} array
 * @returns {array} new array
*/
const deepCopy = (array) => {
  return JSON.parse(JSON.stringify(array))
}

/** 
 * Takes a parameter for number of rows, columns, and a value and fills a matrix
 * @example
 * fillMatrix(2, 3, 1) => [[1, 1, 1], [1, 1, 1]]
 * fillMatrix(2, 2, []) => [[[], []], [[], []]]
 * @param {number} nRows
 * @param {number} nCols
 * @param {any} value
 * @return {array} matrix
*/
const fillMatrix = (nRows, nCols, value) => {
  let a = [];
  for (let i = 0; i < nRows; i++) {
    let sA = []
    for (let j = 0; j < nCols; j++) {
      sA.push(value)
    }
    a.push(sA)
  }
  return a
}

module.exports = {
  rotateMatrix,
  arrayDiff,
  deepCopy,
  fillMatrix
}