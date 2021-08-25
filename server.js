const express = require('express');
const cors = require('cors');
const Sudoku = require('./Sudoku.js')
const Helpers = require('./Helpers.js')

const app = express();
app.use(express.json());
app.use(cors());


app.post('/solve', (req, res) => {
  const puzzle = req.body;
  let matrix = Sudoku.convertToMatrix(puzzle);
  let s = new Sudoku(matrix);
  s.solve();
  if (s.solution) {
    res.json({solution: s.solution.flat(), errors: []})
  } else {
    res.json({solution: puzzle, errors: ["This puzzle has no solution!"]})
  }
})

app.post('/check', (req, res) => {
  const puzzle = req.body;
  let matrix = Sudoku.convertToMatrix(puzzle);
  let s = new Sudoku(matrix);
  s.solve()

  if (s.solution && Helpers.arrayDiff(puzzle, s.solution.flat()).length === 0) {
    res.json({errors: ['Solution is Correct']})
  } else {
    res.json({errors: ['Invalid Solution']})
  }
})

const port = process.env.PORT || 8001
app.listen(port, () => console.log(`Listening on port ${port}`))