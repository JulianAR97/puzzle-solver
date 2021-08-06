const { expect } = require('chai');
const Sudoku = require('../Sudoku.js')
const puzzles = require('./puzzles.json')
describe('Sudoku', function() {
  describe('instance methods', function() {
    describe('#solve', function() {
      it('should solve the puzzle', function() {
        let p = puzzles[0]
        let s = new Sudoku(p.puzzle)
        s.solve()
        expect(s.solution).to.deep.equal(p.solution)
      })
    })
  })
})