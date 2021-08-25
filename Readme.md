# Puzzle Solver Backend

##### [Website](https://puzzle-solver.netlify.app/)
##### [Frontend Repo](https://github.com/JulianAR97/puzzle-client)

## About
#### Node/Express API that solves puzzles and returns the solution as JSON.

## Features
#### **Sudoku Solver**
##### Solves puzzles using an optimized DFS whereby at each step it maps the cells to the possible numbers that could fill each cell based on the number not appearing in the same row, cell, or box as the cell, sorts by number of possibilities at each step, and backtracks after checking all possiblities for a given cell. With the optimized approach, it can solve most puzzles in under a second, with worse case scenario puzzles (ones that are intended to work against backtracking algorithms) taking a maximum of 5 seconds. This is compared to a non-optimized DFS which in some cases took minutes to solve. 