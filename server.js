const express = require('express');
const cors = require('cors');
const Sudoku = require('./Sudoku.js')

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


const port = process.env.PORT || 8001
app.listen(port, () => console.log(`Listening on port ${port}`))